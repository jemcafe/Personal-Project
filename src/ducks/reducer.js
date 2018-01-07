const initialState = {
    username: '',
    searchCategoryONEList: [],
    searchCategoryTWOList: [],
    searchCategoryONE: '',
    searchCategoryTWO: ''
};

// Action types
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_SEARCH_CATEGORY_1_LIST = 'UPDATE_SEARCH_CATEGORY_1_LSIT';
const UPDATE_SEARCH_CATEGORY_2_LIST = 'UPDATE_SEARCH_CATEGORY_2_LSIT';
const UPDATE_SEARCH_CATEGORY_1 = 'UPDATE_SEARCH_CATEGORY_1';
const UPDATE_SEARCH_CATEGORY_2 = 'UPDATE_SEARCH_CATEGORY_2';

// reducer
function reducer ( state = initialSate, action ) {
    switch ( action.type ) {
        case UPDATE_USERNAME:
            return { ...state, username: action.payload };
        case UPDATE_SEARCH_CATEGORY_1_LIST:
            return { ...state, searchCategoryONEList: action.payload };
        case UPDATE_SEARCH_CATEGORY_2_LIST:
            return { ...state, searchCategoryTWOList: action.payload };
        case UPDATE_SEARCH_CATEGORY_1:
            return { ...state, searchCategoryONE: action.payload };
        case UPDATE_SEARCH_CATEGORY_2:
            return { ...state, searchCategoryTWO: action.payload };
        default:
            return state;
    }
}

// Action creators
export function updateUsername ( username ) {
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updateSearchCategoryONEList ( searchCategoryONEList ) {
    return {
        type: UPDATE_SEARCH_CATEGORY_1_LIST,
        payload: searchCategoryONEList
    }
}

export function updateSearchCategoryTWOList ( searchCategoryTWOList ) {
    return {
        type: UPDATE_SEARCH_CATEGORY_2_LIST,
        payload: searchCategoryTWOList
    }
}

export function updateSearchCategoryONE ( searchCategoryONE ) {
    return {
        type: UPDATE_SEARCH_CATEGORY_1,
        payload: searchCategoryONE
    }
}

export function updateSearchCategoryTWO ( searchCategoryTWO ) {
    return {
        type: UPDATE_SEARCH_CATEGORY_2,
        payload: searchCategoryTWO
    }
}