/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1s5grutGuQFwJcQP8bFwEI69Q8FCkGdDk/view?usp=sharing

// returns a random number between the specified min and max values.
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

// instantiates quotes using a consistent template with built-in methods
class Quote {
  constructor(quote, source, category, citation = '', year = '') {
    this.id = getRandomNumber(1, 1000);
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
    return this.used;
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

class BackgroundTheme {
  constructor(main, accent, font, bold) {
    this.main = main;
    this.accent = accent;
    this.font = font;
    this.bold = bold;
  }

  updateColorScheme() {
    let root = document.documentElement;
    root.style.setProperty('--color-main', this.main);
    root.style.setProperty('--color-accent', this.accent);
    root.style.setProperty('--color-font', this.font);
    root.style.setProperty('--color-bold', this.bold);
  }
}

// DOM elements
const quoteBoxElement = document.getElementById('quote-box');
const quoteButtonElement = document.getElementById('loadQuote');
quoteButtonElement.addEventListener('click', event => handleClick(event));

// global variables
let selectedCategory;
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
  new Quote(
    'Newton\'s laws of physics can rarely be applied to the real world. There is more to life than cause and effect. Things just aren\'t that simple.',
    'Amy Zhang',
    'science',
  )
];

// theme arr for cycling through background colors as new quotes are displayed.
const backgroundThemes = [
  new BackgroundTheme('#FFF4B2', '#EA6B59', '#31384B', '#FDF1EF'),
  new BackgroundTheme('#EA6B59', '#04B28A', '#FDF1EF', '#31384B'),
  new BackgroundTheme('#04B28A', '#EA6B59', '#FFF4B2', '#FFF4B2'),
  new BackgroundTheme('#31384B', '#EA6B59', '#FDF1EF', '#FFF4B2')
]

// TODO: create getCategories, to filter the quotes arr down to one instance of each represented category.

// TODO: create displayCategories to output the getCategories to the DOM. Return document.getElementsByClassName('button-category')

// TODO: create setCategory method

// returns the arr item at the number index.
const getRandomQuote = (arr, number) => {
  arr[number].toggleUsed();
  return arr[number];
};

// filters the passed arr and return only the elements that haven't been flagged as used.
const filterUsed = arr => arr.filter(elem => elem.used === false);

// filters the passed arr and returns only the elements using the same category property.
const filterByCategory = (arr, category) => {
  return arr.filter(elem => elem.category === category);
} 

// resets the used property for all quotes to false so that they can be reused by the printQuote method.
const resetQuotes = (arr) => {
  arr.forEach(quote => quote.used = false);
  return true;
}

/***
  Create the `printQuote` function to: 
   - call the `getRandomQuote` function and assign it to a variable.
   - use the properties of the quote object stored in the variable to 
     create your HTML string.
   - use conditionals to make sure the optional properties exist before 
     they are added to the HTML string.
   - set the `innerHTML` of the `quote-box` div to the HTML string. 
***/

const printQuote = arr => {
  const randomQuote = getRandomQuote(arr, getRandomNumber(0, arr.length));
  let quoteString = randomQuote.formatQuote();
  quoteBoxElement.innerHTML = quoteString;
};

// randomly sets the color scheme of the site.
const changeColorScheme = number => {
  backgroundThemes[number].updateColorScheme();
  return;
};

// TODO: create onPageLoad method.

// controls the click of DOM buttons. If the button is loadQuote, the process preps and displays the next quote. If the button is a category button, t he procecss sets the selectedCategory to match the clicked button.
const handleClick = event => {
  if(event.target.id === 'loadQuote') {
    let filteredQuotes = filterUsed(quotes);
    
    // if there are no quotes in the filteredQuotes array, reset the array to allow reuse of quotes.
    if(filteredQuotes.length === 0) {
      resetQuotes(quotes);
      filteredQuotes = quotes;
    }
    
    if(selectedCategory) {
      filteredQuotes = filterByCategory(selectedCategory);
    }

    printQuote(filteredQuotes);
    changeColorScheme(getRandomNumber(0, backgroundThemes.length));
    return;
  }
  // set the selected category to match the clicked button
  selectedCategory = event.target.id;
  return;
}