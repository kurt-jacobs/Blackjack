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
  _gameStarted = false;
  playStatus = '';
  requestHitEnabled = true;
  requestStandEnabled = true;

  constructor() {
  }

  ngOnInit() {

  }

  /**
   * delegate to utility class colorCodedBorder to determines the color of the outline to put
   * around a card
   */
  colorCodedBorder(card: DisplayableCardComponent) {
    return CardUtilities.colorCodedBorder(card);
  }

  /**
   * updatePlayStatus is called by one of this classes that extends
   * this class.  It is called when the participant has drawn another
   * card or when a card that was face down is now face up.
   */
  updatePlayStatus(cardTotal: number) {
    this.playStatus = cardTotal.toString();
    if (cardTotal > BlackjackConstants.maxScore) {
      this.playStatus = 'Busted [' + cardTotal.toString() + ']';
    }
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
