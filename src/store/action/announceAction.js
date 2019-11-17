export const GET_ANNOUNCE_BEGIN = 'GET_ANNOUNCE_BEGIN';
export const GET_ANNOUNCE_SUCCESS  = 'GET_ANNOUNCE_SUCCESS';
export const GET_ANNOUNCE_FAILURE = 'GET_ANNOUNCE_FAILURE';
export const CREATE_ANNOUNCE_BEGIN = 'CREATE_ANNOUNCE_BEGIN';
export const CREATE_ANNOUNCE_SUCCESS = 'CREATE_ANNOUNCE_SUCCESS';
export const CREATE_ANNOUNCE_FAILURE = 'CREATE_ANNOUNCE_FAILURE';
export const CREATE_ANNOUNCE_STOP = 'CREATE_ANNOUNCE_STOP';
export const GET_USER_ANNOUNCES_SUCCESS = 'GET_USER_ANNOUNCE_SUCCESS';
export const GET_USER_ANNOUNCES_FAILURE = 'GET_USER_ANNOUNCE_FAILURE';
export const DELETE_ANNOUNCE_SUCCESS = 'DELETE_ANNOUNCE_SUCCESS';
export const DELETE_ANNOUNCE_FAILED = 'DELETE_ANNOUNCE_FAILED';

// to inform us that the fetching is begging
export const AnnounceDataBegging =  ()=>({
    type: GET_ANNOUNCE_BEGIN
});

// to store the grabbed data from api
export const AnnounceDataSuccess = announces =>({
    type: GET_ANNOUNCE_SUCCESS,
    announcesPayload: announces
});

// in case if an error happened
export const AnnounceDataFail = error =>({
    type: GET_ANNOUNCE_FAILURE,
    payloadError: error
});


// -------------- create announce
// create announce begging
export const CreateAnnounceDataBegging =  ()=>({
    type: CREATE_ANNOUNCE_BEGIN
});

// create announce succeed
export const CreateAnnounceDataSuccess = data =>({
    type: CREATE_ANNOUNCE_SUCCESS,
    announceCreated: data
});

// create announce failed
export const CreateAnnounceDataFail = error =>({
    type: CREATE_ANNOUNCE_FAILURE,
    creationFailed: error
});

export const CreateAnnounceStop =  ()=>({
    type: CREATE_ANNOUNCE_STOP
});


//-------------------------------
// get user announces
export const GetUserAnnouncesSuccess = announces =>({
    type: GET_USER_ANNOUNCES_SUCCESS,
    userAnnounces: announces
});

// in case if an error happened
export const GetUserAnnouncesFail = error =>({
    type: GET_USER_ANNOUNCES_FAILURE,
    userAnnouncesError: error
});


//-------------------------------DeleteAnnounceBegging
export const DeleteAnnounceSuccess= ()=>({
    type: DELETE_ANNOUNCE_SUCCESS,
    deleteAnnounceSuccess : true,
});

export const  DeleteAnnounceFailed = (data)=>({
    type: DELETE_ANNOUNCE_FAILED,
    deleteAnnounceFailMsg: data
});