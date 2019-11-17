import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_BEGIN
} from "../action/profileAction";

const initialState = {
    profiles: [],
    loadingProfiles: false,
    profileError: null,
};

const profileReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_PROFILE_BEGIN:
            return {
                ...state,
                loadingProfiles: true
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loadingProfiles: false,
                profiles: action.profilesPayload
            };
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                loadingProfiles: false,
                profileError: action.payloadError,
                profiles: []
            };
        default:
            return state;
    }
};
export default profileReducer

