const initialState = {
   user: {},

   posts: [],
   posters: [],
   cartItems: [],

   productCategories: [],
   productSubcategories: [],
   searchResults: [],
   productInfo: {},
};

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const GET_USER = 'GET_USER';
// const GET_PROFILE_USER = 'GET_PROFILE_USER';
// const GET_OTHER_USER = 'GET_OTHER_USER';

const UPDATE_POSTS = 'UPDATE_POSTS';
const UPDATE_POSTERS = 'UPDATE_POSTERS';
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';

const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES';
const GET_PRODUCT_SUBCATEGORIES = 'GET_PRODUCT_SUBCATEGORIES';
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';
const GET_PRODUCT_INFO= 'GET_PRODUCT_INFO';

// Reducer
export default function reducer ( state = initialState, action ) {
   let { type, payload } = action;

   switch ( type ) {
      case LOGIN:
         return { ...state, user: payload };
      case REGISTER:
         return { ...state, user: payload };
      case LOGOUT:
         return { ...state, user: payload };
      case GET_USER:
         return { ...state, user: payload };
      case UPDATE_POSTS:
         return { ...state, posts: payload };
      case UPDATE_POSTERS:
         return { ...state, posters: payload };
      case UPDATE_CART_ITEMS:
         return { ...state, cartItems: payload };
      case GET_PRODUCT_CATEGORIES:
         return { ...state, productCategories: payload };
      case GET_PRODUCT_SUBCATEGORIES:
         return { ...state, productSubcategories: payload };
      case UPDATE_SEARCH_RESULTS:
         return { ...state, searchResults: payload };
      case GET_PRODUCT_INFO:
         return { ...state, productInfo: payload };
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

export function logout ( user ) {
   return {
      type: 'LOGOUT',
      payload: user
   };
}

export function getUser ( user ) {
   return {
      type: 'GET_USER',
      payload: user
   };
}

export function updatePosts ( posts ) {
   return {
      type: 'UPDATE_POSTS',
      payload: posts
   };
}

export function updatePosters ( posters ) {
   return {
      type: 'UPDATE_POSTERS',
      payload: posters
   };
}

export function updateCartItems ( cartItems ) {
   return {
      type: 'UPDATE_CART_ITEMS',
      payload: cartItems
   };
}

export function getProductCategories ( productCategories ) {
   return {
      type: 'GET_PRODUCT_CATEGORIES',
      payload: productCategories
   };
}

export function getProductSubcategories ( productSubcategories ) {
   return {
      type: 'GET_PRODUCT_SUBCATEGORIES',
      payload: productSubcategories
   };
}

export function updateSearchResults ( searchResults ) {
   return {
      type: 'UPDATE_SEARCH_RESULTS',
      payload: searchResults
   };
}

export function getProductInfo ( productInfo ) {
   return {
      type: 'GET_PRODUCT_INFO',
      payload: productInfo
   };
}