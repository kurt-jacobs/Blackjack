/**
 * Card serves as a base class for cards.  This class holds the numeric values
 * for a bard but not any presentation information (card face, card back etc).
 */

export class Card {
  protected _name: string;
  protected _value: number;
  protected _countValue: number;
  protected _faceUp: boolean;

  set name(value: string) {
    this._name = value;
  }

  set value(value: number) {
    this._value = value;
  }

  set countValue(value: number) {
    this._countValue = value;
  }

  set faceUp(value: boolean) {
    this._faceUp = value;
  }

  get name(): string {
    return this._name;
  }

  get value(): number {
    return this._value;
  }

  get countValue(): number {
    return this._countValue;
  }

  get faceUp(): boolean {
    return this._faceUp;
  }


}
