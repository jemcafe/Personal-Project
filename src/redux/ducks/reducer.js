const initialState = {
   user: {},            // Will be the user session object
   searchResults: []
};

// Action types
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

// Reducer
export default function reducer ( state = initialState, action ) {
   let { type, payload } = action;

   switch ( type ) {
      case UPDATE_USER:
         return { ...state, user: payload };
      case UPDATE_SEARCH_RESULTS:
         return { ...state, searchResults: payload };
      default:
         return state;
   }
}

// Action creators
export function updateUsername ( user ) {
   return {
      type: UPDATE_USER,
      payload: user
   };
}

export function updateSearchResults ( searchResults ) {
   return {
      type: UPDATE_SEARCH_RESULTS,
      payload: searchResults
   };
}