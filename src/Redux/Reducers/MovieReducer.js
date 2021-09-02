import { moviesAPI } from "../../API/API"
import { getListMovieRating, setListMovieRating} from "../../utils/listMovieRating"
import { getListFavoriteMovie, setListFavoriteMovie, setFavorite} from "../../utils/listFavoriteMovie"
import findIndexFun from "../../utils/findIndexFun"

const GETMOVIE = "GETMOVIE"
const GETCREDITS = "GETCREDITS"
const RATEMOVIE = "RATEMOVIE"
const FAVORITEMOVIE = "FAVORITEMOVIE"

const initialState = {
    movie: null
}



const MovieReducer = (state = initialState, action) => {
    switch(action.type) {
        case GETMOVIE: {
            const listRating = getListMovieRating()
            const indexListRating = findIndexFun(listRating,action.payload.movie.id)
            return {...state,movie:{...action.payload.movie, 
                userRating: indexListRating === -1 ? 0 : listRating[indexListRating].userRating,
                isFavorite: findIndexFun(getListFavoriteMovie(),action.payload.movie.id) === -1 ? false : true,
            }}
        }
        case GETCREDITS:
            return {...state, 
                movie: {...state.movie, 
                ...action.payload.credits, 
                userRating: state.movie.userRating,
                isFavorite: state.movie.isFavorite
            }}
        case RATEMOVIE: {
            const list = getListMovieRating()

            const index = findIndexFun(list,action.payload.id)
            
            const newList = index !== -1 ? list.map(el => {
                if(el.id === action.payload.id) {
                    return {...el,userRating:action.payload.rating}
                }
                return el
            }) : [...list,{id:action.payload.id,userRating:action.payload.rating}]

            setListMovieRating(newList)

            return {...state,movie: {...state.movie, userRating: action.payload.rating}}
        }
        case FAVORITEMOVIE: {
            const isFavorite = setFavorite(action.payload.id)

            return {...state, movie: {...state.movie, isFavorite}}
        }
        default:
            return state
    }
}

export default MovieReducer


const movieAC = {
    getMovieByIdAC: (movie) => ({type:GETMOVIE,payload:{movie}}),
    getMovieCreditsByIdAC: (credits) => ({type:GETCREDITS,payload:{credits}}),
    rateMovieAC: (id,rating) => ({type:RATEMOVIE,payload:{id,rating}}),
    favoriteMovieAC: (id) => ({type:FAVORITEMOVIE,payload:{id}}),
}


export const getMovieByIdThunk = (id) => {
    return async dispatch => {
        const {isError,...response} = await moviesAPI.getMovieById(id)
        
        if(!isError) {
            dispatch(movieAC.getMovieByIdAC(response))
        }

        return isError
    }
}

export const getMovieCreditsByIdThunk = id => {
    return async dispatch => {
        const {isError,...response} = await moviesAPI.getMovieCreditsById(id)
        
        if(!isError) {
            dispatch(movieAC.getMovieCreditsByIdAC(response))
        }

        return isError
    }
}


export const rateMovieThunk = (id,rating) => {
    return dispatch => {
        dispatch(movieAC.rateMovieAC(id,rating))
    }
}

export const setFavoriteMovieThunk = (id) => {
    return dispatch => {
        dispatch(movieAC.favoriteMovieAC(id))
    }
}