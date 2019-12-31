import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  pageTitle = 'home';
  playerDoesntExists: boolean;
  playerId: string;
  email: string;
  displayName: string;

  constructor(
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public dbService: DbService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.playerId = user.uid;
        this.displayName = user.displayName;
        this.email = user.email;

        this.checkIfPlayerExists();
      }
    });
  }

  checkIfPlayerExists() {
    this.dbService.getPlayer(this.playerId).subscribe(data => {
      this.playerDoesntExists = !data.payload.exists;
    });
  }

  createPlayer(name: string) {
    this.dbService.createPlayer(this.playerId, name, this.email).then(
      () => {
        this.router.navigate(['./players', this.playerId]);
        this.showToast('Player added');
      },
      err => {
        this.showToast('There was a problem adding your player :(');
      }
    );
  }

  createPlayerAlert() {
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

  showToast(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 2000
      })
      .then(toast => toast.present());
  }
}
