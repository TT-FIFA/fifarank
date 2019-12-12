import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from '../match.model';
import { DbService } from 'src/app/services/db.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage implements OnInit {
  private matchDoc: AngularFirestoreDocument<Match>;
  match: Match;

  constructor(private activatedRoute: ActivatedRoute,
    private dbService: DbService,
    public db: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('matchId')) {
        this.router.navigate(['./matches']);
        return;
      }
      const matchId = paramMap.get('matchId');

      this.dbService.getMatch(matchId).subscribe(result => {
        this.match = result;
      })
      });
  }


}