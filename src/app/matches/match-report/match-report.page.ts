import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Type } from '../match.model';
import { Player } from '../../players/player.model';
import { League } from '../../clubs/league.model';
import { ClubListComponent } from '../../clubs/club-list/club-list.component';

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.page.html',
})
export class MatchReportPage implements OnInit {
  pageTitle = 'match report';
  matchReport: FormGroup;
  today: string;
  beginningDate: string;
  types = Type;
  players: Player[];
  hostPlayers: Player[];
  guestPlayers: Player[];
  leagues: League[];

  validation_messages = {
    date: [{ type: 'required', message: 'date is required' }],
    type: [{ type: 'required', message: 'type is required' }],
    hostName: [{ type: 'required', message: 'host name is required' }],
    guestName: [{ type: 'required', message: 'guest name is required' }],
    hostClub: [{ type: 'required', message: 'host club is required' }],
    guestClub: [{ type: 'required', message: 'guest club is required' }],
    score: [
      { type: 'required', message: 'score is required, even if 0' },
      { type: 'max', message: 'score cannot be more than 2 cyphers long' },
    ],
  };

  constructor(
    private clubService: ClubListComponent,
    private dbService: DbService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.getPlayers();
    this.leagues = this.clubService.getClubs();
    this.setDateLimitValues();
  }

  createForm() {
    this.matchReport = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      hostName: ['', Validators.required],
      guestName: ['', Validators.required],
      hostClub: ['', Validators.required],
      guestClub: ['', Validators.required],
      hostScore: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(99),
          Validators.pattern('[0-9]{1,2}'),
        ]),
      ],
      guestScore: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(99),
          Validators.pattern('[0-9]{1,2}'),
        ]),
      ],
    });
  }

  getPlayers() {
    this.dbService.getPlayers().subscribe(data => {
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Player;
      });

      this.copyPlayers();
    });
  }

  copyPlayers() {
    this.hostPlayers = this.players.slice();
    this.guestPlayers = this.players.slice();
  }

  setDateLimitValues() {
    let today = new Date();
    this.today = today.toISOString();
    this.beginningDate = new Date(
      today.setDate(today.getDate() - 30)
    ).toISOString();
  }

  filterPlayers(event) {
    let selectedSide = event.target.attributes.formcontrolname.value;
    let selectedName = event.detail.value;
    if (selectedSide == 'hostName') {
      this.guestPlayers = this.players
        .slice()
        .filter(player => player.name != selectedName);
    } else if (selectedSide == 'guestName') {
      this.hostPlayers = this.players
        .slice()
        .filter(player => player.name != selectedName);
    }
  }

  onSubmit(value) {
    this.dbService.addMatch(value).then(() => {
      this.resetFields();
      this.router.navigate(['matches']);
      // wyświetl powiadomienie o sukcesie
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
      guestScore: new FormControl('', Validators.required),
    });
  }
}
