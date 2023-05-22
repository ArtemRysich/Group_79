// CRUD
// C - Create -POST
// R - Read - GET
// U - Update - PUT PATCH


// PATCH

// Befaore Update
// const user = {
//     email: 'test@gamil.com',
//     password: 'qwerty111',
//     name: 'Test user'
// }

// const options = {
//     method: 'PATCH',
//     body: JSON.stringify({
//         name: 'New name'
//     })
// }
// fetch('my-site/user/12',options)

// // After Update
// const updateUser = {
//     email: 'test@gamil.com',
//     password: 'qwerty111',
//     name: 'New name'
// }

// PUT
// Befaore Update
// const user = {
//     email: 'test@gamil.com',
//     password: 'qwerty111',
//     name: 'Test user'
// }

// const options = {
//     method: 'PUT',
//     body: JSON.stringify({
//         email: 'test@gamil.com',
//         password: 'qwerty111',
//         name: 'New name'
//     })
// }
// fetch('my-site/user/12',options)

// After Update

// const updateUser = {
//     email: 'test@gamil.com',
//     password: 'qwerty111',
//     name: 'New name'
// }


// fetch('https://jsonplaceholder.typicode.com/posts/1')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         return response.json()
//     })
//     .then(data => console.log(data))




// POST
// const data = {
//     title: 'Create first post',
//     body: 'Learn CRUD',
//     userId: 1
// }

// const options = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//     }
// }

// fetch('https://jsonplaceholder.typicode.com/posts', options)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         return response.json()
//     })
//     .then(data => console.log(data))


// PATCH

// const data = {
//     title: 'New Title',
//     body: 'I love JS'
// }

// const options = {
//     method: 'PATCH',
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//     }
// }
// fetch('https://jsonplaceholder.typicode.com/posts/1', options)
//     .then(response => {
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         return response.json()
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))



// PUT
// const data = {
//     title: 'New Title',
// }

// const options = {
//     method: 'PUT',
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//     }
// }
// fetch('https://jsonplaceholder.typicode.com/posts/1', options)
//     .then(response => {
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }

//         return response.json()
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))



// DELETE
// const options = {
//     method: "DELETE"
// }
// fetch('https://jsonplaceholder.typicode.com/posts/1', options)
//     .then(response => {
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }
//     })
//     .catch(err => console.log(err))


// http://127.0.0.1:3000/api/question     => POST
// http://127.0.0.1:3000/api/getAll       => GET




//---------------------------------------------------//

const add = document.querySelector('.js-add-comment');
const getAll = document.querySelector('.js-get-all-comments');
const formWrapper = document.querySelector('.js-form-container');
const listOfComments = document.querySelector('.js-added-comments');



add.addEventListener('click', handlerCreateForm);
getAll.addEventListener('click', handleGetAllComments);

function handlerCreateForm() {
    formWrapper.innerHTML = `<form action="submit" class="js-form">
    <input type="text" name="name" required>
    <input type="tel" name="phone" required>
    <input type="email" name="email" required>
    <textarea name="comment" cols="30" rows="10"></textarea>
    <button>Add comment</button>
</form>`

    const form = document.querySelector('.js-form');
    form.addEventListener('submit', handlerSubmit)
}

function handlerSubmit(evt) {
    evt.preventDefault();
    console.dir(evt.currentTarget);
    const { name, phone, email, comment } = evt.currentTarget.elements;
    const data = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        comment: comment.value
    }
    serviceAddComment(data)
        .then(respData => listOfComments.insertAdjacentHTML('beforeend', createOneCommentMarkup(respData)))
        .catch(err => alert(err))
        .finally(() => formWrapper.innerHTML = '')

}

function serviceAddComment(data) {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json'
        }
    }

    return fetch('http://127.0.0.1:3000/api/question', options)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
}

function createOneCommentMarkup({ _id, name, phone, email, comment = 'Comment is empty' }) {
    return `<li data-comment-id="${_id}">
    <h2>Name: ${name}</h2>
    <h3>Phone: ${phone}</h3>
    <h3>Email: ${email}</h3>
    <p>${comment}</p>
</li>`
}

function handleGetAllComments() {
    serviceGetAll()
        .then(data => listOfComments.innerHTML = data.map(createOneCommentMarkup).join(''))
        .catch(err => alert(err));
}

function serviceGetAll() {
    return fetch('http://127.0.0.1:3000/api/getAll')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
}

