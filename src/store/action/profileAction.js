export const GET_PROFILE_BEGIN = 'GET_PROFILE_BEGIN';
export const GET_PROFILE_SUCCESS  = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';


// to inform us that the fetching is begging
export const ProfileDataBegging =  ()=>({
    type: GET_PROFILE_BEGIN
});

// to store the grabbed data from api
export const ProfileDataSuccess = profiles =>({
    type: GET_PROFILE_SUCCESS,
    profilesPayload: profiles
});

// in case if an error happened
export const ProfileDataFail = error =>({
    type: GET_PROFILE_FAILURE,
    profileError: error
});