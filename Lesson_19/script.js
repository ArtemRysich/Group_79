// https://uk.wikipedia.org/wiki/SOAP
// https://itstatti.in.ua/stvorennya-sajtiv/77-shcho-take-proksi-server-i-navishcho-vin-potriben.html
// https://www.postman.com/downloads/
// https://www.weatherapi.com/docs/
// https://handlebarsjs.com/guide/
//

// JS DOCcomment /** + emmit



// fetch('https://rickandmortyapi.com/api/character')
//     .then(resp => {
//         console.log(resp);
//         if (!resp.ok) {
//             throw new Error('Примусово прокидаємо значення в catch');
//         }

//         return resp.json();
//     })
//     .then(data => console.log(data))
//     .catch(err => console.error(err))
//     .finally(() => console.log('finally'))



// 6410346f89264d6e919165208231505




// ПЕРЕРВА ДО 20:43


const searchForm = document.querySelector('.js-search-form');
const list = document.querySelector('.js-list');

searchForm.addEventListener('submit', handlerSearch);

/**
 * Handler search weather form
 * @param {*} evt
 */
function handlerSearch(evt) {
    evt.preventDefault();

    const { city, days } = evt.currentTarget.elements;
    console.dir(city);
    serviceWeather(city.value, days.value)
        .then(data => {
            console.log('Work in then case');
            list.innerHTML = createMarkup(data.forecast.forecastday)
        })
        .catch(err => console.error(err))
        .finally(() => searchForm.reset())
}

/**
 * Service weather API
 * @param {String} city
 * @param {Number} days
 * @returns {Promise} response data
 */
function serviceWeather(city = '', days = 1) {
    const BASE_URL = 'http://api.weatherapi.com/v1';
    const API_KEY = '6410346f89264d6e919165208231505';

    // return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`).then(resp => console.log(resp))

    const params = new URLSearchParams({
        key: API_KEY,
        q: city,
        days: days,
        lang: 'uk'
    })
    // console.log(params.toString());
    return fetch(`${BASE_URL}/forecast.json?${params}`)
        .then(resp => {
            console.log(resp);
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }

            return resp.json()
        })
}

/**
 * Create forecast card
 * @param {Array} arr
 * @returns {String} HTML markup
 */
function createMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { text, icon } } }) => `<li>
    <img src="${icon}" alt="${text}">
    <h2>${date}</h2>
    <h3>${text}</h3>
    <h3>${avgtemp_c}</h3>
</li>`).join('');
}
// serviceWeather('sdfgjhkl;', 5)
//     .then(data => console.log(data))
//     .catch(err => console.error(err))


// server.get(function users(req, res) {
//     const { _sort } = req;
//     if (_sort === "name") {
//         arr.sort()
//     }
// })

