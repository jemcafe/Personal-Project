const initialState = {
   user: {},
   cartItems: [],

   productCategories: [],
   productSubcategories: [],

   searchCategory: '',
   searchResults: [],

   product: {},
};

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const GET_USER = 'GET_USER';

const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';

const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES';
const GET_PRODUCT_SUBCATEGORIES = 'GET_PRODUCT_SUBCATEGORIES';
const UPDATE_SEARCH_CATEGORY = 'UPDATE_SEARCH_CATEGORY';
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';
const GET_PRODUCT= 'GET_PRODUCT';

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
      case UPDATE_CART_ITEMS:
         return { ...state, cartItems: payload };
      case GET_PRODUCT_CATEGORIES:
         return { ...state, productCategories: payload };
      case GET_PRODUCT_SUBCATEGORIES:
         return { ...state, productSubcategories: payload };
      case UPDATE_SEARCH_CATEGORY:
         return { ...state, searchCategory: payload };
      case UPDATE_SEARCH_RESULTS:
         return { ...state, searchResults: payload };
      case GET_PRODUCT:
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

export function updateSearchCategory ( searchCategory) {
   return {
      type: 'UPDATE_SEARCH_CATEGORY',
      payload: searchCategory
   };
}

export function updateSearchResults ( searchResults ) {
   return {
      type: 'UPDATE_SEARCH_RESULTS',
      payload: searchResults
   };
}

export function getProduct ( product ) {
   return {
      type: 'GET_PRODUCT',
      payload: product
   };
}