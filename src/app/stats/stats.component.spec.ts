import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import {CardService} from '../services/card.service';
import {StatsService} from '../services/stats.service';
import {StatsModel} from './stats.model';


describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent ],
      providers: [CardService, StatsService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stats values should be equal', () => {
    const statsService = fixture.debugElement.injector.get(StatsService);
    statsService.publishStats(new StatsModel(104, 15, 10, 20) );
    fixture.detectChanges();
    expect(component.runningStats.lowValue).toEqual(15);
    expect(component.runningStats.neutralValue).toEqual(10);
    expect(component.runningStats.highValue).toEqual(20);
    expect(component.runningStats.totalCountValue).toEqual(-5);
  });

  it('adjusted deck value should be 4', () => {
    const statsService = fixture.debugElement.injector.get(StatsService);
    statsService.publishStats(new StatsModel(200, 20, 10, 15) );
    fixture.detectChanges();
    expect(component.adjustDecksRemaining).toEqual(4);
  });

  it('true count should equal 3', () => {
    const statsService = fixture.debugElement.injector.get(StatsService);
    statsService.publishStats(new StatsModel(100, 20, 10, 15) );
    fixture.detectChanges();
    expect(component.trueCount).toEqual(3);
  });


});
