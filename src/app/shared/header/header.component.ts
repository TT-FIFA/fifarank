import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, AlertController } from '@ionic/angular';
import { FirebaseUIModule } from 'firebaseui-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string;
  displayName: string;
  email: string;
  uid: string;

  constructor(public afAuth: AngularFireAuth, private modalCtrl: ModalController, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.uid = user.uid;
      }
    });
  }

  signIn() {
    this.modalCtrl
      .create({
        component: FirebaseUIModule
      })
      .then(modal => {
        modal.present();
      });
  }

  // signIn() {
  //   this.alertCtrl
  //   .create({
  // header: 'u sure?',
  // message: 'the match report will be declined',
  // buttons: [
  //   {
  //     text: 'leave',
  //     role: 'cancel'
  //   },
  //   {
  //     text: 'decline',
  //     handler: () => {
  //       this.dbService.declineMatch(this.matchId);
  //       this.router.navigate(['matches']);
  //     }
  //   }
  // ]
  // <firebase-ui></firebase-ui>
  //   })
  //   .then(alert => {
  //     alert.present();
  //   });
  // }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }
}
