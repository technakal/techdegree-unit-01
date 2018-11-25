/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1s5grutGuQFwJcQP8bFwEI69Q8FCkGdDk/view?usp=sharing

class Quote {
  constructor(quote, source, category, citation = '', year = '') {
    this.quote = quote;
    this.source = source;
    this.citation = citation;
    this.year = year;
    this.category = category;
    this.used = false;
  }

  // toggles the used status so that quotes only appear again after all other quotes have been displayed.
  toggleUsed() {
    this.used = !this.used;
  }

  // return the quote instance formatted for DOM output.
  formatQuote() {
    return `
    <div class="quote-category">
      <p>${this.category}</p>
    </div>
    <p class="quote">${this.quote}</p>
    <p class="source">${this.source}
      ${this.citation ? `<span class="citation">${this.citation}</span>` : ''}
      ${this.year ? `<span class="year">${this.year}</span>` : ''}
    </p>
  `;
  }
}

const quotes = [
  new Quote(
    'We can all fight against loneliness by engaging in random acts of kindness.',
    'Gail Honeyman',
    'kindness'
  ),
  new Quote(
    'In certain kinds of writing, particularly in art criticism and literary criticism, it is normal to come across long passages which are almost completely lacking in meaning.',
    'George Orwell',
    'writing',
    'Politics and the English Language',
    1946
  ),
];

/***
  Create the `getRandomQuote` function to:
   - generate a random number 
   - use the random number to `return` a random quote object from the 
     `quotes` array.
***/

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

const getRandomQuote = (array, number) => {
  return array[number];
};

const printQuote = array => {
  const randomQuote = getRandomQuote(array);
};
/***
  Create the `printQuote` function to: 
   - call the `getRandomQuote` function and assign it to a variable.
   - use the properties of the quote object stored in the variable to 
     create your HTML string.
   - use conditionals to make sure the optional properties exist before 
     they are added to the HTML string.
   - set the `innerHTML` of the `quote-box` div to the HTML string. 
***/

const quoteBox = document.getElementById('quote-box');
