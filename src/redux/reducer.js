const initialState = {
   username: '',
   searchResults: []
};

// Action types
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

// Reducer
export default function reducer ( state = initialState, action ) {
   let { type, payload } = action;

   switch ( type ) {
      case UPDATE_USERNAME:
         return { ...state, username: payload };
      case UPDATE_SEARCH_RESULTS:
         return { ...state, searchResults: payload };
      default:
         return state;
   }
}

// Action creators
export function updateUsername ( username ) {
   return {
      type: UPDATE_USERNAME,
      payload: username
   };
}

export function updateSearchResults ( searchResults ) {
   return {
      type: UPDATE_SEARCH_RESULTS,
      payload: searchResults
   };
}