export class BlackjackConstants {
  static CARDS_IN_DECK = 52;
  static maxScore = 21;

  /**
   *   Values given to cards depending upon the category the card is in
   *   2,3,4,5,6: LOW_CARD_VALUE
   *   7.8,9: NEUTRAL_CARD_VALUE
   *   10,J,Q,K,A: HIGH_CARD_VALUE
   */
  static LOW_CARD_VALUE = 1;
  static NEUTRAL_CARD_VALUE = 0;
  static HIGH_CARD_VALUE = -1;

}
