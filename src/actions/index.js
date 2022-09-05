import axios from 'axios';

export function getGenres() {
    return async function (dispatch) {
        const { data } = await axios.get(`${process.env.REACT_APP_MY_API_URL}/genres`);

        return dispatch({
            type: 'GET_GENRES',
            payload: data
        })
    }
}

export function getGames(genres) {
    return async function (dispatch) {
        const json = await axios.get(`${process.env.REACT_APP_MY_API_URL}/games`, {
            params: {
                genres
            }
        });
        return dispatch({
            type: 'GET_GAMES',
            payload: json.data

        })
    }
};
/////////////////// desde aca
export function postGames(payload) {
    return async function (dispatch) {
        const response = await axios.post(`${process.env.REACT_APP_MY_API_URL}/games`, payload);
        console.log(response);
        return dispatch({
            type: 'POST_GAMES',
            payload: response.data
        })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`${process.env.REACT_APP_MY_API_URL}/detail/${id}`)
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

//////////////////Hasta aca me falta hacer el back

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getNameGames(name) { // TENGO QUE HACER LA RUTA
    return async function (dispatch) {
        try {
            const data = await axios.get(`${process.env.REACT_APP_MY_API_URL}/games`, {
                params: {
                    search: name
                }
            });
            return dispatch({
                type: 'GET_NAME_GAMES',
                payload: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// export function filterGamesByGenres(payload){
//     return {
//         type: 'FILTER_BY_GENRES',
//         payload
//     }
// }
