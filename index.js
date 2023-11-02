const readline = require('readline-sync');
const fs = require('fs');
const svg = require('svg.js');


class LogoGenerator {
  constructor() {
    this.text = '';
    this.textColor = '';
    this.shape = '';
    this.shapeColor = '';
  }

// function for input
  promptForInput(prompt, validator) {
    while (true) {
      const userInput = readline.question(prompt);
      if (validator(userInput)) {
        return userInput;
      } else {
        console.log('Invalid input. Please try again.');
      }
    }
  }

  // used to validate the input text
  isValidText(text) {
    return text.length <= 3;
  }

  // used to validate input color
  isValidColor(color) {
    return true;
  }

  // used to validate shape
  isValidShape(shape) {
    return ['circle', 'triangle', 'square'].includes(shape);
  }
// for shape color
  isValidShapeColor(color) {

    return true;
  }

// used to generate the logo
  generateLogo() {
    this.text = this.promptForInput('Enter up to three characters: ', this.isValidText);
    this.textColor = this.promptForInput('Enter text color (keyword or hexadecimal): ', this.isValidColor);
    this.shape = this.promptForInput('Choose a shape (circle, triangle, square): ', this.isValidShape);
    this.shapeColor = this.promptForInput('Enter shape color (keyword or hexadecimal): ', this.isValidShapeColor);

    const svgFile = 'logo.svg';
    const canvas = svg(document.createElement('div')).size(300, 200);

  //creates the shape based on choices
    if (this.shape === 'circle') {
      canvas.circle(100).move(100, 50).fill(this.shapeColor);
    } else if (this.shape === 'triangle') {
      canvas.polygon('150,50 100,150 200,150').fill(this.shapeColor);
    } else if (this.shape === 'square') {
      canvas.rect(100, 100).move(100, 50).fill(this.shapeColor);
    }

// adds the user text
    canvas.text(this.text).move(100, 100).fill(this.textColor);

    fs.writeFileSync(svgFile, canvas.svg());

    console.log('Generated ' + svgFile);
  }
}


const logoGenerator = new LogoGenerator();
logoGenerator.generateLogo();

