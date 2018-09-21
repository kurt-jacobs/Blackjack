import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {StatsService} from '../services/stats.service';
import {StatsModel} from './stats.model';
import {DeckComponent} from '../deck/deck.component';
import {CardService} from '../services/card.service';

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
          this.runningStats.totalValue =  statsModel.totalValue;
          this.runningStats.availableCards = statsModel.availableCards;

        }
      );
  }

  ngAfterContentInit() {
    this.cardService.requestUpdate();
  }

  get decksRemaining() {
    return this.runningStats.availableCards / DeckComponent.CARDS_IN_DECK;
  }

  get trueCount() {
    const decksLeft = this.runningStats.availableCards / DeckComponent.CARDS_IN_DECK;
    return this.runningStats.totalValue / decksLeft;
  }

}
