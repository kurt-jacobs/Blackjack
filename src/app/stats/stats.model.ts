export class StatsModel {
  private _highValue: number;
  private _neutralValue: number;
  private _lowValue: number;
  private _totalValue: number;
  private _availableCards: number;

  constructor(availableCards: number,
              lowValue: number, neutralValue: number, highValue: number)
  {
    this._lowValue = lowValue;
    this._neutralValue = neutralValue;
    this._highValue = highValue;
    this._totalValue = ((this._lowValue)
      + (this._highValue * -1));
    this._availableCards = availableCards;
  }

  get highValue(): number {
    return this._highValue;
  }

  get neutralValue(): number {
    return this._neutralValue;
  }

  get lowValue(): number {
    return this._lowValue;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  get availableCards(): number {
    return this._availableCards;
  }
  
  set highValue(value: number) {
    this._highValue = value;
  }

  set neutralValue(value: number) {
    this._neutralValue = value;
  }

  set lowValue(value: number) {
    this._lowValue = value;
  }

  set totalValue(value: number) {
    this._totalValue = value;
  }

  set availableCards(value: number) {
    this._availableCards = value;
  }


}
