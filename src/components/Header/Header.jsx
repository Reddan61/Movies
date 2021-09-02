import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from "../formsItems/Input/Input.jsx"
import classes from "./Header.module.scss"
import {switchThemeThunk} from "../../Redux/Reducers/ConfigReducer.js"
import { getMoviesBySearch } from '../../Redux/Reducers/MoviesReducer.js'
import brownLogo from "../../images/filmIconBrown.png"
import whiteLogo from "../../images/filmIconWhite.png"
import { changeSearchTextThunk } from '../../Redux/Reducers/HeaderReducer.js'

const Header = () => {
    const {isLightTheme} = useSelector(state => state.Config)
    const {text} = useSelector(state => state.Header)
    const dispatch = useDispatch()

    function changeText(inputText) {
        dispatch(changeSearchTextThunk(inputText))
    }

    function searchMovies(e) {
        if(e.keyCode === 13) {
            dispatch(getMoviesBySearch(text))
        }
    }

    return <header className = {`
            ${classes.header}
            ${!isLightTheme && classes.header_dark}
        `}>
        <div className = {`
            ${classes.header__container}
        `}>
            <div className = {classes.header__left}>
                <img src = {isLightTheme ? brownLogo : whiteLogo}/>
                <div className = {classes.header__input}>
                    <Input setText = {changeText} inputText = {text} onKeyDown = {searchMovies}/>
                </div>
            </div>
            <div className = {classes.header__right}>
                <span className = {`
                    ${classes.header__dark}
                    ${!isLightTheme && classes.header__dark_dark}
                `}>
                    Dark theme:
                </span>
                <div onClick = {() => dispatch(switchThemeThunk())} className = {`
                    ${classes.header__switcher}
                    ${!isLightTheme && classes.header__switcher_dark}
                `}></div>
            </div>
        </div>
    </header>
}


export default Header