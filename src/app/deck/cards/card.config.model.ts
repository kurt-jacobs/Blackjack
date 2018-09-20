
export class CardConfigModel  {

  static BLUE = 'Blue';
  static RED = 'Red';
  static GRAY = 'Gray';
  static GREEN = 'Green';
  static YELLOW = 'Yellow';


  cardSuits = ['S', 'H', 'D', 'C'];
  cardNames: { name: string, value: number, countValue: number }[] = [
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


  deckBackings = [];

  constructor() {
    this.deckBackings[CardConfigModel.GRAY] = '../assets/images/Gray_back.jpg';
    this.deckBackings[CardConfigModel.BLUE] = '../assets/images/Blue_back.jpg';
    this.deckBackings[CardConfigModel.RED] = '../assets/images/Red_back.jpg';
    this.deckBackings[CardConfigModel.GREEN] = '../assets/images/Green_back.jpg';
    this.deckBackings[CardConfigModel.YELLOW] = '../assets/images/Yellow_back.jpg';
  }


  getBacking(key: string) {
    return this.deckBackings[key];
}


}
