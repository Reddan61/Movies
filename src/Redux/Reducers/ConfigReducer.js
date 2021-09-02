const SWITCHTHEME = "SWITCHTHEME"

const config = JSON.parse(localStorage.getItem("config"))

function setConfig(config) {
    localStorage.setItem("config",JSON.stringify(config))
}

const initialState = {
    isLightTheme: true,
    ...config,
}

const ConfigReducer = (state = initialState,action) => {
    switch(action.type) {  
        case SWITCHTHEME: 
            const config = state
            config.isLightTheme = !state.isLightTheme
            setConfig(config)
            return {...state,...config}
        default: 
            return state
    }
}

export default ConfigReducer

const configAC = {
    switchThemeAC: () => ({type:SWITCHTHEME})
}

export const switchThemeThunk = () => {
    return (dispatch) => {
        dispatch(configAC.switchThemeAC())
    }
}
