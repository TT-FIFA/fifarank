import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {} from '';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  displayName: string;
  email: string;
  uid: string;

  constructor(public afAuth: AngularFireAuth, private modalCtrl: ModalController) {}

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
        component: ModalPage
      })
      .then(modal => {
        modal.present();
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }

  newUser() {
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //   console.log(error);
    // });
  }
}
