import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DisplayableCardComponent } from './deck/cards/displayable-card/displayable-card.component';
import { CardShoeComponent } from './card-shoe/card-shoe.component';
import { DeckComponent } from './deck/deck.component';
import { GameParticipantComponent } from './game-participant/game-participant.component';
import { HeaderComponent } from './header/header.component';
import { StatsComponent } from './stats/stats.component';
import { PlayerComponent } from './game-participant/player/player.component';
import { DealerComponent } from './game-participant/dealer/dealer.component';
import {CardService} from './services/card.service';
import {StatsService} from './services/stats.service';

@NgModule({
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
  imports: [
    BrowserModule
  ],
  providers: [CardService, StatsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
