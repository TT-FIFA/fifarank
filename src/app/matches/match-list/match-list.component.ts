import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../match.model';
import { DbService } from '../../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
})
export class MatchListComponent implements OnInit {
  @Input() orderBy = 'date';
  @Input() descending = 'true';
  @Input() playerName: string;
  matches: Match[];

  constructor(private dbService: DbService, public db: AngularFirestore) {}

  ngOnInit() {
    if (this.playerName) {
      this.dbService
        .getPlayerMatches(this.playerName, this.orderBy, this.descending)
        .subscribe(data => {
          this.matches = data
            .map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data(),
                date: this.formatDate(e.payload.doc.get('date').toDate()),
                daysAgo: this.calculatePastDays(
                  e.payload.doc.get('date').seconds
                ),
              } as Match;
            })
            .sort((a, b) => a.daysAgo - b.daysAgo);
        });
    } else {
      this.dbService
        .getMatches(this.orderBy, this.descending)
        .subscribe(data => {
          this.matches = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data(),
              date: this.formatDate(e.payload.doc.get('date').toDate()),
              daysAgo: this.calculatePastDays(
                e.payload.doc.get('date').seconds
              ),
            } as Match;
          });
        });
    }
  }

  formatDate(date: Date): string {
    let dayOfWeek = date.getDay();
    let dayName = this.formatDayOfWeek(dayOfWeek);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let prettyDate = dayName + ', ' + day + '.' + month + '.' + year;

    return prettyDate;
  }

  formatDayOfWeek(dayOfWeek: number): string {
    switch (dayOfWeek) {
      case 0:
        return 'sunday';
      case 1:
        return 'monday';
      case 2:
        return 'tuesday';
      case 3:
        return 'wednesday';
      case 4:
        return 'thursday';
      case 5:
        return 'friday';
      case 6:
        return 'saturday';
      default:
        return '';
    }
  }

  calculatePastDays(dateInSeconds: number): number {
    let todayInSeconds = new Date().valueOf() / 1000;
    let secondsPassed = todayInSeconds - dateInSeconds;
    let secondsInDay = 60 * 60 * 24;
    let daysPassed = secondsPassed / secondsInDay;
    let daysAgo = Math.floor(daysPassed);

    return daysAgo;
  }
}
