export const BACKEND_URL = process.env.REACT_APP_BACKEND_ENDPOINT;
export const URL_REGISTER = `${BACKEND_URL}/api/user/create-user`;

export const URL_LOGIN = `${BACKEND_URL}/api/user/create-session`;

export const URL_GET_USER = `${BACKEND_URL}/api/user/get-user`;

export const URL_LOGIN_GOOGLE = `${BACKEND_URL}/api/user/login-google`;

export const URL_LOGIN_TOKEN = `${BACKEND_URL}/api/user/login/`;

export const URL_FORGOT_PASSWORD = `${BACKEND_URL}/api/user/forgot-password`;

export const URL_RESET_PASSWORD = `${BACKEND_URL}/api/user/reset-password/`;

export const URL_PROFILE_UPLOAD_PHOTO = `${BACKEND_URL}/api/profile/upload-photo`;

export const URL_UPDATE_BIO = `${BACKEND_URL}/api/profile/update-bio`;

export const URL_ADD_UPDATE_SKILLS = `${BACKEND_URL}/api/profile/update-skills`;

export const URL_ADD_POST = `${BACKEND_URL}/api/post/add-post`;

export const URL_GET_POSTS = `${BACKEND_URL}/api/post/get-post`;

export const to=(URL,params)=>{
    let paramsString = '';
    if(params instanceof Object){
         Object.entries(params).map((value,index)=>
         {
            if(index == 0){
                paramsString += `${value[0]}=${value[1]}`;
            }else{
                paramsString += `&${value[0]}=${value[1]}`;
            }
         });
    }
    return (paramsString) ? `${BACKEND_URL}/${URL}?${paramsString}` :  `${BACKEND_URL}/${URL}`;

}