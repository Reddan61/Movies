import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from "react-router"
import classes from "./Cover.module.scss"
import {getImageSrc} from "../../utils/getImageSrc.js"
import HeartIcon from '../Svg/Heart'
import StarIcon from '../Svg/Star'
import { getDetailsThunk, setFavoriteMoviesThunk } from '../../Redux/Reducers/MoviesReducer'

const Cover = ({movie,history}) => {
    const dispatch = useDispatch()
    const {isLightTheme} = useSelector(state => state.Config)
    const [isGettedDetails,setGetDetails] = useState(false)
    const [isHovered,setHovered] = useState(false)
    
    async function getDetails() {
        setHovered(true)
        if(isGettedDetails || isHovered) {
            return
        }

        const isError = await dispatch(getDetailsThunk(movie.id))

        setGetDetails(true)
        setHovered(false)
    }
   
    function clickHandler() {
        history.push(`/movie/${movie.id}`)
    }
    return <div className = {classes.cover}>
        <div className = {classes.cover__main} onClick = {clickHandler} onMouseOver = {getDetails}>
            <div className = {classes.cover__container}>
                <img className = {classes.cover__poster} 
                    src = {getImageSrc(movie.poster_path)}
                    width = {'100%'}
                    height = {'100%'}
                />
                <div className = {classes.cover__details}>
                    {isGettedDetails && <div className = {classes.details__container}>
                        <div className = {classes.icon__heart}>
                            <HeartIcon
                            onClick = {(e) => {
                                e.stopPropagation()
                                dispatch(setFavoriteMoviesThunk(movie.id))
                            }} 
                            fill = {`${movie.isFavorite ? "#d41741" :"#E0DBDB"}`} width = {"60px"} height = {"60px"}/>
                        </div>
                        <div className = {classes.details__body}>
                            <div className = {classes.details__genre}>
                                {movie.genres?.map((el,index) => {
                                    if(index > 2) {
                                        return ""
                                    }
                                    return `${index !== 0 ? "/":""}${el.name}`
                                })}
                            </div>
                            <div className = {classes.details__time}>
                                {`${movie.runtime}`}
                                <span> minutes</span>
                            </div>
                            <div className = {classes.details__more}>
                                <div className = {classes.details__year}>
                                    {movie.release_date.slice(0,4)}
                                </div>
                                <div className = {classes.details__rating}>
                                    <span>{movie.userRating}</span>
                                    <div className = {classes.icon__star}>
                                        <StarIcon width = {"15px"} height = {"15px"} fill = {"#ffb800"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
        <div className = {`
            ${classes.cover__bottom}
            ${!isLightTheme && classes.cover__bottom_dark}
        `}>
            <span onClick = {clickHandler}>{movie.title}</span>
        </div>
    </div>
}


export default withRouter(Cover)