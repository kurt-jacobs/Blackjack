import { Component, OnInit } from '@angular/core';
import {StatsService} from '../services/stats.service';
import {StatsModel} from './stats.model';
import {DeckComponent} from '../deck/deck.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private statsService:  StatsService) { }
  runningStats: StatsModel;

  ngOnInit() {
    this.runningStats = new StatsModel(0, 0, 0, 0, 0);
    this.statsService.counterStatistics
      .subscribe(
        (statsModel: StatsModel) => {
          this.runningStats.lowValue = statsModel.lowValue;
          this.runningStats.neutralValue = statsModel.neutralValue;
          this.runningStats.highValue = statsModel.highValue;
          this.runningStats.totalValue =  statsModel.totalValue;
          this.runningStats.availableCards = statsModel.availableCards;
          this.runningStats.playedCards = statsModel.playedCards;
        }
      );
  }

  getDeckRemaining() {
    console.log('available = ' + this.runningStats.availableCards);
    return this.runningStats.availableCards / DeckComponent.CARDS_IN_DECK;
  }

  getTrueCount() {
    const decksLeft = this.runningStats.availableCards / DeckComponent.CARDS_IN_DECK;
    return this.runningStats.totalValue / decksLeft;
  }

}
