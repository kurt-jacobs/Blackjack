import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerComponent } from './dealer.component';
import {CardService} from '../../services/card.service';
import {StatsService} from '../../services/stats.service';

describe('DealerComponent', () => {
  let component: DealerComponent;
  let fixture: ComponentFixture<DealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerComponent ],
      providers: [CardService, StatsService ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
