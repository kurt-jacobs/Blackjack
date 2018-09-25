import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../services/card.service';
import {GameParticipantComponent} from '../game-participant.component';
import {DisplayableCardComponent} from '../../deck/cards/displayable-card/displayable-card.component';
import {BlackjackConstants} from '../../shared/blackjack.constants';

/**
 * PlayerComponent extends GameParticipantComponent and contains
 * behavior for "hit" and "stand".
 */
@Component({
  selector: 'app-player',
  templateUrl: '../game-participant.component.html',
  styleUrls: ['../game-participant.component.css', './player.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent extends GameParticipantComponent implements OnInit {
  constructor(private cardService: CardService) {
    super();
  }

  /**
   * Subscribe to the playerDeal event which deals cards to a player
   */
  ngOnInit() {
    this.cardService.playerDeal
      .subscribe(
        (cards: DisplayableCardComponent[]) => {
          this.cards = cards;
          this.calculateScore();
          this.updateCountTotal();
          this.requestHitEnabled = true;
          this.requestStandEnabled = true;
        }
      );
  }

  /**
   * Player request another card. This request is proxied to the
   * CardService.
   */
  requestHit() {
    this.cards.push(this.cardService.requestCard());
    const totalScore = this.calculateScore();
    this.updateCountTotal();
    if (totalScore > BlackjackConstants.MAX_SCORE) {
      this.publishBust();
    }
  }

  /**
   * Player has decided not to take another card.  The CardService
   * performs a requestStand which will in turn let the dealer know
   * that it's his turn to take cards.
   */
  requestStand() {
    this.requestHitEnabled = false;
    this.requestStandEnabled = false;
    this.cardService.requestStand();
  }

  /**
   * Player has exceeded 21. The publishBust is called on
   * cardService and the Hit button is disabled.
   */
  publishBust() {
    this.requestHitEnabled = false;
    this.requestStandEnabled = false;
    this.cardService.publishBust();
  }

}
