const API_URL = "http://127.0.0.1:8000/api/movies";

let movies = [];
let visibleCount = 6;

async function fetchMovies() {
    const res = await fetch(API_URL);
    movies = await res.json();

    renderMovies();
    loadCategories();
}

function renderMovies(filter = "") {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    let filtered = movies;

    if (filter) {
        filtered = movies.filter(m => m.category?.name === filter);
    }

    filtered.slice(0, visibleCount).forEach(movie => {
        const card = `
            <div class="card">
                <img src="${movie.image_url}" alt="${movie.title}">
                <div class="card-content">
                    <h2>${movie.title}</h2>
                    <p>${movie.year} • ${movie.category?.name || 'Sin categoría'}</p>
                    <p class="desc">${movie.synopsis || 'Sin descripción'}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

function loadCategories() {
    const select = document.getElementById("categoryFilter");

    const categories = [...new Set(movies.map(m => m.category?.name).filter(Boolean))];

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        visibleCount = 6;
        renderMovies(select.value);
    });
}

document.getElementById("loadMoreBtn").addEventListener("click", () => {
    visibleCount += 6;
    renderMovies(document.getElementById("categoryFilter").value);
});

fetchMovies();