// Array of quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life is short, and it is up to you to make it sweet.", author: "Sarah Louise Delany" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" }
];

// DOM Elements
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const saveQuoteBtn = document.getElementById('save-quote');
const toggleFavoritesBtn = document.getElementById('toggle-favorites');
const clearFavoritesBtn = document.getElementById('clear-favorites');
const favoritesSidebar = document.querySelector('.favorites-sidebar');
const favoritesList = document.querySelector('.favorites-list');
const closeBtn = document.querySelector('.close-btn');
const moodButtons = document.querySelectorAll('.mood-toggle button');

// Variables
let currentQuote = null;

// Functions
function getRandomQuote() {
    let newQuote;
    do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === currentQuote);
    currentQuote = newQuote;
    return newQuote;
}

function displayQuote() {
    const quoteContainer = document.querySelector('.quote-container');
    quoteContainer.style.opacity = 0;
    setTimeout(() => {
        const quote = getRandomQuote();
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author;
        quoteContainer.style.opacity = 1;
        updateSaveButton();
    }, 500);
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function isFavorite(quote) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.text === quote.text && fav.author === quote.author);
}

function updateSaveButton() {
    const heartIcon = saveQuoteBtn.querySelector('.heart-icon');
    if (isFavorite(currentQuote)) {
        heartIcon.textContent = '♥';
        saveQuoteBtn.classList.add('saved');
    } else {
        heartIcon.textContent = '♡';
        saveQuoteBtn.classList.remove('saved');
    }
}

function saveQuote() {
    let favorites = getFavorites();
    if (isFavorite(currentQuote)) {
        favorites = favorites.filter(fav => fav.text !== currentQuote.text || fav.author !== currentQuote.author);
    } else {
        favorites.push(currentQuote);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateSaveButton();
    if (favoritesSidebar.classList.contains('open')) {
        displayFavorites();
    }
}

function displayFavorites() {
    favoritesList.innerHTML = '';
    const favorites = getFavorites();
    favorites.forEach((fav, index) => {
        const li = document.createElement('li');
        li.textContent = `${fav.text} - ${fav.author}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            displayFavorites();
            updateSaveButton();
        });
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

// Event Listeners
newQuoteBtn.addEventListener('click', displayQuote);
saveQuoteBtn.addEventListener('click', saveQuote);
toggleFavoritesBtn.addEventListener('click', () => {
    favoritesSidebar.classList.toggle('open');
    if (favoritesSidebar.classList.contains('open')) {
        displayFavorites();
    }
});
closeBtn.addEventListener('click', () => {
    favoritesSidebar.classList.remove('open');
});
clearFavoritesBtn.addEventListener('click', () => {
    localStorage.removeItem('favorites');
    displayFavorites();
    updateSaveButton();
});

// Mood Toggle
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        document.body.className = mood;
        localStorage.setItem('mood', mood);
        moodButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Initial Load
const savedMood = localStorage.getItem('mood');
if (savedMood) {
    document.body.className = savedMood;
    const activeButton = document.querySelector(`.mood-toggle button[data-mood="${savedMood}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
} else {
    // Default mood if none is saved
    document.body.className = 'peaceful';
    document.querySelector('.mood-toggle button[data-mood="peaceful"]').classList.add('active');
}
displayQuote();