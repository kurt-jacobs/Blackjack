import {DisplayableCardComponent} from '../deck/cards/displayable-card/displayable-card.component';
import {BlackjackConstants} from './blackjack.constants';
import {Card} from '../deck/cards/card';

export class CardUtilities {
  static aceValueDelta = 10;     // value of ace upper bound added to the 1.

  /**
   * calculateScore calculates the score and show the score that is
   * closest to 21 in the event that the participants have 1..N Aces.
   */
  static calculateScore(cards: DisplayableCardComponent[]) {
    let totalCardValue = 0;
    let acesFound = 0;

    if ((cards) && (cards.length > 0)) {
      const cardsToCalc = cards.slice().sort((card1, card2) => {
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
      for (let i = 0; i < acesFound && totalCardValue <= BlackjackConstants.maxScore; i++) {
        if (totalCardValue + this.aceValueDelta <= BlackjackConstants.maxScore) {
          totalCardValue = totalCardValue + this.aceValueDelta;
        }
      }
    }

    return totalCardValue;
  }


  // Used for debug
  static printDebug(cardsToPrint: Card[]) {
    for (let i = 0; i < cardsToPrint.length; i++) {
      console.log('Card = ' + i + '  ', cardsToPrint[i]);
    }
    console.log('Shoe cards= ' + cardsToPrint.length);
  }

}
