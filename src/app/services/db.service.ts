import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Match, Status } from '../matches/match.model';
import { Player } from '../players/player.model';
import { Club } from '../club.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbService {
  static MATCHES_PATH: string = 'matches';
  static SUMMARY_PATH: string = 'match-report';
  static PLAYERS_PATH: string = 'players';
  static CLUBS_PATH: string = 'clubs';

  constructor(public db: AngularFirestore) {}

  getMatches(): Observable<any> {
    return this.db.collection<Match>(DbService.MATCHES_PATH).snapshotChanges();
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

  getPlayer(email: string): Observable<any> {
    return this.db
      .collection<Player>('players', ref => ref.where('id', '==', email))
      .snapshotChanges();
  }
  // getPlayer(playerId: string): Observable<Player> {
  //   return this.db
  //     .collection<Player>(DbService.PLAYERS_PATH)
  //     .doc<Player>(playerId)
  //     .valueChanges();
  // }

  getClubs(): Observable<any> {
    return this.db.collection<Club>(DbService.CLUBS_PATH).snapshotChanges();
  }
}
