import axios from 'axios'
import config from '../config'
import {CategoriesDataFail, CategoriesDataSuccess, CategoryDataBegging} from '../store/action/categoryAction'

// get the categories data
export const getCategories = ()=>{
    return dispatch => {
        dispatch(CategoryDataBegging());

        //get data from api
        return axios.get(`${config.baseUrl}sort/public/list/categories`)
            .then(data=>{
                if (data.statusText !== 'OK'){
                    dispatch(CategoriesDataFail(data.statusText))
                } else {
                    dispatch(CategoriesDataSuccess(data.data))
                }
            }).catch(err => {throw Error(err)
            })
    }
};
