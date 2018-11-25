/*******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

/**
 * Returns a random number between two specified values.
 * @param {number} min - The lower boundary of possible numbers.
 * @param {number} max - The upper boundary of possible numbers.
 */
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

/**
 * Represents a single quote.
 * @constructor
 * @param {string} quote - The text of the quote.
 * @param {string} source - Attribution for the quote.
 * @param {string} category - Branch of knowledge the quote belongs to.
 * @param {string} citation - Where the quote was originally recorded. Optional.
 * @param {date} year - The year the quote was recorded. Optional.
 */
class Quote {
  constructor(quote, source, category, citation = '', year = '') {
    this.id = getRandomNumber(1, 1000);
    this.quote = quote;
    this.source = source;
    this.citation = citation;
    this.year = year;
    this.category = category.toLowerCase();
    this.used = false;
  }

  /**
   * Controls whether the interface has displayed the quote to the user during this session.
   * Used to prevent quotes from displaying repetitively.
   */
  toggleUsed() {
    this.used = !this.used;
    return this.used;
  }

  /**
   * Formats the quote into a template literal for display on the DOM.
   */
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

/**
 * Represents a color palette.
 * @constructor
 * @param {string} main - The primary color of the palette.
 * @param {string} accent - The secondary color of the palette.
 * @param {string} font - The font color of the palette.
 * @param {string} bold - The brightest, boldest color of the palette. Typical substitute for white.
 */
class ColorTheme {
  constructor(main, accent, font, bold) {
    this.main = main;
    this.accent = accent;
    this.font = font;
    this.bold = bold;
  }

  /**
   * Updates the UI interface to use the color palette.
   */
  updateColorScheme() {
    let root = document.documentElement;
    root.style.setProperty('--color-main', this.main);
    root.style.setProperty('--color-accent', this.accent);
    root.style.setProperty('--color-font', this.font);
    root.style.setProperty('--color-bold', this.bold);
  }
}

const quoteBoxElement = document.getElementById('container-quote');
const quoteButtonElement = document.getElementById('loadQuote');
const categoryContainer = document.getElementById('container-category');
quoteButtonElement.addEventListener('click', event => handleClick(event));

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
    "Newton's laws of physics can rarely be applied to the real world. There is more to life than cause and effect. Things just aren't that simple.",
    'Amy Zhang',
    'science'
  ),
  new Quote(
    'Science is a beautiful gift to humanity; we shoudl not distort it.',
    'A. P. J. Abdul Kalam',
    'science'
  ),
  new Quote(
    'Success is not final; failure is not fatal: It is the courage to continue that counts.',
    'Winston S. Churchill',
    'success'
  ),
  new Quote(
    'Nowadays people know the price of everything and the value of nothing.',
    'Oscar Wilde',
    'value',
    'The Picture of Dorian Grey',
    1890
  ),
  new Quote(
    'Not all those who wander are lost.',
    'J. R. R. Tolkien',
    'adventure',
    'The Lord of the Rings',
    1954
  ),
  new Quote(
    'Success usually comes to those who are too busy to be looking for it.',
    'Henry David Thoreau',
    'success'
  ),
  new Quote(
    'Try not to become a man of success. Rather become a man of value.',
    'Albert Einstein',
    'value'
  ),
  new Quote(
    'I owe my success to having listened respectfully to the very best advice, and then going away and doing the exact opposite.',
    'G. K. Chesterton',
    'success'
  ),
  new Quote(
    'No act of kindness, no matter how small, is ever wasted.',
    'Aesop',
    'kindness'
  ),
  new Quote(
    'By compassion one can be brave. By moderation one can be generous. By not claiming to be first in the world one can rule.',
    'Lao Tsu',
    'spirituality',
    'Tao Te Ching',
    '6th Century BCE'
  ),
  new Quote(
    'This is my simple religion. There is no need for temples; no need for complicated philosophy. Our own brain, our own heart is our temple; the philosophy is kindness.',
    'Dalai Lama',
    'kindness'
  ),
  new Quote(
    'You cannot do a kindness too soon, for you never know how soon it will be too late.',
    'Ralph Waldo Emerson',
    'kindness',
  ),
  new Quote(
    'Every man’s life ends the same way. It is only the details of how he lived and how he died that distinguish one man from another.',
    'Ernhest Hemingway',
    'adventure',
  ),
  new Quote(
    'Being against evil doesn\'t make you good. Tonight I was against it and then I was evil myself. I could feel it coming just like a tide... I just want to destroy them. But when you start taking pleasure in it you are awfully close to the thing you\'re fighting.',
    'Ernest Hemingway',
    'good and evil',
    'Island in the Stream',
    1970
  ),
  new Quote(
    'Everything I do I rush through so I can do something else.',
    'Stephen Dobyns',
    'humanity',
    'Cemetery Nights',
    1997
  ),
  new Quote(
    'The road to hell is paved with adverbs.',
    'Steven King',
    'writing'
  )
];

/**
 * Theme array, used for randomly selecting a new color palette for the UI.
 */
const backgroundThemes = [
  new ColorTheme('#FFF4B2', '#EA6B59', '#31384B', '#FDF1EF'),
  new ColorTheme('#EA6B59', '#04B28A', '#FDF1EF', '#31384B'),
  new ColorTheme('#04B28A', '#EA6B59', '#FFF4B2', '#FFF4B2'),
  new ColorTheme('#31384B', '#EA6B59', '#FDF1EF', '#FFF4B2'),
];

/**
 * Retrieves all categories from the passed array.
 * @param {array} arr - The quotes array. Must have category property on each item.
 */
const getCategories = arr => {
  return arr.map(elem => elem.category).sort((a, b) => a > b);
};

/**
 * Ensures each category in the categories array only appears once.
 * @param {array} arr - The array of categories to be reduced.
 * credit to @ChrisFerdinandi for the assist on this.(https:/**gomakethings.com/removing-duplicates-from-an-array-with-vanilla-javascript/).
 */
const getUniqueCategories = arr => {
  return arr.filter((item, index) => arr.indexOf(item) >= index);
};

/**
 * Formats each category in the categories array into a button, then appends to the DOM.
 * @param {array} categories - The array of categories to be appended to the UI.
 */
const displayCategories = categories => {
  let categoryButtonElements = categories.map(
    category => `
      <button id="${category}" class="button-category">${category}</button>
    `
  );
  categoryButtonElements.push(
    `<button id="clear" class="button-category">×</button>`
  );
  categoryContainer.innerHTML = categoryButtonElements.join('');
  return document.querySelectorAll('.button-category');
};

let categoryButtons = displayCategories(
  getUniqueCategories(getCategories(quotes))
);

categoryButtons.forEach(button =>
  button.addEventListener('click', event => handleClick(event))
);

/**
 * Updates the selectedCategory element to match the user selected category.
 * @param {string} category
 */
const setCategory = category => {
  if (selectedCategory) {
    let currentCategory = document.getElementById(selectedCategory);
    currentCategory.classList.remove('active');
  }
  if (category.id === 'clear') {
    clearCategory();
    return;
  }
  selectedCategory = category.id;
  category.classList.add('active');
};

/**
 * Clears the selectedCategory so that all quotes are available for display.
 */
const clearCategory = () => (selectedCategory = undefined);

/**
 * Returns one quote from the quotes array. Also flags the quote as "used".
 * @param {array} arr - The quotes array.
 * @param {number} index - The index of the element to be returned.
 */
const getRandomQuote = (arr, index) => {
  arr[index].toggleUsed();
  return arr[index];
};

/**
 * Filters out used quotes so that only new ones will display.
 * If no new quotes are available, recycles the quotes.
 * @param {array} arr - The quotes array.
 */
const filterUsed = arr => {
  let filteredQuotes = arr.filter(elem => elem.used === false);
  if (filteredQuotes.length === 0) {
    resetQuotes(arr);
    return arr;
  }
  return filteredQuotes;
};

/**
 * Returns only quotes belonging to the category indicated by the user.
 * @param {array} arr - The quotes array.
 * @param {string} category - The user-selected category to filter upon.
 */
const filterByCategory = (arr, category) => {
  if (category) {
    return arr.filter(elem => elem.category === category);
  }
  return arr;
};

/**
 * Allows quotes to be reused because all quotes have already been used.
 * @param {array} arr - The quotes array.
 */
const resetQuotes = arr => {
  arr.forEach(quote => (quote.used = false));
  return true;
};

/**
 * Retrieves one random quote from the passed array. Formats the quote into a template literal and outputs to the DOM.
 * @param {array} arr - The quotes array.
 */
const printQuote = arr => {
  const randomQuote = getRandomQuote(arr, getRandomNumber(0, arr.length));
  let quoteString = randomQuote.formatQuote();
  quoteBoxElement.innerHTML = quoteString;
};

/**
 * Selects the color palette at the passed index and triggers the updateColorScheme() method on that element.
 * @param {number} index - The index position.
 */
const changeColorScheme = index => {
  backgroundThemes[index].updateColorScheme();
  return;
};

/**
 * Handles button clicks.
 * If the event was on the loadQuote button, print a new quote to the DOM.
 * If the event was on one of the category buttons, set the selectedCategory.
 * @param {event} event - The triggering event.
 */
const handleClick = event => {
  if (event.target.id === 'loadQuote') {
    printQuote(filterUsed(filterByCategory(quotes, selectedCategory)));
    changeColorScheme(getRandomNumber(0, backgroundThemes.length));
    return;
  }
  setCategory(event.target);
  return;
};
