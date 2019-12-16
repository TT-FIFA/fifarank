import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() disableBackButton: boolean;
  displayName: string;
  email: string;
  uid: string;

  constructor(public afAuth: AngularFireAuth, private popoverCtrl: PopoverController) {}

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
    this.popoverCtrl
      .create({
        component: LoginComponent
      })
      .then(popover => {
        popover.present();
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
