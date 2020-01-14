import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.page.html',
})
export class PlayerListPage implements OnInit {
  pageTitle = 'players';
  players: Player[];

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.dbService.getPlayers().subscribe(data => {
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Player;
      });
    });
  }
}
