import {Component, Input, OnInit} from '@angular/core';
import {DisplayableCardComponent} from '../deck/cards/displayable-card/displayable-card.component';


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
  maxScore = 21;
  aceValueDelta = 10;     // value of ace upper bound added to the 1.
  @Input() title = '';   // Dealer, Player etc.
  cards: DisplayableCardComponent[] = [];
  gameStarted = false;
  handClosed = false;
  playStatus = '';
  requestHitEnabled = true;
  requestStandEnabled = true;

  constructor() {
  }

  ngOnInit() {


  }

  /**
   * colorCodedBorder determines the color of the outline to put
   * around a card based on the value of the card and whether or not
   * it's face up.
   */
  colorCodedBorder(card: DisplayableCardComponent) {
    let styling = 'img-responsive';

    if (card) {
      if (card.faceUp === false) {
        styling = 'img-responsive border-white';
      } else {
        const countValue = card.countValue;
        if (countValue === -1) {
          styling = 'img-responsive border-red';
        } else if (countValue === 1) {
          styling = 'img-responsive border-green';
        } else if (countValue === 0) {
          styling = 'img-responsive border-blue';
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
    this.playStatus = cardTotal.toString();
    if (cardTotal > this.maxScore) {
      this.playStatus = 'Busted [' + cardTotal.toString() + ']';
    }
  }

  /**
   * updateButtonStatesBasedOnTotal  to disable the Hit button if the
   * player has busted.
   */
  updateButtonStatesBasedOnTotal(cardTotal: number) {
    if (cardTotal > this.maxScore) {
      this.requestHitEnabled = false;
      this.requestStandEnabled = false;
    }
  }


  /**
   * calculateScore calculates the score and show the score that is
   * closest to 21 in the event that the participants have 1..N Aces.
   */
  calculateScore() {
    let totalCardValue = 0;
    let acesFound = 0;

    if ((this.cards) && (this.cards.length > 0)) {
      const cardsToCalc = this.cards.slice().sort((card1, card2) => {
        return card2.value - card1.value;
      });

      for (let i = 0; i < cardsToCalc.length; i++) {

        if (cardsToCalc[i].faceUp) {
          if (cardsToCalc[i].value === 1) {
            acesFound = acesFound + 1;
          }
          totalCardValue += cardsToCalc[i].value;
        }
      }
      // Convert any Aces to 11 if under 22 total
      for (let i = 0; i < acesFound && totalCardValue <= this.maxScore; i++) {
        if (totalCardValue + this.aceValueDelta <= this.maxScore) {
          totalCardValue = totalCardValue + this.aceValueDelta;
        }
      }
    }
    this.updatePlayStatus(totalCardValue);
    this.updateButtonStatesBasedOnTotal(totalCardValue);
    return totalCardValue;
  }

  /**
   * isGameStarted hides the UI until the game has started.  The games is
   * considered started when he first cards are dealt.  At that time, the
   * controls (if any) and cards are displayed.
   * it's face up.
   */
  isGameStarted()
  {
    return this.gameStarted;
  }

}
