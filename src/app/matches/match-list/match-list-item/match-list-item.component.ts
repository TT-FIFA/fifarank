import { Component, Input } from '@angular/core';
import { Match } from '../../match.model';

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
})
export class MatchListItemComponent {
  @Input() matchListItem: Match;

  constructor() {}
}
