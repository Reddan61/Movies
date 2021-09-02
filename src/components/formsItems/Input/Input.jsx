import React from 'react'
import classes from "./Input.module.scss"
import searchIcon from "../../../images/Search.png"
import searchIconWhite from "../../../images/SearchWhite.png"
import { useSelector } from 'react-redux'

const Input = ({inputText, setText, ...props}) => {
    const { isLightTheme } = useSelector(state => state.Config)



    return <div className = {`
        ${classes.input}
        ${!isLightTheme && classes.input_dark}
    `}>
        <div className = {classes.input__body}>
            <input className = {`
                ${classes.input__item}
                ${!isLightTheme && classes.input__item_dark}
            `} value = {inputText} onChange = {(e) => setText(e.target.value)} {...props}/>
            <span className = {`
                ${classes.input__placeholder}
                ${!isLightTheme && classes.input__placeholder_dark}
            `}>Search</span>
        </div>
        <div className = {`
            ${classes.input__img}
            ${!isLightTheme && classes.input__img_dark}
        `}>
            <img src = {isLightTheme ? searchIcon : searchIconWhite} />
        </div>
    </div>
}

export default Input