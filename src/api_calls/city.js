import axios from 'axios'
import config from '../config'
import {CitiesDataFail, CitiesDataSuccess, CitiesDataBegging} from "../store/action/cityAction";

// get the cities data
export function getCities (){
    return dispatch => {
        dispatch(CitiesDataBegging());

        //get data from api
        return axios.get(`${config.baseUrl}sort/public/list/cities`)
            .then(response=>{
                if (response.statusText !== 'OK'){

                    throw Error(response.status)
                } else {
                    dispatch(CitiesDataSuccess(response.data))
                }
            }).catch(err => {
                dispatch(CitiesDataFail(err.message));
                console.log(err);
            })
    }
}