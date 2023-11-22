const readline = require('readline');

class Field {
  constructor(fieldArray) {
    this.field = fieldArray;
    this.playerRow = 0;
    this.playerCol = 0;
    this.gameOver = false;
  }

  print() {
    for (let row = 0; row < this.field.length; row++) {
      console.log(this.field[row].join(' '));
    }
  }

  move(direction) {
    switch (direction) {
      case 'U':
        this.moveUp();
        break;
      case 'D':
        this.moveDown();
        break;
      case 'L':
        this.moveLeft();
        break;
      case 'R':
        this.moveRight();
        break;
      default:
        console.log('Invalid move. Use U, D, L, R.');
    }

    this.checkGameOver();
  }

  moveUp() {
    if (this.playerRow > 0) {
      this.field[this.playerRow][this.playerCol] = '░';
      this.playerRow--;
      this.field[this.playerRow][this.playerCol] = '*';
    } else {
      console.log('Invalid move. Cannot move up.');
    }
  }

  moveDown() {
    if (this.playerRow < this.field.length - 1) {
      this.field[this.playerRow][this.playerCol] = '░';
      this.playerRow++;
      this.field[this.playerRow][this.playerCol] = '*';
    } else {
      console.log('Invalid move. Cannot move down.');
    }
  }

  moveLeft() {
    if (this.playerCol > 0) {
      this.field[this.playerRow][this.playerCol] = '░';
      this.playerCol--;
      this.field[this.playerRow][this.playerCol] = '*';
    } else {
      console.log('Invalid move. Cannot move left.');
    }
  }

  moveRight() {
    if (this.playerCol < this.field[0].length - 1) {
      this.field[this.playerRow][this.playerCol] = '░';
      this.playerCol++;
      this.field[this.playerRow][this.playerCol] = '*';
    } else {
      console.log('Invalid move. Cannot move right.');
    }
  }

  checkGameOver() {
    const currentCell = this.field[this.playerRow][this.playerCol];

    if (currentCell === 'O') {
      console.log('Game over! You fell into a hole.');
      this.gameOver = true;
    } else if (currentCell === '^') {
      console.log('Congratulations! You found your hat!');
      this.gameOver = true;
    }
  }

  getUserMove() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question('Enter your move (U, D, L, R): ', (answer) => {
        resolve(answer.toUpperCase());
        rl.close();
      });
    });
  }

  async runGame() {
    this.print();

    while (!this.gameOver) {
      const userMove = await this.getUserMove();
      this.move(userMove);
      this.print();
    }
  }
}

// Example usage
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.runGame();
