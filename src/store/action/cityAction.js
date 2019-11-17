export const GET_Cities_BEGIN = 'GET_Cities_BEGIN';
export const GET_Cities_SUCCESS = 'GET_Cities_SUCCESS';
export const GET_Cities_FAILURE = 'GET_Cities_FAILURE';
export const SELECTED_CITY = 'SELECTED_CITY';


// to inform us that the fetching is begging
export const CitiesDataBegging =  ()=>({
    type: GET_Cities_BEGIN
});

// to store the grabbed data from api
export const CitiesDataSuccess = cities =>({
    type: GET_Cities_SUCCESS,
    payload: {cities}
});

// in case if an error happened
export const CitiesDataFail = error =>({
    type: GET_Cities_FAILURE,
    payload: {error}
});

// storing the selected city
export const selectCity = name =>({
            type: SELECTED_CITY,
            cityName: name
    });
