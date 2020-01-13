import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from '../match.model';
import { DbService } from 'src/app/services/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
})
export class MatchDetailsPage implements OnInit {
  pageTitle = 'match summary';
  match: Match;
  matchId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dbService: DbService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('matchId')) {
        this.router.navigate(['./matches']);
        return;
      }
      this.matchId = paramMap.get('matchId');

      this.dbService.getMatch(this.matchId).subscribe(result => {
        this.match = result;
      });
    });
  }

  onDecline() {
    this.alertCtrl
      .create({
        header: 'u sure?',
        message: 'the match report will be declined',
        buttons: [
          {
            text: 'leave',
            role: 'cancel',
          },
          {
            text: 'decline',
            handler: () => {
              this.dbService.declineMatch(this.matchId);
              this.router.navigate(['matches']);
            },
          },
        ],
      })
      .then(alert => {
        alert.present();
      });
  }
}
