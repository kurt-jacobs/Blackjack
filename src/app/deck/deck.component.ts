import {Component, OnInit} from '@angular/core';
import {CardConfigModel} from './cards/card.config.model';
import {Card} from './cards/card';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: [],
})

export class DeckComponent implements OnInit {
  static CARDS_IN_DECK = 52;
  private deckCards: Card[] = [];
  private _deckColor: string;


  constructor(private cardConfig: CardConfigModel) {
      this.createDeck();
  }

  createDeck() {
    for (const card of this.cardConfig.cardNames) {
      for (const suit of this.cardConfig.cardSuits) {
        const newCard = new Card();
        newCard.name = card.name + suit;
        newCard.value = card.value;
        newCard.countValue = card.countValue;
        this.deckCards.push(newCard);
      }
    }

    this.shuffle(this.deckCards , 52);
  }

  set deckBackingColor(deckColor: string) {
    this._deckColor = deckColor;
  }
  get backImagePath(): string {
    return this.cardConfig.getBacking(this._deckColor);
  }

  shuffle(deckCards: Card[] , shuffleCnt) {
    for (let i = 0; i < shuffleCnt; i++) {
      const rndNo = this.getRandomInt(0, (shuffleCnt - 1));
      const card = deckCards[i];
      deckCards[i] = deckCards[rndNo];
      deckCards[rndNo] = card;
    }
  }

  get cards(): Card[] {
    return this.deckCards;
  }

  ngOnInit() {

  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
