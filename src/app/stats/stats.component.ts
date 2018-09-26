import {AfterContentInit, Component, OnInit} from '@angular/core';
import {StatsService} from '../services/stats.service';
import {StatsModel} from './stats.model';
import {CardService} from '../services/card.service';
import {BlackjackConstants} from '../shared/blackjack.constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterContentInit {
  runningStats: StatsModel;

  constructor(private statsService:  StatsService, private cardService: CardService) {

  }

  ngOnInit() {
    this.runningStats = new StatsModel(0, 0, 0, 0);
    this.statsService.counterStatistics
      .subscribe(
        (statsModel: StatsModel) => {
          this.runningStats.lowValue = statsModel.lowValue;
          this.runningStats.neutralValue = statsModel.neutralValue;
          this.runningStats.highValue = statsModel.highValue;
          this.runningStats.totalCountValue =  statsModel.totalCountValue;
          this.runningStats.availableCards = statsModel.availableCards;

        }
      );
  }

  ngAfterContentInit() {
    this.cardService.requestUpdate();
  }

  get decksRemaining() {
    return this.runningStats.availableCards / BlackjackConstants.CARDS_IN_DECK;
  }

  get adjustDecksRemaining() {
    const decksLeft = this.decksRemaining;
    return Math.round((decksLeft + 0.12) / 0.25) * 0.25;
  }

  get trueCount() {
    const decksLeft = (this.adjustDecksRemaining > 0) ? this.adjustDecksRemaining : 0.1;
    return Math.round(this.runningStats.totalCountValue / decksLeft);
  }

}
