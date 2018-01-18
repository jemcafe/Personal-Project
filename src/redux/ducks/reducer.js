const initialState = {
   user: null,            // Will be the user session object
   searchResults: []
};

// Action types
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

// Reducer
export default function reducer ( state = initialState, action ) {
   let { type, payload } = action;

   switch ( type ) {
      case LOGIN:
         return { ...state, user: payload };
      case REGISTER:
         return { ...state, user: payload };
      case UPDATE_SEARCH_RESULTS:
         return { ...state, searchResults: payload };
      default:
         return state;
   }
}

// Action creators
export function login ( user ) {
   return {
      type: 'LOGIN',
      payload: user
   };
}

export function register ( user ) {
   return {
      type: 'REGISTER',
      payload: user
   };
}

export function updateSearchResults ( searchResults ) {
   return {
      type: UPDATE_SEARCH_RESULTS,
      payload: searchResults
   };
}