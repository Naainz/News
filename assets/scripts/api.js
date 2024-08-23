const apiKey = 'YOUR_NEWS_DATA_IO_API_KEY';
const resultsContainer = document.getElementById('resultsContainer');
const placeholderImage = 'https://via.placeholder.com/600x400?text=No+Image+Available';
let images = [];

async function fetchNewsImages() {
    try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us&language=en&category=business`);
        const data = await response.json();
        const articles = data.results || [];

        articles.forEach(article => {
            if (article.image_url) {
                images.push({
                    url: article.image_url,
                    title: article.title
                });
            }
        });

        if (images.length === 0) {
            images.push({ url: placeholderImage, title: "No Image Available" });
        }

        populateCarousel();
        updateCarousel();
    } catch (error) {
        console.error('Error fetching images:', error);
        images = [{ url: placeholderImage, title: "No Image Available" }];
        populateCarousel();
        updateCarousel();
    }
}

async function searchNews(query) {
    try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en`);
        const data = await response.json();
        const articles = data.results || [];
        resultsContainer.innerHTML = '';

        articles.forEach(article => {
            const card = document.createElement('div');
            card.classList.add('result-card');

            const imageUrl = article.image_url || placeholderImage;
            const image = document.createElement('img');
            image.src = imageUrl;

            const content = document.createElement('div');
            content.classList.add('content');

            const title = document.createElement('h3');
            title.textContent = article.title;

            const description = document.createElement('p');
            description.textContent = article.description || 'No description available.';

            const link = document.createElement('a');
            link.href = article.link;
            link.textContent = 'Read more';
            link.target = '_blank';

            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(link);

            card.appendChild(image);
            card.appendChild(content);

            resultsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}
