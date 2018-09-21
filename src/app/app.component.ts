import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerComponent} from './game-participant/player/player.component';
import {CardService} from './services/card.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(PlayerComponent) player: PlayerComponent;
  dealerTitle = 'Dealer';
  playerTitle = 'Player';


  constructor(private cardService: CardService) {

  }

  ngOnInit() {

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
