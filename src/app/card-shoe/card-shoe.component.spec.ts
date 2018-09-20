import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShoeComponent } from './card-shoe.component';

describe('CardShoeComponent', () => {
  let component: CardShoeComponent;
  let fixture: ComponentFixture<CardShoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardShoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
