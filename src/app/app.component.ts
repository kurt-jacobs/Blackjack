import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerComponent} from './game-participant/player/player.component';
import {CardService} from './services/card.service';
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

  /**
   * Proxy to the game participants components - dealer and player.
   */
  toggleAssist() {
    this.player.toggleAssist();
    this.dealer.toggleAssist();
  }

  /**
   * dealCards proxies to the CardService to deal cards to
   * the game participants.
   */
  dealCards() {
    this.cardService.dealCards();
  }

  get hitDisabled() {
    return !this.player.requestHitEnabled;
  }

  get standDisabled() {
    return !this.player.requestStandEnabled;
  }

  requestStand() {
    this.player.requestStand();
  }

  requestHit()  {
    this.player.requestHit();
  }


}
