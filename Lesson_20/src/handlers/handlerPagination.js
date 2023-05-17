import { serviceMovie } from "../service/serviceMovie";
import { createMarkup } from "../templates/cardTemplate";
import { refs } from "../refs/refs";
let page = 1;

function handlerPagination(entries, observer) {
    // console.log(entries);
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            page += 1;
            serviceMovie(page)
                .then(data => {
                    refs.list.insertAdjacentHTML('beforeend', createMarkup(data.results));
                    if (data.total_pages <= data.page) {
                        observer.unobserve(refs.guard);
                    }
                })
        }
    })
}

export { handlerPagination };