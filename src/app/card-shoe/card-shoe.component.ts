import {Component, OnInit} from '@angular/core';
import {DeckComponent} from '../deck/deck.component';
import {StatsModel} from '../stats/stats.model';
import {DisplayableCardComponent} from '../deck/cards/displayable-card/displayable-card.component';
import {CardConfigModel} from '../deck/cards/card.config.model';
import {Card} from '../deck/cards/card';

/**
 * CardShoeComponent models a card shoe with 1..N decks.
 * During game play, all cards are taken from the shoe.
 * Each time a card is dealt, it is added to the played cards.
 */
@Component({
  selector: 'app-card-shoe',
  templateUrl: './card-shoe.component.html',
  styleUrls: []
})

export class CardShoeComponent implements OnInit {
  activeDeck: DeckComponent ;
  //availableCards: Card[] = [];
  playedCards: Card[] = [];

  constructor() {
    this.createCardShoe();
  }

  ngOnInit() {

  }

  /**
   * createCardShoe creates 1..N decks and adds each deck to the show.
   */
  createCardShoe() {
    this.activeDeck = new DeckComponent(CardConfigModel.GREEN);
   // this.activeDeck.cards = this.availableCards.concat(this.activeDeck.cards);
   // this.activeDeck.createDeck(CardConfigModel.GREEN));
    // this.availableCards = this.availableCards.concat(deck.createDeck(CardConfigModel.GRAY));
    // this.availableCards = this.availableCards.concat(deck.createDeck(CardConfigModel.YELLOW));
    // this.availableCards = this.availableCards.concat(deck.createDeck(CardConfigModel.BLUE));
    // this.availableCards = this.availableCards.concat(deck.createDeck(CardConfigModel.RED));
  }

  // Used for debug
  printDebug(cardsToPrint: Card[]) {
    for (let i = 0; i < cardsToPrint.length; i++) {
      console.log('Card = ' + i + '  ', cardsToPrint[i]);
    }
    console.log('Shoe cards= ' + cardsToPrint.length);
  }

  /**
   * updatePlayedCards models a card shoe with 1..N decks.
   * During game play, all cards are taken from the shoe.
   * Each time a card is dealt, it is added to the played cards.
   */
  updatePlayedCards(card: Card) {
    this.playedCards.push(card);
  }

  initialize() {
    this.activeDeck.cards.length = 0;
    this.playedCards.length = 0;
    this.createCardShoe();
  }

  /**
   * getCard pops a card off the stack to return the next card
   * in the card shoe
   */
  get card(): DisplayableCardComponent {
    if (this.activeDeck.cards.length > 0) {
      const card = this.activeDeck.cards.pop();

      // create a displayable card from a base card that doesn't have image
      // path information.
      const newCard = new DisplayableCardComponent();
      const faceImagePath = '../assets/images/' + card.name + '.jpg';
      newCard.name = card.name;
      newCard.value = card.value;
      newCard.countValue = card.countValue;
      newCard.backImagePath = this.activeDeck.backImagePath;
      newCard.faceImagePath = faceImagePath;

      this.updatePlayedCards(newCard);
      return newCard;
    } else {
      return null;
    }
  }

  /**
   * getCounterStats calculates the values for counting cards.
   * Face down cards are not counted as this tool simulates what
   * a player would be able to see to determine counts
   */
  get counterStats(): StatsModel {
    let lowValue = 0;
    let neutralValue = 0;
    let highValue = 0;

    if ((this.playedCards) && (this.playedCards.length > 0)) {
      for (let i = 0; i < this.playedCards.length; i++) {
        const card = this.playedCards[i];

        if (card.faceUp) {
          const countValue = this.playedCards[i].countValue;
          if (countValue === -1) {
            highValue++;
          } else if (countValue === 0) {
            neutralValue++;
          } else if (countValue === 1) {
            lowValue++;
          }
        }
      }
    }

    return new StatsModel(lowValue, neutralValue, highValue,
      this.activeDeck.cards.length,
      this.playedCards.length);
  }
}
