import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from "react-router"
import StarRatings from "react-star-ratings"
import { getMovieByIdThunk, getMovieCreditsByIdThunk, rateMovieThunk, setFavoriteMovieThunk } from '../../Redux/Reducers/MovieReducer'
import { getImageSrc } from '../../utils/getImageSrc'
import Heart from "../Svg/Heart.jsx"
import classes from "./Movie.module.scss"


const Movie = ({match,history}) => {
    const dispatch = useDispatch()
    const [isLoading,setLoading] = useState(true)
    const { movie } = useSelector(state => state.MoviePage)
    const { isLightTheme } = useSelector(state => state.Config)
    
    function clickBack() {
        history.push("/")
    }

    useEffect(() => {
        (async function() {
            const isError1 = await dispatch(getMovieByIdThunk(match.params.id))
            const isError2 = await dispatch(getMovieCreditsByIdThunk(match.params.id))
            if(isError1 || isError2) {
                history.push("/")
            } else {
                setLoading(false)
            }
        })()
    },[])
    
    const genres = movie?.genres.map(el=>el.name).join("/")
    const casts = movie?.cast?.slice(0,15).map(el => el.name).join(",")

    if(isLoading) {
        return <div>Loading...</div>
    }
    return <div className = {classes.movie}>
        <div className = {classes.movie__container}>
            <div onClick = {clickBack} className = {`
                ${classes.movie__header}
                ${!isLightTheme && classes.movie__header_dark}
            `}>
                <div className = {classes.movie__arrow}></div>
                <span>Back</span>
            </div>
            <div className = {classes.movie__body}>
                <div className = {classes.movie__poster}>
                    <img src = {getImageSrc(movie.poster_path)} width = {"100%"} height = {"100%"}/>
                </div>
                <div className = {`
                    ${classes.movie__info}
                    ${!isLightTheme && classes.movie__info_dark}
                `}>
                    <div className = {classes.movie__title}>
                        <span>{movie.original_title}</span>
                        <div className = {classes.icon__heart}>
                            <Heart width = {"50px"} height = {"50px"} fill = {`${movie.isFavorite ? "#d41741" :"#E0DBDB"}`} style = {{
                                cursor:"pointer"
                            }}
                                onClick = {() => dispatch(setFavoriteMovieThunk(movie.id))}
                            />
                        </div>
                    </div>
                    <div className = {classes.movie__rating}>
                        <span>{movie.userRating}</span>
                        <StarRatings 
                            rating={movie.userRating}
                            starRatedColor={"#FFB800"}
                            starHoverColor={"#FFB800"}
                            changeRating={((e) => {
                                dispatch(rateMovieThunk(movie.id,e))
                            })}
                            numberOfStars={10}
                            starDimension={'20px'}
                            starSpacing={'4px'}
                            name='rating'
                        />
                    </div>
                    <div className = {`${classes.movie__genre} ${classes.movie__about}`}>
                        <div className = {classes.movie__title_sub}>
                            Genre:
                        </div>
                        <div className = {classes.movie__text}>{`${genres}`}</div>
                    </div>
                    <div className = {`${classes.movie__year} ${classes.movie__about}`}>
                        <div className = {classes.movie__title_sub}>
                            Year:
                        </div>
                        <div className = {classes.movie__text}>{movie.release_date.slice(0,4)}</div>
                    </div>
                    <div className = {`${classes.movie__time} ${classes.movie__about}`}>
                        <div className = {classes.movie__title_sub}>
                            Running Time:
                        </div>
                        <div className = {classes.movie__text}>{movie.runtime} minutes</div>
                    </div>
                    <div className = {`${classes.movie__starring} ${classes.movie__about}`}>
                        <div className = {classes.movie__title_sub}>
                            Starring:
                        </div>
                        <div className = {classes.movie__text}>
                            {casts}
                        </div>
                    </div>
                    <div className = {classes.movie__description}>
                        <span>{movie.overview}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default withRouter(Movie)