import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchListPage } from './match-list.page';

describe('MatchListPage', () => {
  let component: MatchListPage;
  let fixture: ComponentFixture<MatchListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
