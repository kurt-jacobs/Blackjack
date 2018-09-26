export class StatsModel {
  private _highValue: number;
  private _neutralValue: number;
  private _lowValue: number;
  private _totalCountValue: number;
  private _availableCards: number;

  constructor(availableCards: number,
              lowValue: number, neutralValue: number, highValue: number)
  {
    this._lowValue = lowValue;
    this._neutralValue = neutralValue;
    this._highValue = highValue;
    this._totalCountValue = ((this._lowValue)
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

  get totalCountValue(): number {
    return this._totalCountValue;
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

  set totalCountValue(value: number) {
    this._totalCountValue = value;
  }

  set availableCards(value: number) {
    this._availableCards = value;
  }


}
