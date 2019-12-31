import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss']
})
export class PlayerDetailsPage implements OnInit {
  pageTitle = 'player details';
  player: Player;
  playerId: string;
  userId: string;

  constructor(
    public afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    public dbService: DbService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.escapeIfNoPlayerId(paramMap);
      let playerId = paramMap.get('playerId');
      this.getPlayerOrEscape(playerId);
    });

    this.getUserId();
  }

  escapeIfNoPlayerId(paramMap) {
    if (!paramMap.has('playerId')) {
      this.router.navigate(['./players']);
    }
  }

  getPlayerOrEscape(playerId: string) {
    this.dbService.getPlayer(playerId).subscribe(
      data => {
        if (data.payload.exists) {
          console.log('data.payload.data(): ', data.payload.data());
          this.player = data.payload.data();
          console.log('this.player: ', this.player);
          this.playerId = playerId;
        } else {
          this.router.navigate(['./players']);
        }
      },
      error => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Completed!');
      }
    );
  }

  getUserId() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  changeDisplayName() {
    this.alertCtrl
      .create({
        header: 'player name change',
        subHeader: 'input new name',
        inputs: [
          {
            name: 'name',
            type: 'text',
            value: this.player.name
          }
        ],
        buttons: [
          {
            text: 'cancel',
            role: 'cancel'
          },
          {
            text: 'change',
            handler: inputs => {
              this.updatePlayerName(inputs.name);
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

  updatePlayerName(newName: string) {
    this.dbService.updatePlayerName(this.playerId, newName).then(
      () => {
        this.showToast('Player name updated');
      },
      err => {
        this.showToast('There was a problem updating your player name :(');
      }
    );
  }

  showToast(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000
      })
      .then(toast => toast.present());
  }
}
