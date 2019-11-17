import axios from 'axios'
import config from '../config'
import {
    UsersData,
    GetUsersDataBegging,
    LoginBegging,
    LoginFailed,
    LoginSuccess,
    DeleteAccountSuccess,
    DeleteAccountFailed,
} from "../store/action/userAction";

//get users account data
export function getUsers (){
    return dispatch => {

        dispatch(GetUsersDataBegging());
        let holder = {};

        // get the admin token
        axios.patch(`${config.baseUrl}signin`, {user_name: 'admin', password: 'password1'})
            .then(response=>{
                if (response.data.success ){
                    return holder.token = response.data.token
                } else {return holder.token = false}
            })
             .then(()=>{

                 // get users list
                 return axios.get(`${config.baseUrl}users/list`, {headers: {Authorization: holder.token}})
                     .then(res => {

                         // filter the image path
                         holder.data = res.data;
                         holder.data.filter(element => {
                             if (element.picture !== null){
                                 let thePath = ''+element.picture;
                                 return element.picture = config.baseUploadUrl + thePath.substring(thePath.indexOf('upload')).replace(/\\/g, '/');
                             } else {
                                 return element.picture = null
                             }

                         });
                         dispatch(UsersData(holder.data))
                     });
             })
             .catch(err => {
                console.log(err);
            });

    }
}

export function login(username, password) {
    return dispatch => {

        dispatch(LoginBegging());

        return axios.patch(`${config.baseUrl}signin`, {user_name: username, password: password})
            .then(user=>{
                if (user.data.success ){

                    // note => to get the token you need to parse the user local storage first
                    localStorage.setItem('user',JSON.stringify(user.data));
                    dispatch(LoginSuccess(user.data.data));
                } else {

                    // if the credentials are wrong
                    localStorage.removeItem('user');
                    dispatch(LoginFailed(user.data.msg || 'username or password is wrong'))
                }

            })
            .catch(err => {
                console.log(err);
            });

    }
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.href = config.homeUrl;
}

export function signup(data) {
    return dispatch => {

        dispatch(LoginBegging());

        return axios.post(`${config.baseUrl}signup`, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}} )
            .then(user=>{
                if (user.data.success ){
                    console.log(user.data);
                    // note => to get the token you need to parse the user local storage first
                    localStorage.setItem('user',JSON.stringify(user.data));
                    dispatch(LoginSuccess(user.data.data));
                } else {

                    // if the credentials are wrong
                    localStorage.removeItem('user');
                    dispatch(LoginFailed(user.data.msg || 'username or password wrong'))
                }

            })
            .catch(err => {
                console.log(err);
            });

    }
}

export function deleteLoggedAccount(password) {

    // extract the token
    const token = JSON.parse(localStorage.getItem('user')).token;

    return dispatch => {

        dispatch(LoginBegging());
        return axios.delete(`${config.baseUrl}users/delete/me/${password}`,{headers:{'Authorization':token}})
            .then(user=>{
                if (user.data.success ){
                    dispatch(DeleteAccountSuccess());
                } else {
                    dispatch(DeleteAccountFailed(user.data.msg))
                }

            })
            .catch(err => {
                console.log(err);
            });

    }
}