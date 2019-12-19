import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Match, Status } from '../matches/match.model';
import { Player } from '../players/player.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbService {
  static MATCHES_PATH: string = 'matches';
  static PLAYERS_PATH: string = 'players';
  static LEAGUES_PATH: string = 'leagues';
  static CLUBS_PATH: string = 'clubs';

  constructor(public db: AngularFirestore) {}

  getMatches(orderBy: string, descending: string): Observable<any> {
    return this.db
      .collection<Match>(DbService.MATCHES_PATH, ref => ref.orderBy(orderBy, descending ? 'desc' : 'asc'))
      .snapshotChanges();
  }

  getMatch(matchId: string): Observable<Match> {
    return this.db
      .collection<Match>(DbService.MATCHES_PATH)
      .doc<Match>(matchId)
      .valueChanges();
  }

  addMatch(value: Match): Promise<any> {
    return this.db.collection(DbService.MATCHES_PATH).add({
      date: new Date(value.date),
      type: value.type,
      hostName: value.hostName,
      guestName: value.guestName,
      hostClub: value.hostClub,
      guestClub: value.guestClub,
      hostScore: value.hostScore,
      guestScore: value.guestScore,
      status: Status.REPORTED
    });
  }

  approveMatch(matchId: string) {}

  editMatch(matchId: string) {}

  declineMatch(matchId: string) {}

  getPlayers(): Observable<any> {
    return this.db
      .collection<Player>(DbService.PLAYERS_PATH, ref => ref.orderBy('points', 'desc'))
      .snapshotChanges();
  }

  getPlayer(playerId: string): Observable<any> {
    return this.db
      .collection<Player>(DbService.PLAYERS_PATH)
      .doc<Player>(playerId)
      .snapshotChanges();
  }

  createPlayer(id: string, name: string, email: string): Promise<any> {
    return this.db
      .collection<Player>(DbService.PLAYERS_PATH)
      .doc<Player>(id)
      .set(
        {
          name: name,
          email: email,
          points: '0',
          matches: '0',
          averageGoalRatio: '0',
          favoriteClub: ''
        },
        { merge: true }
      )
      .then(docRef => {
        console.log('Document written with ID: ', docRef);
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }

  updatePlayerName(id: string, newName: string): Promise<any> {
    return this.db
      .collection<Player>(DbService.PLAYERS_PATH)
      .doc<Player>(id)
      .update({
        name: newName
      })
      .then(docRef => {
        console.log('Document updated');
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  }

  getClubs(): Observable<any> {
    return this.db.collection<Club>(DbService.CLUBS_PATH).snapshotChanges();
  }
}
