import {
    USERS_DATA,
    GET_USERS_DATA_BEGIN,
    LOGIN_BEGGING,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILED
} from "../action/userAction";

let userIsLogged = JSON.parse(localStorage.getItem('user'));
const initialState = {
    usersInfo: [],
    loadingUsers: false,
    loginLoading: false,
    LoginError: null,
    loggedUser: userIsLogged ? userIsLogged.data : null,
    deleteMe: false,
    deleteMeError: null
};

const userReducer = (state = initialState, action)=>{

    switch (action.type){
        case USERS_DATA:
            return {
                ...state,
                usersInfo: action.usersPayload,
                loadingUsers: false,
            };
        case GET_USERS_DATA_BEGIN:
            return {
                ...state,
                loadingUsers: true,
            };
        case LOGIN_BEGGING:
            return {
                ...state,
                loginLoading: action.loginLoading
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loggedUser: action.loggedUser
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loginLoading: false,
                loggedUser: null,
                loginError: action.loginError
            };
        case DELETE_ACCOUNT_SUCCESS:
            return{
                ...state,
                deleteMe: action.deleteMeSuccess
            };
        case DELETE_ACCOUNT_FAILED:
            return{
                ...state,
                deleteMe: false,
                deleteMeError: action.deleteMeFailMsg
            };
        default: {
            return state
        }
     }
};

 export default userReducer