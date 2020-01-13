import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController, NavController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string;
  displayName: string;
  email: string;
  uid: string;

  constructor(
    public afAuth: AngularFireAuth,
    private popoverCtrl: PopoverController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
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
        component: LoginComponent,
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

  goBack() {
    this.navCtrl.back();
  }
}
