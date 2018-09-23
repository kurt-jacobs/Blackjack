import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerComponent} from './game-participant/player/player.component';
import {CardService} from './services/card.service';
import {GameParticipantComponent} from './game-participant/game-participant.component';
import {DealerComponent} from './game-participant/dealer/dealer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DealerComponent) dealer: DealerComponent;
  @ViewChild(PlayerComponent) player: PlayerComponent;
  dealerTitle = 'Dealer';
  playerTitle = 'Player';


  constructor(private cardService: CardService) {

  }

  ngOnInit() {

  }

  toggleHighlight() {
    this.player.toggleHighlight();
    this.dealer.toggleHighlight();
  }

  /**
   * dealCards proxies to the CardService to deal cards to
   * the game participants.
   */
  dealCards() {
    this.cardService.dealCards();
  }

  requestHitDisabled() {
    return !this.player.requestHitEnabled;
  }

  requestStandDisabled() {
    return !this.player.requestStandEnabled;
  }

  requestStand() {
    this.player.requestStand();
  }

  requestHit()  {
    this.player.requestHit();
  }


}
