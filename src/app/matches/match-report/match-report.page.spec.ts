import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchReportPage } from './match-report.page';

describe('MatchReportPage', () => {
  let component: MatchReportPage;
  let fixture: ComponentFixture<MatchReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
