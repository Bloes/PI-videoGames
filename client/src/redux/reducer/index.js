import { GET_BY_NAME, GET_GAMES, GET_GENRES, DELETE_GAME, ORDER } from '../actions/actions-types';
let initialState = { 
    allGames: [], 
    allgamesCopy: [], 
    genres: [] 
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allgamesCopy: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allGames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case ORDER:
         const orderGame = state.allGames.sort((a, b)=> {
                if(action.payload === "A") {
                    if(a.id < b.id ) return -1;
                    if(b.id < a.id) return 1
                    return 0
                }
                // DESCENDENTE
                else {
                    if(a.id < b.id) return 1
                    if(b.id < a.id) return - 1
                    return 0
                } 
            })
        return {
            ...state,
            genres: [...orderGame],
        };
    case DELETE_GAME:
      return {
        ...state,
        allGames: state.allGames.filter((game) => game.id !== action.payload),
        allgamesCopy: state.allgamesCopy.filter(
          (game) => game.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default rootReducer;