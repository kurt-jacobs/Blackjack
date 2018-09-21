
/**
 * CardConfigModel defines values used in the construction of a card.
 *
 */

export class CardConfigModel  {

  static BLUE = 'Blue';
  static RED = 'Red';
  static GRAY = 'Gray';
  static GREEN = 'Green';
  static YELLOW = 'Yellow';

  static DECK_COLORS: string[] =
    [ CardConfigModel.GREEN,
      CardConfigModel.RED,
      CardConfigModel.YELLOW,
      CardConfigModel.BLUE,
      CardConfigModel.GRAY];
  
  static cardSuits = ['S', 'H', 'D', 'C'];
  static cardNames: { name: string, value: number, countValue: number }[] = [
    { 'name': '2',  'value': 2 , 'countValue': 1 },
    { 'name': '3',  'value': 3 , 'countValue': 1 },
    { 'name': '4',  'value': 4 , 'countValue': 1 },
    { 'name': '5',  'value': 5 , 'countValue': 1 },
    { 'name': '6',  'value': 6 , 'countValue': 1 },
    { 'name': '7',  'value': 7 , 'countValue': 0 },
    { 'name': '8',  'value': 8 , 'countValue': 0 },
    { 'name': '9',  'value': 9 , 'countValue': 0 },
    { 'name': '10', 'value': 10 , 'countValue': -1 },
    { 'name': 'J',  'value': 10, 'countValue': -1 } ,
    { 'name': 'Q',  'value': 10, 'countValue': -1 },
    { 'name': 'K',  'value': 10 , 'countValue': -1 },
    { 'name': 'A',  'value': 1 , 'countValue': -1 }
  ];


  static deckBackings: Map<string, string> =
    new Map([
      [CardConfigModel.GRAY, '../assets/images/Gray_back.jpg'],
      [CardConfigModel.BLUE, '../assets/images/Blue_back.jpg'],
      [CardConfigModel.RED, '../assets/images/Red_back.jpg'],
      [CardConfigModel.GREEN, '../assets/images/Green_back.jpg'],
      [CardConfigModel.YELLOW, '../assets/images/Yellow_back.jpg'],
    ]);

}
