function createMarkup(arr) {
    return arr.map(({ original_title, poster_path, vote_average }) => `<li>
    <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
    <h2>${original_title}</h2>
    <p>${vote_average}</p>
</li>`).join('')
}
export { createMarkup }