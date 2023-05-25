// 827a813fed674cf3ad0135419231605



// function serviceCountries() {
//     return fetch('https://restcountries.com/v3.1/name/Ukraine')
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             }
//             return resp.json()
//         })
//        .then(data => console.log(data))
// }
console.log('start');

// async function serviceCountries() {
//     const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');

//     if (!response.ok) {
//         throw new Error(response.statusText)
//     }

//     const data = await response.json();
//     console.log(data);
// }

// serviceCountries()
// console.log('end');


// const serviceCountries = async function () {
//     const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');

//     if (!response.ok) {
//         throw new Error(response.statusText)
//     }

//     const data = await response.json();
//     console.log(data);
// }
// serviceCountries ()


// const serviceCountries = async () => {
//     const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');

//     if (!response.ok) {
//         throw new Error(response.statusText)
//     }

//     const data = await response.json();
//     console.log(data);
// }
// serviceCountries()


// const user = {
//     name: 'Test user',
//     country: 'Ukraine',
//     async serviceCountries() {
//         const response = await fetch(`https://restcountries.com/v3.1/name/${this.country}`);

//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         const data = await response.json();
//         console.log(data);
//     }
// }

// user.serviceCountries()


// async function testFn() {
//     console.log('start');
//     const result = await Promise.resolve('Promise')
//     console.log(result);
//     console.log('end');
// }

// testFn()


// function testFn() {
//     // console.log('start');
//     // const result =  Promise.resolve('Promise')
//     // console.log(result);
//     // console.log('end');

//     console.log('start');
//     Promise.resolve('Promise').then(data => console.log(data))

//     console.log('end');
// }

// testFn()






// async function serviceCountries() {
//     try {
//         const response = await fetch('https://restcountries.com/v3.1/name/sadfghjklhgfd');

//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         const data = await response.json();
//         console.log(data);
//     } catch (e) {
//         console.log(e);
//     }

// }
// serviceCountries()



// async function serviceCountries() {

//     const response = await fetch('https://restcountries.com/v3.1/name/dasfgjhkk');

//     if (!response.ok) {
//         throw new Error(response.statusText)
//     }

//     const data = await response.json();

//     return data;

// }
// serviceCountries()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))



// async function serviceCountries() {
//     try {
//         const response = await fetch('https://restcountries.com/v3.1/name/asdfgjhk');

//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         const data = await response.json();
//         return data;
//     } catch (e) {
//         console.log(e);
//     }

// }
// serviceCountries()
//     .then(data => data.map())
//     .catch(err => console.log(err))



// async function serviceCountries() {
// const response1 = await fetch('https://restcountries.com/v3.1/name/Ukraine');
// const response2 = await fetch('https://restcountries.com/v3.1/name/Poland');
// const response3 = await fetch('https://restcountries.com/v3.1/name/Germany');
// if (!response1.ok) {
//     throw new Error(response.statusText)
// }

// const data1 = await response1.json();
// const data2 = await response2.json();
// const data3 = await response3.json();
// console.log(data1);
// console.log(data2);
// console.log(data3);
// return data;

// }
// serviceCountries()
// .then(data => console.log(data))
// .catch(err => console.log(err))



// async function serviceCountries() {
//     try {
//         const countries = ['Ukraine', 'Poland', 'Germany', 'jkvhsjkdghsduk'];
//         const responses = countries.map(async country => {
//             const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//             if (!response.ok) {
//                 throw new Error(response.statusText)
//             }
//             return response.json()
//         })
//         console.log(responses);
//         // const data = await Promise.all(responses);
//         // const data = await Promise.race(responses);
//         const data = await Promise.allSettled(responses)
//         console.log('data', data);
//         // const full = data.filter(({ status }) => status === 'fulfilled').map(({ value }) => value[0])
//         // console.log('full', full);
//     } catch (err) {
//         console.log(err);
//     }
// }
// serviceCountries()


//-------------------------------------------------------------//

const refs = {
    form: document.querySelector('.js-search-form'),
    addField: document.querySelector('.js-add-field'),
    list: document.querySelector('.js-list'),
    wrapper: document.querySelector('.js-input-wrapper')
}

const markupInput = '<input type="text" name="country">';

refs.form.addEventListener('submit', handlerSearchForm);
refs.addField.addEventListener('click', handlerAddField);

function handlerAddField() {
    refs.wrapper.insertAdjacentHTML("beforeend", markupInput);
}

async function handlerSearchForm(evt) {
    try {
        evt.preventDefault();

        const data = new FormData(evt.currentTarget);
        const formatted = data.getAll('country').map(item => item.trim());
        const countries = await serviceContry(formatted);
        const capitals = countries.map(({ capital }) => capital[0])
        const weather = await serviceWeather(capitals)

        refs.list.innerHTML = createMarkup(weather)


        evt.currentTarget.reset();
    } catch (e) {
        console.log(e);
    }
}


async function serviceContry(arr) {
    const responses = arr.map(async country => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json()
    })

    const data = await Promise.allSettled(responses);
    const formattedData = data
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value[0])

    return formattedData;
}


// http://api.weatherapi.com/v1/current.json


async function serviceWeather(arr) {
    const responses = arr.map(async (capital) => {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=827a813fed674cf3ad0135419231605&q=${capital}&lang=uk`)

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    })

    const data = await Promise.allSettled(responses);
    const formatted = data.filter(({ status }) => status === 'fulfilled').map(({ value }) => value)

    return formatted
}

function createMarkup(arr) {
    return arr.map(({
        location: { name, country },
        current: { temp_c, condition: { icon, text } }
    }) => `<li>
    <img src="${icon}" alt="${text}">
    <h3>${text}</h3>
    <h2>${country} ${name}</h2>
    <h3>${temp_c} ℃</h3>
    </li>`).join('')
}