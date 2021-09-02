import {combineReducers, applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import ConfigReducer from "./Reducers/ConfigReducer.js"
import HeaderReducer from "./Reducers/HeaderReducer.js";
import MovieReducer from "./Reducers/MovieReducer.js";
import MoviesReducer from "./Reducers/MoviesReducer.js"


let reducers = combineReducers({
    Config:ConfigReducer,
    MoviesPage:MoviesReducer,
    Header: HeaderReducer,
    MoviePage: MovieReducer
});


const store = createStore(reducers,applyMiddleware(thunk));

window.store = store;



export default store;