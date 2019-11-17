import axios from 'axios'
import config from '../config'
import {allImages} from "../store/action/uploadImagesAction";



//get all images
export function getAllImages (){
    return (dispatch) => {

        //get data from api
        return axios.get(`${config.baseUrl}getImage/all`)
            .then(response=>{
                if (response.data.success ){

                    let holder = response.data.data;
                    // filter the image path
                    holder.filter(element => {
                        let thePath = ''+element.file_path;
                        return element.file_path = config.baseUploadUrl + thePath.substring(thePath.indexOf('upload')).replace(/\\/g, '/');
                    });
                    dispatch(allImages(holder));
                }

            }).catch(err => {
                console.log(err);
            });
    }
}
