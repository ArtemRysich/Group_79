// import { galleryItems } from './gallery-items.js';
// // Change code below this line

// const gallery = document.querySelector('.gallery');

// function createMarkup(arr) {
//     const markup = arr.map(({ description, original, preview }) => `
// <li class="gallery__item">
// <a class="gallery__link" href= "${original}" >
//         <img
//             class="gallery__image"
//             src="${preview}"
//             data-source="${original}"
//             alt="${description}"
//         />
// </a >
// </li > `).join('');
//     return markup
// }

// gallery.insertAdjacentHTML('beforeend', createMarkup(galleryItems))
// gallery.addEventListener('click', handlerClick);

// function handlerClick(evt) {
//     evt.preventDefault();

//     if (evt.target === evt.currentTarget) {
//         return;
//     }

//     const instance = basicLightbox.create(`
// 	<div><img src="${evt.target.dataset.source}" alt="${evt.target.alt}"></div>
// `, {
//         handlerEscape: null,
//         onShow(instance) {
//             this.handlerEscape = handlerEsc.bind(instance)
//             document.addEventListener('keydown', this.handlerEscape)
//         },
//         onClose() {
//             document.removeEventListener('keydown', this.handlerEscape)
//         }
//     });

//     instance.show()
// }

// function handlerEsc(evt) {
//     if (evt.code === 'Escape') {
//         console.log('Escape');
//         this.close()
//     }
// }


// let numb = 10;
// numb = 'str';

// console.log(numb);

// function foo(a, b) {

// }
// foo(2, 3);
// foo('hello', 'world')


// class Hero {
//     constructor(name, age, skill) {
//         this.userName = name;
//         this.age = age;
//         this.skill = skill;
//     }
// }


// const instance = new Hero('Artem', 28, 'JS');

// console.log(instance);

// import sprite from '../img/sprite.svg';
// const markup = `<svg class="icon" width="20" height="20">
//       <use href="${sprite}#icon-like"></use>
//  </svg>`

// class User {
//     constructor(name, age, email) {
//         this.name = name;
//         this.age = age;
//         this.email = email;
//     }
// }


// class Admin {
//     constructor(name, age, email, hours = 0) {
//         this.name = name;
//         this.age = age;
//         this.email = email;
//         this.hours = hours;
//     }
// }



class User {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    changeEmail(newEmail) {
        this.email = newEmail;
    }
}


class Admin extends User {
    constructor(name, age, email, hours = 0) {
        super(name, age, email)
        this.hours = hours;
    }
}

const instance = new Admin('Artem', 28, 'test@gmail.com');

console.log(instance);