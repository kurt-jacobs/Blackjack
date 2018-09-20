import {EventEmitter, Injectable} from '@angular/core';
import {StatsService} from './stats.service';
import {CardShoeComponent} from '../card-shoe/card-shoe.component';
import {PlayStatus} from '../shared/play.status';
import {nullSafeIsEquivalent} from '../../../node_modules/@angular/compiler/src/output/output_ast';
import {DisplayableCardComponent} from '../deck/cards/displayable-card/displayable-card.component';

@Injectable()
export class CardService {
  shoe: CardShoeComponent;
  playerDeal = new EventEmitter<DisplayableCardComponent[]>();
  dealerDeal = new EventEmitter<DisplayableCardComponent[]>();
  dealerStatus = new EventEmitter<PlayStatus>();

  constructor(private statsService: StatsService) {
    this.shoe = new CardShoeComponent();
  }

  // Deal cards to the dealer. First card is face down.
  dealDealerCards() {
    const cards: DisplayableCardComponent[] = [];
    const firstCard = this.shoe.card;
    firstCard.faceUp = false;
    cards.push(firstCard);
    cards.push(this.shoe.card);
    this.dealerDeal.emit(cards);
  }

  // Deal cards to the player. Both cards are face up
  dealPlayerCards() {
    const cards: DisplayableCardComponent[] = [];
    cards.push(this.shoe.card);
    cards.push(this.shoe.card);
    this.playerDeal.emit(cards);
  }

  // Deal both dealer and player and update the counter statistics
  // When shoe is within 10 cards of being out, the shoe resets.
  dealCards() {
     // if (this.shoe.availableCards.length < 11) {
     //   this.shoe.initialize();
     // }

    this.dealDealerCards();
    this.dealPlayerCards();
    this.statsService.publishStats(this.shoe.counterStats);
  }

  requestCard() {
    const card = this.shoe.card;
    this.statsService.publishStats(this.shoe.counterStats);
    if (card != null) {
      return card;
    }
  }

  requestStand() {
    this.dealerStatus.emit(PlayStatus.player_stands);
    this.statsService.publishStats(this.shoe.counterStats);
  }

  publishBust() {
    this.dealerStatus.emit(PlayStatus.player_bust);
    this.statsService.publishStats(this.shoe.counterStats);
  }

}
