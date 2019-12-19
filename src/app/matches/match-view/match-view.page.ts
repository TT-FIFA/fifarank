import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Type, Match } from '../match.model';
import { Player } from '../../players/player.model';
import { Club } from '../../club.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.page.html',
  styleUrls: ['./match-view.page.scss']
})
export class MatchViewPage implements OnInit {
  pageTitle = 'match view';
  types = Type;
  players: Player[];
  clubs: Club[];
  matchReport: FormGroup;
  isForm: boolean;
  match: Match;
  matchId: string;
  @Input() matchListItem: Match;

  // tslint:disable-next-line: variable-name
  validation_messages = {
    date: [{ type: 'required', message: 'date is required.' }],
    type: [{ type: 'required', message: 'type is required.' }],
    hostName: [{ type: 'required', message: 'host name is required.' }],
    guestName: [{ type: 'required', message: 'guest name is required.' }],
    hostClub: [{ type: 'required', message: 'host club is required.' }],
    guestClub: [{ type: 'required', message: 'guest club is required.' }],
    score: [
      { type: 'required', message: 'score is required, even if 0.' },
      { type: 'maxlength', message: 'score cannot be more than 2 cyphers long.' }
    ]
  };

  constructor(
    private dbService: DbService,
    public db: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isForm = false;
    this.createForm();

    if (window.location.pathname !== '/match-report') {
      this.activatedRoute.paramMap.subscribe(paramMap => {
        this.matchId = paramMap.get('matchId');

        this.dbService.getMatch(this.matchId).subscribe(result => {
          this.match = result;
          console.log(this.match);
        });
      });
    }

    this.dbService.getPlayers().subscribe(data => {
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Player;
      });
    });

    this.dbService.getClubs().subscribe(data => {
      this.clubs = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Club;
      });
    });
  }

  createForm() {
    this.matchReport = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      hostName: ['', Validators.required],
      guestName: ['', Validators.required],
      hostClub: ['', Validators.required],
      guestClub: ['', Validators.required],
      hostScore: ['', Validators.required],
      guestScore: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.maxLength(2),
          Validators.pattern('[0-9]')
        ])
      ]
    });
  }

  resetFields() {
    this.matchReport = this.fb.group({
      date: new FormControl(''),
      type: new FormControl(''),
      hostName: new FormControl('', Validators.required),
      guestName: new FormControl('', Validators.required),
      hostClub: new FormControl('', Validators.required),
      guestClub: new FormControl('', Validators.required),
      hostScore: new FormControl('', Validators.required),
      guestScore: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.dbService.addMatch(value).then(() => {
      this.resetFields();
      this.router.navigate(['matches']);
      // wyświetl powiadomienie o sukcesie
    });
  }
  editMatch() {
   this.isForm = true;
  }
}
