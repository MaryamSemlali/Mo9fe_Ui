import axios from 'axios'
import config from '../config'
import {
    AnnounceDataFail, GetUserAnnouncesSuccess,
    AnnounceDataBegging, GetUserAnnouncesFail,
    AnnounceDataSuccess,
    CreateAnnounceDataBegging, DeleteAnnounceSuccess,
    CreateAnnounceDataFail, DeleteAnnounceFailed,
    CreateAnnounceDataSuccess,
} from "../store/action/announceAction";

// get the announces data
export function getAnnounces (){
    return dispatch => {
        dispatch(AnnounceDataBegging());

        //get data from api
        return axios.get(`${config.baseUrl}publish/announce/list/all`)
            .then(response=>{
                if (response.statusText !== 'OK'){

                    throw Error(response.status)
                } else {
                    dispatch(AnnounceDataSuccess(response.data))
                }
            }).catch(err => {
                dispatch(AnnounceDataFail(err.message));
                console.log(err);
            })
    }
}

export function createAnnounce(data){

    // extract the token
    const token = JSON.parse(localStorage.getItem('user')).token;
    return dispatch => {
        dispatch(CreateAnnounceDataBegging());

        // send data to the api
        return axios.post(`${config.baseUrl}announce/create`, data, {headers: {'Content-Type': 'form-data', 'Authorization':token}} )
            .then(announce=>{
                if (announce.data.success ){

                    dispatch(CreateAnnounceDataSuccess(announce.data.data));
                } else {
                    // if the credentials are wrong
                    dispatch(CreateAnnounceDataFail(announce.data.msg))
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
}

export function getUserAnnounces(){

    // extract the token
    const token = JSON.parse(localStorage.getItem('user')).token;
    return dispatch => {

        // send data to the api
        return axios.get(`${config.baseUrl}announce/list/my/announces`, {headers: {'Authorization':token}} )
            .then(announce=>{
                if (announce.data.success ){
                    dispatch(GetUserAnnouncesSuccess(announce.data.data));
                } else {
                    // if the credentials are wrong
                    dispatch(GetUserAnnouncesFail(announce.data.msg))
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
}

export function deleteAnnounce(announce_id) {

    // extract the token
    const token = JSON.parse(localStorage.getItem('user')).token;

    return dispatch => {

        return axios.delete(`${config.baseUrl}announce/delete/${announce_id}`,{headers:{'Authorization':token}})
            .then(user=>{
                if (user.data.success ){
                    dispatch(DeleteAnnounceSuccess());
                } else {
                    dispatch(DeleteAnnounceFailed(user.data.msg))
                }

            })
            .catch(err => {
                console.log(err);
            });

    }
}