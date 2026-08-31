let currentPage = 1;
const limit = 10; // Quants ítems per pàgina vols mostrar

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const apiSelector = document.getElementById("api-selector");
const searchInput = document.getElementById("search-input");
const fetchButton = document.getElementById("fetch-btn");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error-message");
const resultsContainer = document.getElementById("results");
const paginationContainer = document.getElementById("pagination")

fetchButton.addEventListener('click', () => {
    fetchData()
});

function showLoading() {
   loadingElement.classList.remove("hidden"); 
}

function hideLoading() {
    loadingElement.classList.add("hidden");
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
}

function hideError() {
    errorElement.classList.add("hidden");
}

async function fetchData() {
    const searchTerm = searchInput.value;
    const useAxios = apiSelector.value === 'axios';
    
    showLoading();
    hideError();
    resultsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    try {
        let result;
        if (useAxios) {
            result = await fetchDataWithAxios(searchTerm);
        } else {
            result = await fetchDataWithFetch(searchTerm);
        }
        displayResults(result.data, result.totalCount);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function displayResults(items, totalItems) {
    resultsContainer.classList.remove("hidden");
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
        resultsContainer.appendChild(card);
    });
    setupPagination(totalItems);
}

function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / limit);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.disabled = i === currentPage;
        button.addEventListener("click", () => {
            currentPage = i;
            fetchData();
        });
        paginationContainer.appendChild(button);
    }
}

async function fetchDataWithFetch(searchTerm) {
    const url = new URL(API_URL);
    url.searchParams.set('_page', currentPage);
    url.searchParams.set('_limit', limit);
    if (searchTerm){
        url.searchParams.set('q', searchTerm)
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const totalCount = response.headers.get('X-Total-Count');

    const data = await response.json();

    return {
        data,
        totalCount: Number(totalCount)
    };
}
                             
async function fetchDataWithAxios(searchTerm) {
    const response = await axios.get(API_URL, {
        params: {
            _page: currentPage,
            _limit: limit,
            q: searchTerm
        }
        
    });

    return {
        data: response.data,
        totalCount: Number(response.headers['x-total-count'])
    };
}