import { Component, Input } from '@angular/core';
import { Match } from '../../match.model';

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.scss']
})
export class MatchListItemComponent {
  @Input() matchListItem: Match;

  constructor() {}
}
