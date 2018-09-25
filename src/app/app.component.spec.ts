import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {StatsComponent} from './stats/stats.component';
import {PlayerComponent} from './game-participant/player/player.component';
import {DealerComponent} from './game-participant/dealer/dealer.component';
import {CardService} from './services/card.service';
import {StatsService} from './services/stats.service';
import {DisplayableCardComponent} from './deck/cards/displayable-card/displayable-card.component';
import {CardShoeComponent} from './card-shoe/card-shoe.component';
import {DeckComponent} from './deck/deck.component';
import {GameParticipantComponent} from './game-participant/game-participant.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DisplayableCardComponent,
        CardShoeComponent,
        DeckComponent,
        GameParticipantComponent,
        HeaderComponent,
        StatsComponent,
        PlayerComponent,
        DealerComponent
      ],
      providers: [CardService, StatsService ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as dealer title 'Dealer'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.dealerTitle).toEqual('Dealer');
  }));
  it(`should have as player title 'Player'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.playerTitle).toEqual('Player');
  }));

  it('dealer should be defined', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const dealerChild: DealerComponent = fixture.componentInstance.dealer;
    expect(dealerChild).toBeDefined();
  }));

  it('player should be defined', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const playerChild: PlayerComponent = fixture.componentInstance.player;
    expect(playerChild).toBeDefined();
  }));

});
