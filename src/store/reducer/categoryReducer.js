import { GET_CATEGORIES_BEGIN , GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE, SELECTED_CATEGORY} from '../action/categoryAction'

const initialState = {
    items: [],
    loading: false,
    error: null,
    selectedCategory: null
};

const categoryReducer = (state = initialState, action)=>{

    if (action.type === SELECTED_CATEGORY){
        return {
            ...state,
            selectedCategory:action.categoryName
        }
    }

    switch (action.type) {
        case GET_CATEGORIES_BEGIN:
            return {
                ...state,
                loading: true
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.loaded.categories
            };
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.loaded.error,
            };
        default:
            return state;
    }
};

export default categoryReducer