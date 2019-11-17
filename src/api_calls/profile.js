import axios from 'axios'
import config from '../config'
import {
    ProfileDataFail,
    ProfileDataBegging,
    ProfileDataSuccess,
} from "../store/action/profileAction";

export function getProfiles (){
    return dispatch => {
        dispatch(ProfileDataBegging());

        //get data from api
        return axios.get(`${config.baseUrl}publish/profile/list/all`)
            .then(response=>{
                if (response.statusText !== 'OK'){

                    throw Error(response.status)
                } else {
                    dispatch(ProfileDataSuccess(response.data))
                }
            }).catch(err => {
                dispatch(ProfileDataFail(err.message));
                console.log(err);
            })
    }
}

export function getUserProfile (){
    return dispatch => {
        dispatch(ProfileDataBegging());
        const userId =  JSON.parse(localStorage.getItem('user')).data.user_id;

        //get data from api
        return axios.get(`${config.baseUrl}publish/profile/list/one/${userId}`)
            .then(response=>{
                if (response.statusText !== 'OK'){

                    throw Error(response.status)
                } else {
                    dispatch(ProfileDataSuccess(response.data))
                }
            }).catch(err => {
                dispatch(ProfileDataFail(err.message));
                console.log(err);
            })
    }
}

export function updateProfile (data){

    // extract the token
    const token = JSON.parse(localStorage.getItem('user')).token;

    return dispatch => {
        dispatch(ProfileDataBegging());

        //get data from api
        return axios.patch(`${config.baseUrl}profile/update`, data, {headers: {'Content-Type': 'form-data', 'Authorization':token}})
            .then(response=>{
                console.log(response);
                if (response.statusText !== 'OK'){

                    throw Error(response.status)
                } else {
                    dispatch(ProfileDataSuccess(response.data))
                }
            }).catch(err => {
                dispatch(ProfileDataFail(err.message));
                console.log(err);
            })
    }
}