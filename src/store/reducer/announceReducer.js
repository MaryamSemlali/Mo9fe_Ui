import {
    GET_ANNOUNCE_SUCCESS,
    GET_ANNOUNCE_BEGIN,
    GET_ANNOUNCE_FAILURE,
    CREATE_ANNOUNCE_BEGIN,
    CREATE_ANNOUNCE_FAILURE,
    CREATE_ANNOUNCE_SUCCESS,
    GET_USER_ANNOUNCES_SUCCESS,
    GET_USER_ANNOUNCES_FAILURE,
    DELETE_ANNOUNCE_SUCCESS,
    DELETE_ANNOUNCE_FAILED,
    CREATE_ANNOUNCE_STOP
} from "../action/announceAction";

const initialState = {
    announces: [],
    loading: false,
    error: null,
    createAnnounceError: null,
    announceIsCreated: false,
    creationBegging: false,
    userAnnounces: null,
    userAnnouncesFail: null,
    announceIsDeleted: false,
    deleteAnnounceFailMsg: null
};

const announceReducer = (state = initialState, action)=>{

    switch (action.type) {
        case GET_ANNOUNCE_BEGIN:

            return {
                ...state,
                loading: true
            };
        case GET_ANNOUNCE_SUCCESS:
            return {
                ...state,
                loading: false,
                announces: action.announcesPayload
            };
        case GET_ANNOUNCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payloadError,
                announces: []
            };
        case CREATE_ANNOUNCE_BEGIN:
            return {
                ...state,
                creationBegging: true,
            };
        case CREATE_ANNOUNCE_SUCCESS:
            return {
                ...state,
                announceIsCreated: true,
                creationBegging: false,
                createAnnounceError: null
            };
        case CREATE_ANNOUNCE_FAILURE:
            return {
                ...state,
                createAnnounceError: action.creationFailed,
                creationBegging: false,
                announceIsCreated: false
            };
        case CREATE_ANNOUNCE_STOP:
            return {
                ...state,
                announceIsCreated: false
            };
        case GET_USER_ANNOUNCES_SUCCESS:
            return {
                ...state,
                userAnnounces: action.userAnnounces,
                userAnnouncesFail: null
            };
        case GET_USER_ANNOUNCES_FAILURE:
            return {
                ...state,
                userAnnouncesFail: action.userAnnouncesError,
                userAnnounces: null
            };
        case DELETE_ANNOUNCE_SUCCESS:
            return {
                ...state,
                announceIsDeleted: action.deleteAnnounceSuccess
            };
        case DELETE_ANNOUNCE_FAILED:
            return {
                ...state,
                deleteAnnounceFailMsg: action.deleteAnnounceFailMsg
            };
        default:
            return state;
    }
};
export default announceReducer

