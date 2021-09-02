import React, {useState} from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import classes from "./Pagination.module.scss"


const Pagination = (props) => {
    const {isLightTheme} = useSelector(state => state.Config)
    let portionCount = Math.ceil(props.totalpages / 5)
    let [portionNumber, setPortionNumber] = useState(1)
    let [pages, setPages] = useState([])
    let leftPositionPageNumber = (portionNumber - 1) * 5 + 1
    let rightPositionPageNumber = portionNumber * 5
    
    useEffect(() => {
        let tempArr = []
        for(let i = leftPositionPageNumber; i <= rightPositionPageNumber; i++) {
            tempArr.push(i)
        }
        setPages([...tempArr])
    },[portionNumber,props.currentPage])

    return <div className={classes.pagination}>
        <div className={classes.pagination__container}>
            <div className={classes.pagination__left}>
                {portionNumber > 1 && <>
                    <div className={`
                        ${classes.pagination__arrow} 
                        ${classes.pagination__arrow_left}
                        ${!isLightTheme && classes.pagination__arrow_dark}
                    `}
                        onClick = {() => setPortionNumber(portionNumber - 1)}
                    >
                    </div>
                    <div className = {`
                        ${classes.pagination__dots}
                        ${!isLightTheme && classes.pagination__dots_dark}
                    `}
                        onClick = {() => {
                            if(portionNumber - 10 > 1) {
                                setPortionNumber(portionNumber - 10)
                            } else {
                                setPortionNumber(1)
                            }
                        }}
                    >
                        <span></span>
                    </div>
                </>
                }
            </div>
            <div className={classes.pagination__center}>
                {pages.map(el => {
                    return <div key = {el} className = {`
                        ${classes.pagination__number}
                        ${props.currentPage === el && classes.pagination__number_active}
                        ${!isLightTheme && classes.pagination__number_dark}
                    `} onClick = {() => props.clickHandler(el)}>{el}</div>
                })}
            </div>
            <div className={classes.pagination__right}>
                {portionNumber < portionCount && <>
                    <div className = {`
                        ${classes.pagination__dots}
                        ${!isLightTheme && classes.pagination__dots_dark}
                    `}
                        onClick = {() => {
                            if(portionNumber + 10 < portionCount) {
                                setPortionNumber(portionNumber + 10)
                            } else {
                                setPortionNumber(portionCount)
                            }
                        }}
                    >
                        <span></span>
                    </div>
                    <div className={`
                        ${classes.pagination__arrow}
                        ${classes.pagination__arrow_right}
                        ${!isLightTheme && classes.pagination__arrow_dark}
                    `}
                        onClick = {() => setPortionNumber(portionNumber + 1)}
                    >
                    </div>
                </>
                }
            </div>
        </div>
    </div>
}

export default Pagination