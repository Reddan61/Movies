import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from "./Movies.module.scss"
import Cover from "../Cover/Cover.jsx"
import {getMoviesBySearch, getMoviesThunk, sortByDateMoviesThunk, sortByNameMoviesThunk} from "../../Redux/Reducers/MoviesReducer.js"
import Pagination from "../Pagination/Pagination"

const Movies = () => {
    const dispatch = useDispatch()
    const {isLightTheme} = useSelector(state => state.Config)

    const [isLoading, setLoading] = useState(true)
    const { movies, totalpages, currentPage } = useSelector(state => state.MoviesPage)
    const { text } = useSelector(state => state.Header)

    async function getMoviesPagination(page) {
        setLoading(true)
        if(!text[0]) {
            await dispatch(getMoviesThunk(page))
        } else {
            await dispatch(getMoviesBySearch(text,page))
        }
        setLoading(false)
    }
    
    useEffect(() => {
        (async function() {
            const isError = await dispatch(getMoviesThunk(1))
            if(isError) {
                return
            }
            
            setLoading(false)
        })()
    },[])

    return <main className = {`
        ${classes.movies} ${!isLightTheme && classes.movies_dark}
    `}>
        <div className = {classes.movies__container}>
            <div className = {classes.movies__header}>
                <div className = {`
                    ${classes.movies__left}
                    ${!isLightTheme && classes.movies__left_dark}
                `}>
                    <span>Movies</span>
                </div>
                <div className = {`
                    ${classes.movies__right}
                    ${!isLightTheme && classes.movies__right_dark}
                `}>
                    <span onClick = {() => {dispatch(sortByNameMoviesThunk())}}>Name</span>
                    <span onClick = {() => {dispatch(sortByDateMoviesThunk())}}>Date</span>
                </div>
            </div>
            <div className = {classes.movies__items}>
                {!isLoading && movies.map(el => {
                    return <Cover key = {el.id} movie = {el}/>
                })}
            </div>
            <div className = {classes.movies__pagination}>
                <Pagination totalpages = {totalpages} currentPage = {currentPage} clickHandler = {getMoviesPagination}/>
            </div>
        </div>
    </main>
}

export default Movies