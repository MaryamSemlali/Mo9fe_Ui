import {GET_Cities_BEGIN, GET_Cities_SUCCESS, GET_Cities_FAILURE, SELECTED_CITY} from '../action/cityAction'

const initialState = {
    items: [],
    loading: false,
    error: null,
    selectedCity: null
};

const cityReducer = (state = initialState, action)=>{

    if(action.type === SELECTED_CITY){
        return {
            ...state,
            selectedCity: action.cityName
        };
    }

    switch (action.type) {
        case GET_Cities_BEGIN:
            return {
                ...state,
                loading: true
            };
        case GET_Cities_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.cities
            };
        case GET_Cities_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        default:
            return state;
    }
};

export default cityReducer