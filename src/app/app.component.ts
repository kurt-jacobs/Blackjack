import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerComponent} from './game-participant/player/player.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(PlayerComponent) player: PlayerComponent;
  dealerTitle = 'Dealer';
  playerTitle = 'Player';


  constructor( ) {

  }
  ngOnInit() {

  }

  requestHitDisabled() {
    return !this.player.requestHitEnabled;
  }

  requestStandDisabled() {
    return !this.player.requestStandEnabled;
  }

  requestStand() {
    this.player.requestStand();
  }

  requestHit()  {
    this.player.requestHit();
  }


}
