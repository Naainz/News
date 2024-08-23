const carousel = document.getElementById('carousel');
let currentIndex = 0;
const visibleItems = 5;
const transitionDuration = 300;

function populateCarousel() {
    carousel.innerHTML = '';  
    images.forEach(image => {
        const item = document.createElement('li');
        item.classList.add('carousel-item');
        
        const imgElement = document.createElement('img');
        imgElement.src = image.url;

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = image.title;

        item.appendChild(imgElement);
        item.appendChild(titleElement);
        carousel.appendChild(item);
    });
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach(item => {
        item.classList.remove('middle');
        item.style.opacity = '1';
        item.style.transform = 'scale(0.8)';
        item.style.display = 'none';
        item.style.zIndex = '1';
    });

    let middleIndex = Math.floor(visibleItems / 2);
    for (let i = 0; i < visibleItems; i++) {
        const itemIndex = (currentIndex + i) % items.length;
        const item = items[itemIndex];
        item.style.display = 'flex';
        if (i === middleIndex) {
            item.classList.add('middle');
        }
    }
}

function transitionCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const middleIndex = Math.floor(visibleItems / 2);

    items.forEach(item => {
        item.style.transition = `transform ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out, z-index ${transitionDuration}ms ease-in-out`;
    });

    items[(currentIndex + middleIndex) % items.length].classList.remove('middle');
    currentIndex = (currentIndex + direction + images.length) % images.length;
    items[(currentIndex + middleIndex) % items.length].classList.add('middle');

    updateCarousel();
}

document.getElementById('prevBtn').addEventListener('click', () => {
    transitionCarousel(-1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    transitionCarousel(1);
});

document.getElementById('searchInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            searchNews(query);
        }
    }
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        searchNews(query);
    }
});

fetchNewsImages();
