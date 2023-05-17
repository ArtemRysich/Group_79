import { serviceMovie } from "./service/serviceMovie";
import { handlerPagination } from "./handlers/handlerPagination";
import { createMarkup } from "./templates/cardTemplate";
import { refs } from "./refs/refs";

let options = {
    root: null,
    rootMargin: "400px",
    threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);

serviceMovie()
    .then(data => {
        refs.list.insertAdjacentHTML('beforeend', createMarkup(data.results))
        if (data.total_pages > data.page) {
            observer.observe(refs.guard);
        }
    })
    .catch(err => console.log(err))
