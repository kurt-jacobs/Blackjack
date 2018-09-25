import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameParticipantComponent} from '../game-participant.component';
import {PlayStatus} from '../../shared/play.status';
import {DisplayableCardComponent} from '../../deck/cards/displayable-card/displayable-card.component';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-dealer',
  templateUrl: '../game-participant.component.html',
  styleUrls: ['../game-participant.component.css', './dealer.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DealerComponent extends GameParticipantComponent implements OnInit {
  maxValueRequiringHit = 17;

  constructor(private cardService: CardService) {
    super();
  }

  handlePlayerStands() {
    if ((this.cards) && (this.cards.length > 0)) {
      const totalScore = this.calculateScore();
      this.requestCardIfUnderThreshold(totalScore);
      this.updateCountTotal();
    }
  }

  handlePlayerBusts() {
    if ((this.cards) && (this.cards.length > 0)) {
      this.calculateScore();
      this.updateCountTotal();
    }
  }

  ngOnInit() {
    this.cardService.dealerDeal
      .subscribe(
        (cards: DisplayableCardComponent[]) => {
          this.cards = cards;
          this.calculateScore();
          this.updateCountTotal();
        }
      );

    this.cardService.dealerStatus
      .subscribe(
        (playStatus: PlayStatus) => {
          if (PlayStatus.player_stands === playStatus) {
            this.handlePlayerStands();
          } else if  (PlayStatus.player_bust === playStatus) {
            this.handlePlayerBusts();
          }
        }
      );
  }

  requestCardIfUnderThreshold(totalScore: number) {
    while (totalScore < this.maxValueRequiringHit) {
      this.cards.push(this.cardService.requestCard());
      totalScore = this.calculateScore();
      this.updateCountTotal();
    }
  }

}
