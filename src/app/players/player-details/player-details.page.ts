import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
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
  exists: string;
  email: string;
  displayName: string;

  constructor(
    public afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    public dbService: DbService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.escapeIfNoId(paramMap);
      this.playerId = paramMap.get('playerId');
      this.getOrCreatePlayer();
    });

    this.getPlayerProfile();
  }

  escapeIfNoId(paramMap) {
    if (!paramMap.has('playerId')) {
      this.router.navigate(['./players']);
    }
  }

  getOrCreatePlayer() {
    this.dbService.getPlayer(this.playerId).subscribe(
      data => {
        this.exists = data.payload.exists;
        if (this.exists) {
          this.player = data.payload.data();
        } else {
          this.playerCreationAlert();
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

  playerCreationAlert() {
    this.alertCtrl
      .create({
        header: 'new player creation',
        subHeader: 'input display name',
        inputs: [
          {
            name: 'name',
            type: 'text',
            value: this.displayName
          }
        ],
        buttons: [
          {
            text: 'cancel',
            role: 'cancel'
            // tutaj handler gdy cancel
          },
          {
            text: 'create',
            handler: inputs => {
              this.createPlayer(inputs.name);
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

  getPlayerProfile() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.displayName = user.displayName;
        this.email = user.email;
      }
    });
  }

  createPlayer(name: string) {
    this.dbService.createPlayer(this.playerId, name, this.email).then(
      () => {
        this.showToast('Player added');
      },
      err => {
        this.showToast('There was a problem adding your player :(');
      }
    );
  }

  nameChangeAlert() {
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
