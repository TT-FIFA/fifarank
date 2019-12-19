import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchViewPage } from './MatchViewPage';

describe('MatchViewPage', () => {
  let component: MatchViewPage;
  let fixture: ComponentFixture<MatchViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
