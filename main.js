const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray) {
    this.field = fieldArray;
    this.fieldRow = 0;
    this.fieldCol = 0;
    this.gameOver = false;
  }

  print() {
    for (let row = 0; row < this.field.length; row++) {
      console.log(this.field[row].join(' '));
    }
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();
