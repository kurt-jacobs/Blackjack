
import {EventEmitter} from '@angular/core';
import {StatsModel} from '../stats/stats.model';

export class StatsService {
  counterStatistics = new EventEmitter<StatsModel>();

  constructor() {

  }

  publishStats(statsModel: StatsModel)
  {
     this.counterStatistics.emit(statsModel);
  }




}
