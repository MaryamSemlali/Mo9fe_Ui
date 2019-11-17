export const USERS_DATA = 'USERS_DATA';
export const GET_USERS_DATA_BEGIN = 'GET_USERS_DATA_BEGIN';
export const LOGIN_BEGGING = 'LOGIN_BEGGING';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILED = 'DELETE_ACCOUNT_FAILED';

export const UsersData = data =>({
    type: USERS_DATA,
    usersPayload: data
});
export const GetUsersDataBegging = ()=>({
    type: GET_USERS_DATA_BEGIN
});

export const LoginBegging = ()=>({
    type: LOGIN_BEGGING,
    loginLoading: true
});

export const LoginSuccess = (data)=>({
    type: LOGIN_SUCCESS,
    loginLoading: false,
    loggedUser: data
});

export const LoginFailed = error =>({
    type: LOGIN_FAILED,
    loginError: error
});
export const DeleteAccountSuccess= ()=>({
    type: DELETE_ACCOUNT_SUCCESS,
    deleteMeSuccess : true,
});
export const  DeleteAccountFailed = (data)=>({
    type: DELETE_ACCOUNT_FAILED,
    deleteMeFailMsg: data
});