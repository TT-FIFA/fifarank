import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player.model';
import { DbService } from '../../services/db.service';
import { Criteria } from './sorting-criteria';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
})
export class PlayerListComponent implements OnInit {
  @Input() orderBy;
  defaultSortingCriteria = Criteria.POINTS;
  @Input() descending;
  players: Player[];

  constructor(private dbService: DbService) {}

  ngOnInit() {
    let sortingCriteria = Criteria[this.orderBy.toUpperCase()];
    if (sortingCriteria == null) {
      sortingCriteria = this.defaultSortingCriteria;
    }

    this.dbService
      .getPlayers(sortingCriteria, this.descending)
      .subscribe(data => {
        this.players = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Player;
        });
      });
  }
}
