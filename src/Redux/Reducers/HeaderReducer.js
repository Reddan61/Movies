const CHANGETEXT = "CHANGETEXT"

const initialState = {
    text: ""
}


const HeaderReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGETEXT:
            return {...state,...action.payload}
        default:
            return state
    }
}

export default HeaderReducer


export const headerAC = {
    changeSearchTextAC: (text) => ({type:CHANGETEXT,payload:{text}})
}

export const changeSearchTextThunk = (text) => {
    return dispatch => {
        dispatch(headerAC.changeSearchTextAC(text))
    }
}