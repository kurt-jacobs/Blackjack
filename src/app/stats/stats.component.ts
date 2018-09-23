import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {StatsService} from '../services/stats.service';
import {StatsModel} from './stats.model';
import {DeckComponent} from '../deck/deck.component';
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
          this.runningStats.totalValue =  statsModel.totalValue;
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

  get trueCount() {
    let decksLeft = this.runningStats.availableCards / BlackjackConstants.CARDS_IN_DECK;
    if (decksLeft < 0.1) {
      decksLeft = 0.1;
    }
    return this.runningStats.totalValue / decksLeft;
  }

}
