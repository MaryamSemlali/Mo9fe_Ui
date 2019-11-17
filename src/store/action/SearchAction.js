export const SELECTED_SERVICE = 'SELECTED_SERVICE';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const SELECTED_CITY = 'SELECTED_CITY';

export const SelectedService = data =>({
    type: SELECTED_SERVICE,
    serviceType: data
});

export const SelectedCategory = data =>({
    type: SELECTED_CATEGORY,
    categoryName: data
});

export const SelectedCity = data =>({
    type: SELECTED_CITY,
    cityName: data
});
