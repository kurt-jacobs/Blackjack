// Based upon the status of the Player, the Dealer will
// either draw 1..N cards (PlayerStatus.player_stands)
// or simple turn over the first card and not draw any more cards (PlayerStatus.player_busts)
export enum PlayStatus {
  player_stands = 1 ,
  player_bust = 2
}
