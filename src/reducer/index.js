

const initialState = {
    games: [],
    genres: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_GENRES': {
            return {
                ...state,
                genres: action.payload,
            }
        }

        case 'GET_GAMES':
            return {
                ...state,
                games: action.payload, // en mi estado games que es un arreglo vacio manda todo lo que manda GET_GAMES que esta en actions 
                gamesCopy: action.payload
            }

        case 'FILTER_CREATED':
            const allGames1 = state.gamesCopy;
            const createdFilter = action.payload === 'created' ? allGames1.filter(el => el.createdInDb) : allGames1.filter(el => !el.createdInDb)

            return {
                ...state,
                games: action.payload === 'All' ? allGames1 : createdFilter
            }
            
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.games.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                }
                )
            return {
                ...state,
                games: sortedArr
            }

        case 'GET_NAME_GAMES':
            return {
                ...state,
                games: action.payload
            }


        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        case 'POST_GAMES':
            return {
                ...state,
            }
        case 'ORDER_BY_RATING':
            let sort = action.payload === 'high' ?
                state.games.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                }
                )
            return {
                ...state,
                games: sort
            }


        // case 'FILTER_BY_GENRES':
        //     const allGames = state.games
        //     const statusFiltered = action.payload
        //     return {

        //     }


        default: return state;
    }

}

export default rootReducer;