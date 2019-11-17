import {
    SELECTED_CITY,
    SELECTED_SERVICE,
    SELECTED_CATEGORY,
} from "../action/SearchAction";


const initialState = {
    serviceType: null,
    cityName: null,
    categoryName: null,
};

const SearchReducer = (state = initialState, action)=>{
    switch (action.type){
        case SELECTED_SERVICE:
            return {
                ...state,
                serviceType: action.serviceType
            };
        case SELECTED_CITY:
            return {
                ...state,
                cityName: action.cityName
            };
        case SELECTED_CATEGORY:
            return {
                ...state,
                categoryName: action.categoryName
            };
        default: {return state}
    }
};

export default SearchReducer