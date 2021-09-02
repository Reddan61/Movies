import findIndexFun from "./findIndexFun"

export function getListFavoriteMovie() {
    const list = JSON.parse(localStorage.getItem("favoriteListMovie")) || []

    return list
}


export function setListFavoriteMovie(list) {
    localStorage.setItem("favoriteListMovie",JSON.stringify(list))
}


export function setFavorite(movieId) {
    const list = getListFavoriteMovie()

    const index = findIndexFun(list, movieId)

    const newList = index !== -1 ? list.filter(el => {
        if(el.id === movieId) {
            return false
        }
        return true
    }) : [...list,{id:movieId,isFavorite:true}]
    
    setListFavoriteMovie(newList)

    return index === -1 ? true : false
}