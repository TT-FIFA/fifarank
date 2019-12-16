import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FirebaseUIModule } from 'firebaseui-angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FirebaseUIModule,
    RouterModule.forChild([
      {
        path: '',
        component: HeaderComponent
      }
    ])
  ],
  entryComponents: [LoginComponent],
  declarations: [HeaderComponent, LoginComponent],
  exports: [HeaderComponent]
})
export class ComponentsModule {}
