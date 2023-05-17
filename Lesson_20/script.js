// https://the-one-api.dev/
// const BASE_URL = "https://the-one-api.dev/v2";
// const ENDPOINT = "/movie";
// const TOKEN = "18aEQHs2_l3sCMmPg1yk";

// const options = {
//     // method: 'GET',
//     headers: {
//         Authorization: `Bearer ${TOKEN}`
//     }
// }


// fetch(`${BASE_URL}${ENDPOINT}`, options)
//     .then(resp => console.log(resp))




// -----------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://developer.themoviedb.org/reference/trending-all
//https://developer.themoviedb.org/reference/collection-images
// const BASE_URL = "https://api.themoviedb.org/3";
// const ENDPOINT = "/trending/movie/week";
// const API_KEY = "345007f9ab440e5b86cef51be6397df1";

// const list = document.querySelector('.js-list');
// const loadMore = document.querySelector('.js-load-more');
// let page = 1;

// console.dir(loadMore);
// loadMore.addEventListener('click', handlerPagination)
// function foo() {

// }
// function handlerPagination() {
//     page += 1;
//     serviceMovie(page)
//         .then(data => {
//             list.insertAdjacentHTML('beforeend', createMarkup(data.results))
//             if (data.total_pages <= data.page) {
//                 loadMore.hidden = true;
//             }
//         })
//         .catch(err => console.log(err))
// }


// function serviceMovie(page = 1) {
//     return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText);
//             }

//             return resp.json()
//         })
// }
// serviceMovie(1)
//     .then(data => {
//         list.insertAdjacentHTML('beforeend', createMarkup(data.results))
//         if (data.total_pages > data.page) {
//             loadMore.hidden = false;
//         }
//     })
//     .catch(err => console.log(err))

// function createMarkup(arr) {
//     return arr.map(({ original_title, poster_path, vote_average }) => `<li>
//     <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//     <h2>${original_title}</h2>
//     <p>${vote_average}</p>
// </li>`).join('')
// }


// Перерва до 21.23



const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT = "/trending/movie/week";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";
const list = document.querySelector('.js-list');
const guard = document.querySelector('.js-guard')
let page = 998;
let options = {
    root: null,
    rootMargin: "400px",
    threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);

function handlerPagination(entries, observer) {
    // console.log(entries);
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page += 1;
            serviceMovie(page)
                .then(data => {
                    list.insertAdjacentHTML('beforeend', createMarkup(data.results));
                    if (data.total_pages <= data.page) {
                        observer.unobserve(guard);
                    }
                })
        }
    })
}

function serviceMovie(page = 1) {
    return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }

            return resp.json()
        })
}
serviceMovie()
    .then(data => {
        list.insertAdjacentHTML('beforeend', createMarkup(data.results))
        if (data.total_pages > data.page) {
            observer.observe(guard);
        }
    })
    .catch(err => console.log(err))

function createMarkup(arr) {
    return arr.map(({ original_title, poster_path, vote_average }) => `<li>
    <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
    <h2>${original_title}</h2>
    <p>${vote_average}</p>
</li>`).join('')
}


// fetch(`https://api.themoviedb.org/3/movie/asdfghj?api_key=${API_KEY}`)
//     .then(resp => {
//         if (resp.ok) {
//             return console.log('OK');
//         }
//         console.log('Not OK');
//     })
//     .catch(() => console.log('Error'))




