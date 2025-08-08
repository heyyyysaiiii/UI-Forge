// Quotes array
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
    { text: "Life is short, and it is up to you to make it sweet.", author: "Sarah Louise Delany" }
];

// Get elements
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const saveBtn = document.querySelector('.save-btn');
const newQuoteBtn = document.querySelector('.new-quote-btn');
const favoritesLists = document.querySelectorAll('.favorites-list');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

// Function to display random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
    updateSaveButtonState();
}

// Function to check if current quote is in favorites
function isQuoteInFavorites() {
    const currentQuote = { text: quoteText.textContent, author: quoteAuthor.textContent };
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.text === currentQuote.text);
}

// Function to update save button state
function updateSaveButtonState() {
    if (isQuoteInFavorites()) {
        saveBtn.classList.add('saved');
        saveBtn.textContent = 'Saved';
    } else {
        saveBtn.classList.remove('saved');
        saveBtn.textContent = 'Save Quote';
    }
}

// Function to add to favorites
function addToFavorites() {
    const currentQuote = { text: quoteText.textContent, author: quoteAuthor.textContent };
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.text === currentQuote.text)) {
        favorites.push(currentQuote);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Quote added to favorites!');
        updateSaveButtonState();
        displayFavorites();
    } else {
        alert('Quote already in favorites!');
    }
}

// Function to display favorites
function displayFavorites() {
    favoritesLists.forEach(list => {
        list.innerHTML = '';
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.forEach((fav, index) => {
            const li = document.createElement('li');
            li.textContent = `${fav.text} - ${fav.author}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                favorites.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                displayFavorites();
                updateSaveButtonState();
            });
            li.appendChild(removeBtn);
            list.appendChild(li);
        });
    });
}

// Event listeners
newQuoteBtn.addEventListener('click', displayRandomQuote);
saveBtn.addEventListener('click', addToFavorites);
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');
        if (btn.dataset.tab === 'favorites') {
            displayFavorites();
        }
    });
});

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarToggle.textContent = sidebar.classList.contains('active') ? 'Close Favorites' : 'Toggle Favorites';
    if (sidebar.classList.contains('active')) {
        displayFavorites();
    }
});

// Initial display
displayRandomQuote();
document.getElementById('quote').classList.add('active');