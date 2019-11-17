export const GET_CATEGORIES_BEGIN = 'GET_CATEGORIES_BEGIN';
export const GET_CATEGORIES_SUCCESS  = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';


// to inform us that the fetching is begging
export const CategoryDataBegging =  ()=>({
    type: GET_CATEGORIES_BEGIN
});

// to store the grabbed data from api
export const CategoriesDataSuccess = categories =>({
    type: GET_CATEGORIES_SUCCESS,
    loaded: {categories}
});

// in case if an error happened
export const CategoriesDataFail = error =>({
    type: GET_CATEGORIES_FAILURE,
    loaded: {error}
});

//store the selected category
export const storeSelectedCategory = name =>({
    type: SELECTED_CATEGORY,
    categoryName: name
});