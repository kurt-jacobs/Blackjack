import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameParticipantComponent } from './game-participant.component';

describe('GameParticipantComponent', () => {
  let component: GameParticipantComponent;
  let fixture: ComponentFixture<GameParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
