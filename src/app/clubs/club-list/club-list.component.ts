import { Component, OnInit } from '@angular/core';
import { League } from '../league.model';
import bundesliga from '../../../assets/clubs/bundesliga.json';
import ekstraklasa from '../../../assets/clubs/ekstraklasa.json';
import laliga from '../../../assets/clubs/laliga.json';
import ligue1 from '../../../assets/clubs/ligue1.json';
import premierleague from '../../../assets/clubs/premierleague.json';
import seriea from '../../../assets/clubs/seriea.json';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
})
export class ClubListComponent implements OnInit {
  private leagues: League[] = [
    bundesliga,
    ekstraklasa,
    laliga,
    ligue1,
    premierleague,
    seriea,
  ];

  ngOnInit() {
    this.getClubs();
  }

  getClubs(): League[] {
    return this.leagues;
  }
}
