const API_KEY = "77f071aab4f5467787582cdf9f3d4e61";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("Pakistan"));

// Function reload the page
function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${query}&apikey=${API_KEY}`);
        const data = await response.json();
        bindData(data.articles);
        // console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return; 

        const cardClone = newsCardTemplate.content.cloneNode(true);
        
        fillDataInCard(cardClone, article); 
        
        cardsContainer.appendChild(cardClone);
    });
}

// This Function filled the data in card using api apiKey
function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // const date = new Date(article.publishedAt).toLocaleString("en-US", {
    //     timeZone: "Asia/karachi"
    // });
    const date = new Date(article.publishedAt).toLocaleString("en-US");

    newsSource.innerHTML = `${article.source.name} , ${date}`;

    // This one goes to main page of the news if you clicked

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })

}

// Function of Navbar Click news

let curSelectedNav = null;
function onNavItemCick(id) {
    fetchNews(id);

    const navItem = document.getElementById(id);

    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


// Now For search 

const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener('click', () => {
    const query = searchText.value;

    if(!query) return;

    fetchNews(query);

    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})

















