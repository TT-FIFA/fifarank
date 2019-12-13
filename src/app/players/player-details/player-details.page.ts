import { Component, OnInit } from '@angular/core';
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
  players: Player[];

  constructor(
    private activatedRoute: ActivatedRoute,
    public dbService: DbService,
    // private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('playerId')) {
        this.router.navigate(['./players']);
        return;
      }
      const playerId = paramMap.get('playerId');

      this.dbService.getPlayer(playerId).subscribe(data => {
        this.players = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Player;
        });
      });
    });
  }
}

// ionViewWillEnter() {
//   let id = this.activatedRoute.snapshot.paramMap.get('id');
//   if (id) {
//     this.playerService.getPlayer(id).subscribe(player => {
//       this.player = player;
//     });
//   }
// }

// addPlayer() {
//   this.playerService.addPlayer(this.player).then(() => {
//     this.router.navigateByUrl('/');
//     this.showToast('Player added');
//   }, err => {
//     this.showToast('There was a problem adding your player :(');
//   });
// }

// deletePlayer() {
//   this.playerService.deletePlayer(this.player.id).then(() => {
//     this.router.navigateByUrl('/');
//     this.showToast('Player deleted');
//   }, err => {
//     this.showToast('There was a problem deleting your player :(');
//   });
// }

// updatePlayer() {
//   this.playerService.updatePlayer(this.player).then(() => {
//     this.showToast('Player updated');
//   }, err => {
//     this.showToast('There was a problem updating your player :(');
//   });
// }

// showToast(msg) {
//   this.toastCtrl.create({
//     message: msg,
//     duration: 2000
//   }).then(toast => toast.present());
// }
