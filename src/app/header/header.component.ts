import { Component, OnInit } from '@angular/core';
import {CardService} from '../services/card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private cardService: CardService) { }

  ngOnInit() {
  }

  /**
   * dealCards proxies to the CardService to deal cards to
   * the game participants.
   */
  dealCards() {
    this.cardService.dealCards();
  }

}
