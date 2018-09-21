export class StatsModel {
    highValue: number;
    neutralValue: number;
    lowValue: number;
    totalValue: number;
    availableCards: number;


    constructor(availableCards: number ,
                lowValue: number, neutralValue: number, highValue: number,
                ) {
      this.lowValue = lowValue;
      this.neutralValue = neutralValue;
      this.highValue = highValue;
      this.totalValue = ((this.lowValue * 1)
        + (this.highValue * -1));
      this.availableCards = availableCards;
    }

}
