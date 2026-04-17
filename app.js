let moviesData = [];
let filteredData = [];
let visible = 2;

fetch('http://127.0.0.1:8000/api/movies')
  .then(res => res.json())
  .then(data => {
    moviesData = data;
    filteredData = data;
    renderMovies();
  });

function renderMovies() {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';

  filteredData.slice(0, visible).forEach(movie => {
    const div = document.createElement('div');

    div.innerHTML = `
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <img src="${movie.image_url}" class="movie-img" onerror="this.src='https://via.placeholder.com/300'"/>

          <div class="p-4">
            <h3 class="text-lg font-bold">${movie.title}</h3>
            <p class="text-sm text-gray-500">${movie.year} • ${movie.genre}</p>
            <p class="text-sm mt-2">${movie.synopsis}</p>
            <p class="text-blue-500 font-semibold mt-2">${movie.category.name}</p>
          </div>
        </div>
    `;

    container.appendChild(div);
  });
}

// FILTRO
document.getElementById('filter').addEventListener('change', (e) => {
  const value = e.target.value;

  if (value === 'all') {
    filteredData = moviesData;
  } else {
    filteredData = moviesData.filter(m => m.category.name === value);
  }

  visible = 2; // reset
  renderMovies();
});

// BOTÓN CARGAR MÁS
document.getElementById('loadMore').addEventListener('click', () => {
  visible += 2;
  renderMovies();
});