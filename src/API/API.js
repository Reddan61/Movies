import axios from "axios"


const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export const moviesAPI = {
    getMovies: async (page) => {
        try {
            const response = await instance.get(`movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)

            return {isError:false,...response.data}
        } catch (e) {
            return {isError:true,...e.response}
        }
    },
    getDetails: async (id) => {
        try {
            const response = await instance.get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            
            return {isError:false,...response.data}
        } catch (e) {
            return {isError:true,...e.response}
        }
    },

    getMoviesBySearch: async (text,page) => {
        try {
            const response = await instance.get(`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${text}&page=${page}`)
            return {isError:false,...response.data}
        } catch (e) {
            return {isError:true,...e.response}
        }
    },

    getMovieById: async (id) => {
        try {
            const response = await instance.get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            return {isError:false,...response.data}
        } catch (e) {
            return {isError:true,...e.response}
        }
    },

    getMovieCreditsById: async (id) => {
        try {
            const response = await instance.get(`/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
           
            return {isError:false,...response.data}
        } catch (e) {
            return {isError:true,...e.response}
        }
    }
}