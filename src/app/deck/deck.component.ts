import {Component, OnInit} from '@angular/core';
import {CardConfigModel} from './cards/card.config.model';
import {Card} from './cards/card';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: [],
})

export class DeckComponent implements OnInit {
  private deckCards: Card[] = [];
  private _deckColor: string;

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static shuffle(deckCards: Card[] , shuffleCnt) {
    const timesToShuffle = DeckComponent.getRandomInt(5, 10);
    for (let tsi = 0 ;  tsi < timesToShuffle; ++tsi) {
      for (let i = 0; i < shuffleCnt; i++) {
        const rndNo = DeckComponent.getRandomInt(0, (shuffleCnt - 1));
        const card = deckCards[i];
        deckCards[i] = deckCards[rndNo];
        deckCards[rndNo] = card;
      }
    }
  }

  constructor() {
      this.createDeck();
  }

  createDeck() {
    for (const card of CardConfigModel.cardNames) {
      for (const suit of CardConfigModel.cardSuits) {
        const newCard = new Card();
        newCard.name = card.name + suit;
        newCard.value = card.value;
        newCard.countValue = card.countValue;
        this.deckCards.push(newCard);
      }
    }
  }

  set deckBackingColor(deckColor: string) {
    this._deckColor = deckColor;
  }

  get backImagePath(): string {
    return CardConfigModel.deckBackings.get(this._deckColor);
  }

  get cards(): Card[] {
    return this.deckCards;
  }

  ngOnInit() {

  }
}
