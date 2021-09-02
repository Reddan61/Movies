export function getListMovieRating() {
    const list = JSON.parse(localStorage.getItem("rateListMovie")) || []
    return list
}

export function setListMovieRating(list) {
    localStorage.setItem("rateListMovie", JSON.stringify(list))
}