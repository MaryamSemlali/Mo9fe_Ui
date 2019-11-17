import {ALL_IMAGES} from "../action/uploadImagesAction";


const initialState = {
    imagesStock: []
};

 const imagesReducer = (state = initialState, action)=>{

     switch (action.type){
         case ALL_IMAGES:
             return {
                 ...state,
                 imagesStock: action.imagesPayload
             };
         default: {return state}
     }
};

 export default imagesReducer