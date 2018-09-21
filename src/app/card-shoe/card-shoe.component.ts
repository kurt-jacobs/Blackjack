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
  static DECKS_TO_USE = CardConfigModel.DECK_COLORS.length;
  currentDeckIndex = 0;
  virtualActiveCards = 0;
  activeDeck: DeckComponent;
  stats: StatsModel;
  playedCards: Card[] = [];

  constructor() {
    this.initialize();
  }

  ngOnInit() {

  }

  /**
   * createCardShoe creates 1..N decks and adds each deck to the show.
   */
  createDeck() {
    this.activeDeck = new DeckComponent();
    this.activeDeck.deckBackingColor = CardConfigModel.DECK_COLORS[this.currentDeckIndex];
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
    this.currentDeckIndex = 0;
    this.virtualActiveCards =
        CardShoeComponent.DECKS_TO_USE * DeckComponent.CARDS_IN_DECK;
    this.playedCards.length = 0;

    this.createDeck();
  }

  /**
   * getCard pops a card off the stack to return the next card
   * in the card shoe
   */
  get card(): DisplayableCardComponent {
    // if current active deck empty, create a new active deck.
    if (this.activeDeck.cards.length === 0) {
      // exhausted current deck. advance index of deck colors to next color.
      this.currentDeckIndex = (this.currentDeckIndex + 1) % CardShoeComponent.DECKS_TO_USE;
      // console.log('current deck index= ' + this.currentDeckIndex);
      if (this.virtualActiveCards === 0) {
        this.initialize();
      } else {
        this.createDeck();
      }
    }

    const card = this.activeDeck.cards.pop();
    // virtualActiveCards holds the number of all cards in the shoe.
    // which include a real active deck and N "virtual decks"
    this.virtualActiveCards = this.virtualActiveCards - 1;
    // create a displayable card from a base card that doesn't have image
    // path information.
    const newCard = new DisplayableCardComponent();
    const faceImagePath = '../assets/images/' + card.name + '.jpg';
    newCard.name = card.name;
    newCard.value = card.value;
    newCard.countValue = card.countValue;
    newCard.faceImagePath = faceImagePath;
    this.updatePlayedCards(newCard);
    return newCard;
  }

  /**
   * cardWithBack optimizes the implementation by not providing a path
   * to the back of the card if the back will never be s
   * During game play, all cards are taken from the shoe.
   * Each time a card is dealt, it is added to the played cards.
   */
  get cardWithBack() {
    const cardWithBack = this.card;
    cardWithBack.backImagePath = this.activeDeck.backImagePath;
    return cardWithBack;
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

    return new StatsModel(this.virtualActiveCards, lowValue, neutralValue, highValue);
  }
}
