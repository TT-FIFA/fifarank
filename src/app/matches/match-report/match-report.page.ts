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
import { ClubsPage } from '../../clubs/clubs.page';

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.page.html',
})
export class MatchReportPage implements OnInit {
  pageTitle = 'match report';
  types = Type;
  players: Player[];
  leagues: League[];
  matchReport: FormGroup;

  validation_messages = {
    date: [{ type: 'required', message: 'date is required.' }],
    type: [{ type: 'required', message: 'type is required.' }],
    hostName: [{ type: 'required', message: 'host name is required.' }],
    guestName: [{ type: 'required', message: 'guest name is required.' }],
    hostClub: [{ type: 'required', message: 'host club is required.' }],
    guestClub: [{ type: 'required', message: 'guest club is required.' }],
    score: [
      { type: 'required', message: 'score is required, even if 0.' },
      {
        type: 'maxlength',
        message: 'score cannot be more than 2 cyphers long.',
      },
    ],
  };

  constructor(
    private clubService: ClubsPage,
    private dbService: DbService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();

    this.dbService.getPlayers().subscribe(data => {
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Player;
      });
    });

    this.leagues = this.clubService.getClubs();
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
          Validators.pattern('[0-9]'),
        ]),
      ],
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

  onSubmit(value) {
    this.dbService.addMatch(value).then(() => {
      this.resetFields();
      this.router.navigate(['matches']);
      // wyświetl powiadomienie o sukcesie
    });
  }
}
