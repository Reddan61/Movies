import noImage from "../images/noImage.jpg"

export function getImageSrc(url) {
    if(!url) {
        return noImage
    }
    return `https://image.tmdb.org/t/p/w500/${url}`
}