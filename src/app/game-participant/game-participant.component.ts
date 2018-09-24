import {Component, Input, OnInit} from '@angular/core';
import {DisplayableCardComponent} from '../deck/cards/displayable-card/displayable-card.component';
import {CardUtilities} from '../shared/card.utilities';
import {BlackjackConstants} from '../shared/blackjack.constants';


/**
 * GameParticipantComponent is the base class for all who play
 * blackjack (dealer and player).
 */
@Component({
  selector: 'app-blackjack-participant',
  templateUrl: './game-participant.component.html',
  styleUrls: ['./game-participant.component.css']
})

export class GameParticipantComponent implements OnInit {
  @Input() title = '';   // Dealer, Player etc.
  cards: DisplayableCardComponent[] = [];
  protected _gameStarted = false;
  playStatus = '';
  requestHitEnabled = true;
  requestStandEnabled = true;
  countForHand: number;
  assist = true;

  constructor() {
  }

  ngOnInit() {

  }

  toggleHighlight() {
    this.assist = !this.assist;
  }
  /**
   * delegate to utility class colorCodedBorder to determines the color of the outline to put
   * around a card
   */
  colorCodedBorder(card: DisplayableCardComponent) {
    let styling = 'img-responsive';

    if (card) {
      if (!this.assist) {
        styling = styling + ' border-white';
      } else {
        if (card.faceUp === false) {
          styling = styling + ' border-white';
        } else {
          const countValue = card.countValue;
          if (countValue === BlackjackConstants.HIGH_CARD_VALUE) {
            styling = styling + ' border-red';
          } else if (countValue === BlackjackConstants.LOW_CARD_VALUE) {
            styling = styling + ' border-green';
          } else if (countValue === BlackjackConstants.NEUTRAL_CARD_VALUE) {
            styling = styling + ' border-blue';
          }
        }
      }
    }
    return styling;
  }

  /**
   * updatePlayStatus is called by one of this classes that extends
   * this class.  It is called when the participant has drawn another
   * card or when a card that was face down is now face up.
   */
  updatePlayStatus(cardTotal: number) {
    if (cardTotal > BlackjackConstants.maxScore) {
      this.playStatus = 'Busted [' + cardTotal.toString() + ']';
    } else {
      this.playStatus = cardTotal.toString();
    }
  }

  updateCountTotal() {
    this.countForHand = CardUtilities.calculateCount(this.cards);
  }
  /**
   * updateButtonStatesBasedOnTotal  to disable the Hit button if the
   * player has busted.
   */
  updateButtonStatesBasedOnTotal(cardTotal: number) {
    if (cardTotal > BlackjackConstants.maxScore) {
      this.requestHitEnabled = false;
      this.requestStandEnabled = false;
    }
  }


  /**
   * calculateScore calculates the score and show the score that is
   * closest to 21 in the event that the participants have 1..N Aces.
   */
  calculateScore() {
    const totalCardValue = CardUtilities.calculateScore(this.cards);
    this.updatePlayStatus(totalCardValue);
    this.updateButtonStatesBasedOnTotal(totalCardValue);
    return totalCardValue;
  }


  get gameStarted()
  {
    return this._gameStarted;

  }

}
