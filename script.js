
const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";


function reload() {
    window.location.reload()
}

window.addEventListener('load', () => {
    fetchNews("Pakistan")
});

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    console.log(data);
    
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    // set to empty beacuse when API once is called and called again so previous content will disapeard and only new will show if we do not empty this the second api call content will apend which we do not want.
    cardContainer.innerHTML = '';
    
    articles.forEach(article => {
        if (!article.urlToImage) {
            return;
        }
        const cardClone = newsCardTemplate.content.cloneNode(true); //cloning the news-car-template class
        fillDataInCard(cardClone, article)
        cardContainer.appendChild(cardClone); // appending the card clone with api data
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} - ${date}`
    
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}

let curSelectedNav = []

function onNavItemClick(id){
    fetchNews(id);  
    // Get all elements with the specified id
    const navItem = document.querySelectorAll(`#${id}`);
    // Remove 'active' class from previously selected items
    curSelectedNav.forEach((navItem) => {
            navItem?.classList.remove('active'); // if the curSelectedNav is not null then remove active class
        })

    // Update curSelectedNav with the currently selected items
    curSelectedNav = []
    navItem.forEach((item) => {
        curSelectedNav.push(item);
        item.classList.add('active');    
    });
}


const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', () => {
    const searchText = document.getElementById('search-text').value;

    if (!searchText) {
        return;
    }
    fetchNews(searchText);
    curSelectedNav.forEach((navItem) => {
        navItem?.classList.remove('active'); // if the curSelectedNav is not null then remove active class
    })
    curSelectedNav = []
})
