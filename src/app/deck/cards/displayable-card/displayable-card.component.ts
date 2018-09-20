import { Component, OnInit } from '@angular/core';
import {Card} from '../card';

@Component({
  selector: 'app-displayable-card',
  templateUrl: './displayable-card.component.html',
  styleUrls: ['./displayable-card.component.css']
})
export class DisplayableCardComponent extends Card implements OnInit {
  private _faceImagePath: string;
  private _backImagePath: string;

  constructor() {
    super();
    this._faceUp = true;
  }

  set faceImagePath(value: string) {
    this._faceImagePath = value;
  }

  set backImagePath(value: string) {
    this._backImagePath = value;
  }

  get faceImagePath(): string {
    return this._faceImagePath;
  }

  get backImagePath(): string {
    return this._backImagePath;
  }

  ngOnInit() {
  }

  /**
   * getCardImage is called by the template to show either the front
   * or the back of a card based on the state of the card.
   * For this game, the dealer has 1 card ace down until
   * the conclusion of the player's play.
   */
  getCardImage() {
    if (this._faceUp)  {
      return this._faceImagePath;
    } else {
      return this._backImagePath;
    }
  }
}
