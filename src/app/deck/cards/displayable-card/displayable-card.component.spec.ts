import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayableCardComponent } from './displayable-card.component';

describe('DisplayableCardComponent', () => {
  let component: DisplayableCardComponent;
  let fixture: ComponentFixture<DisplayableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
