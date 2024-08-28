async function fetchMovies(endpoint) {
    const response = await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/${endpoint}`);
    const data = await response.json();
    return data.results;
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesContainer.appendChild(movieElement);
    });
}

function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    movieElement.appendChild(img);

    const info = document.createElement('div');
    info.classList.add('movie__info');
    movieElement.appendChild(info);

    const title = document.createElement('span');
    title.classList.add('movie__title');
    title.textContent = movie.title;
    info.appendChild(title);

    const rating = document.createElement('span');
    rating.classList.add('movie__rating');
    rating.textContent = movie.vote_average;
    info.appendChild(rating);

    // Botão para abrir o modal (implementaremos a funcionalidade do modal mais tarde)
    const modalButton = document.createElement('button');
    modalButton.classList.add('modal-button');
    modalButton.textContent = 'Ver detalhes';
    modalButton.dataset.movieId = movie.id; // Armazenamos o ID do filme no atributo data-movie-id
    info.appendChild(modalButton);

    return movieElement;
}

async function fetchMovies(endpoint) {
    const response = await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/${endpoint}`);
    const data = await response.json();
    return data.results;
}

function renderMovies(movies) {
    // ... (código para renderizar os filmes, como visto anteriormente)
}

function createMovieElement(movie) {
    // ... (código para criar o elemento de um filme, como visto anteriormente)

    const modalButton = document.createElement('button');
    modalButton.classList.add('modal-button');
    modalButton.textContent = 'Ver detalhes';
    modalButton.dataset.movieId = movie.id;
    info.appendChild(modalButton);

    return movieElement;
}

async function fetchMovieDetails(movieId) {
    const response = await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieId}?language=pt-BR`);
    const data = await response.json();
    return data;
}

function openModal(movieId) {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');

    fetchMovieDetails(movieId)
        .then(data => {
            const modalTitle = document.querySelector('.modal__title');
            modalTitle.textContent = data.title;

            const modalOverview = document.querySelector('.modal__overview');
            modalOverview.textContent = data.overview;

            // Preencher outros elementos do modal com os dados de data
        });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');
}

// Adicionar event listeners para os botões de abrir o modal e para fechar o modal
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-button')) {
        const movieId = event.target.dataset.movieId;
        openModal(movieId);
    } else if (event.target === modal || event.target === closeButton) {
        closeModal();
    }
});

const modal = document.getElementById('modal');
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}