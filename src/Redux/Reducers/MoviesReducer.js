import {moviesAPI} from "../../API/API.js"
import { getListMovieRating, setListMovieRating} from "../../utils/listMovieRating"
import { getListFavoriteMovie, setListFavoriteMovie, setFavorite} from "../../utils/listFavoriteMovie"
import findIndexFun from "../../utils/findIndexFun.js"

const GETMOVIES = "GETMOVIES"
const SETMOVIEDETAILS = "SETMOVIEDETAILS"
const SETFAVORITEMOVIES = "SETFAVORITEMOVIES"
const SORTBYDATEMOVIES = "SORTBYDATEMOVIES"
const SORTBYNAMEMOVIES = "SORTBYNAMEMOVIES"

function sortByDate(movies,dateSort) {
    if(dateSort == null) {
        return movies
    }
    return movies.sort((a,b) => {
        if(!dateSort) {
          if(new Date(a.release_date) > new Date(b.release_date)) {
              return 1
          }
          return -1
        } else {
            if(new Date(a.release_date) < new Date(b.release_date)) {
                return 1
            }
            return -1
        }
    })
}

function sortByName(movies,nameSort) {
    console.log(nameSort)
    if(nameSort == null) {
        return movies
    }
    return movies.sort((a,b) => {
        if(!nameSort) {
            if(a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            }
            return -1
        } else {

            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1
            }
            return -1
        }
    })
}

function convertMovies(movies, listFavorite,listRate) {
    const moviesCopy = movies.map(el => {
        const listRateIndex = findIndexFun(listRate,el.id)

        return {...el, 
            isFavorite: findIndexFun(listFavorite,el.id) === -1 ? false : true,
            userRating: listRateIndex === -1 ? 0 : listRate[listRateIndex].userRating
        }
    })

    return moviesCopy
}

const initialState = {
    movies:null,
    currentPage:1,
    totalpages:null,
    dateSort:null,
    nameSort:null
}

const MoviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GETMOVIES:{ 
            const listFavoriteMovie = getListFavoriteMovie()
            const listRateMovie = getListMovieRating()

            const moviesConverted = convertMovies(action.payload.movies,listFavoriteMovie,listRateMovie)
            
            const sortedMoviesByDate = sortByDate(moviesConverted,state.dateSort)
            const sortedMoviesByName = sortByName(sortedMoviesByDate,state.nameSort)

            const result = sortedMoviesByName
            return {...state,
                movies:result,
                totalpages:action.payload.totalpages,
                currentPage:action.payload.currentPage
            } 
        }
        case SETMOVIEDETAILS:
            return {...state, movies: state.movies.map(el => {
                if(el.id === action.payload.details.id) {
                    return {...el, ...action.payload.details}
                }
                return el
            })}
        case SETFAVORITEMOVIES: {
            const favoriteObj = {
                id:action.payload.id,
                isFavorite:setFavorite(action.payload.id)
            }
            const moviesCopy = state.movies.map(el => {
                if(el.id === favoriteObj.id) {
                    return {...el,isFavorite:favoriteObj.isFavorite}
                }

                return el
            })

            return {...state, movies: moviesCopy}
        }
        case SORTBYDATEMOVIES: {
            let dateSort = null

            if(state.dateSort === null) {
                dateSort = true
            } else {
                dateSort = !state.dateSort
            }

            const sortedArr = sortByDate(state.movies, dateSort)
           
            
            return {...state, movies: sortedArr, dateSort, nameSort:null}
        }
        case SORTBYNAMEMOVIES: {
            let nameSort = null

            if(state.nameSort === null) {
                nameSort = true
            } else {
                nameSort = !state.nameSort
            }
       
            const sortedArr = sortByName(state.movies,nameSort)

            return {...state, movies: sortedArr, nameSort, dateSort: null}
        }
        default:
            return state
    }
}


export default MoviesReducer


export const moviesAC = {
    setMoviesAC: (movies,totalpages,currentPage) => ({type:GETMOVIES,payload: {movies,totalpages,currentPage}}),
    setMovieDetailsAC: (details) => ({type:SETMOVIEDETAILS,payload: {details}}),
    setFavoriteMoviesAC: (id) => ({type:SETFAVORITEMOVIES,payload: {id}}),
    sortByDateMoviesAC: () => ({type:SORTBYDATEMOVIES,payload: {}}),
    sortByNameMoviesAC: () => ({type:SORTBYNAMEMOVIES,payload: {}}),
}


export const getMoviesThunk = (page) => {
    return async (dispatch) => {
        const response = await moviesAPI.getMovies(page)
        const isError = response.isError
        if(!isError) {
            dispatch(moviesAC.setMoviesAC(response.results,response.total_pages,response.page))
        }
        return isError
    }
}

export const getDetailsThunk = (id) => {
    return async (dispatch) => {
        const response = await moviesAPI.getDetails(id)
        const isError = response.isError
        if(!response.isError) {
            dispatch(moviesAC.setMovieDetailsAC(response))
        }
        return isError
    }
}


export const getMoviesBySearch = (text,page) => {
    return async (dispatch) => {
        const response = await moviesAPI.getMoviesBySearch(text,page)
        const isError = response.isError
        if(!response.isError) {
            dispatch(moviesAC.setMoviesAC(response.results,response.total_pages,response.page))
        }
        return isError
    }
}

export const setFavoriteMoviesThunk = (id) => {
    return dispatch => {
        dispatch(moviesAC.setFavoriteMoviesAC(id))
    }
}


export const sortByDateMoviesThunk = () => {
    return dispatch => {
        dispatch(moviesAC.sortByDateMoviesAC())
    }
}

export const sortByNameMoviesThunk = () => {
    return dispatch => {
        dispatch(moviesAC.sortByNameMoviesAC())
    }
}