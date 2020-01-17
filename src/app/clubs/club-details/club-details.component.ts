import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Club } from '../club.model';
import { League } from '../league.model';
import { ClubListComponent } from '../club-list/club-list.component';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
})
export class ClubDetailsComponent implements OnInit {
  league;
  club: Club;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clubsService: ClubListComponent
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.escapeIfNoClubId(paramMap);
      let clubId = paramMap.get('clubId');
      this.getClubOrEscape(clubId);
    });
  }

  escapeIfNoClubId(paramMap) {
    if (!paramMap.has('clubId')) {
      this.router.navigate(['./clubs']);
    }
  }

  getClubOrEscape(clubId: string) {
    let leagues = this.clubsService.getClubs();

    this.league = leagues.find(league =>
      league.clubs.find(club => club.id == clubId)
    );
    if (!this.league) {
      this.router.navigate(['./clubs']);
    }
    this.club = this.league.clubs.find(club => club.id == clubId);
  }
}
