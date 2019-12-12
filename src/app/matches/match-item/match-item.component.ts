import { Component, Input } from '@angular/core';
import { Match } from '../match.model';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.scss'],
})
export class MatchItemComponent {
  @Input() matchItem: Match;
  
  constructor() { }

}
