import { Component } from '@angular/core';
import { Club } from './club.model';
import bundesliga from '../../assets/clubs/bundesliga.json';
import ekstraklasa from '../../assets/clubs/ekstraklasa.json';
import laliga from '../../assets/clubs/laliga.json';
import ligue1 from '../../assets/clubs/ligue1.json';
import premierleague from '../../assets/clubs/premierleague.json';
import seriea from '../../assets/clubs/seriea.json';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss']
})
export class ClubsPage {
  private pageTitle = 'clubs';
  private clubs: Club[] = [].concat(bundesliga, ekstraklasa, laliga, ligue1, premierleague, seriea);

  getClubs(): Club[] {
    return this.clubs;
  }
}
