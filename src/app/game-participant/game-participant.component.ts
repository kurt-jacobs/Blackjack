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

  static borderMap = new Map([
    [BlackjackConstants.LOW_CARD_VALUE, 'border-green'],
    [BlackjackConstants.NEUTRAL_CARD_VALUE, 'border-blue'],
    [BlackjackConstants.HIGH_CARD_VALUE, 'border-red']
  ]);

  private _requestHitEnabled = true;
  private _requestStandEnabled = true;
  private _assist = true;
  private _countForHand: number;
  private _playStatus = '';
  private _cards: DisplayableCardComponent[] = [];
  @Input() title = '';   // Dealer, Player etc.

  constructor() {
  }

  get cards(): DisplayableCardComponent[] {
    return this._cards;
  }

  set cards(value: DisplayableCardComponent[]) {
    this._cards = value;
  }

  get assist(): boolean {
    return this._assist;
  }

  set playStatus(value: string) {
    this._playStatus = value;
  }

  get playStatus(): string {
    return this._playStatus;
  }

  get countForHand(): number {
    return this._countForHand;
  }

  get requestHitEnabled() {
    return this._requestHitEnabled;
  }

  set requestHitEnabled(requestEnable: boolean) {
    this._requestHitEnabled = requestEnable;
  }

  get requestStandEnabled() {
    return this._requestStandEnabled;
  }

  set requestStandEnabled(requestEnable: boolean) {
    this._requestStandEnabled = requestEnable;
  }

  ngOnInit() {

  }

  /**
   * toggleAssist is called to toggle the assist variable which controls
   * whether or not the user see visual aids (borders, count display)
   * to determine the card count
   */
  toggleAssist() {
    this._assist = !this._assist;
  }

  /**
   * colorCodedBorder returns the proper border for a card.  Border color depends on
   * count value and whether or not assist is enabled.
   */
  colorCodedBorder(card: DisplayableCardComponent) {
    let styling = 'img-responsive';

    if (card) {
      if (!this._assist || (card.faceUp === false)) {
        styling = styling + ' border-white';
      } else {
        styling = styling + ' ' + GameParticipantComponent.borderMap.get(card.countValue);

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
    if (cardTotal > BlackjackConstants.MAX_SCORE) {
      this._playStatus = 'Busted [' + cardTotal.toString() + ']';
    } else {
      this._playStatus = cardTotal.toString();
    }
  }

  updateCountTotal() {
    this._countForHand = CardUtilities.calculateCount(this._cards);
  }

  /**
   * updateButtonStatesBasedOnTotal to disable the Hit button if the
   * player has busted.
   */
  updateButtonStatesBasedOnTotal(cardTotal: number) {
    if (cardTotal > BlackjackConstants.MAX_SCORE) {
      this._requestHitEnabled = false;
      this.requestStandEnabled = false;
    }
  }

  /**
   * calculateScore calculates the score and show the score that is
   * closest to 21 in the event that the participants have 1..N Aces.
   */
  calculateScore() {
    const totalCardValue = CardUtilities.calculateScore(this._cards);
    this.updatePlayStatus(totalCardValue);
    this.updateButtonStatesBasedOnTotal(totalCardValue);
    return totalCardValue;
  }

}
