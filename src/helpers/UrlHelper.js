export const BACKEND_URL = "http://localhost:1234";
export const URL_REGISTER = `${BACKEND_URL}/api/user/create-user`;

export const URL_LOGIN = `${BACKEND_URL}/api/user/create-session`;

export const URL_LOGIN_GOOGLE = `${BACKEND_URL}/api/user/login-google`;


export const URL_LOGIN_TOKEN = `${BACKEND_URL}/api/user/login`;


export const URL_FORGOT_PASSWORD = `${BACKEND_URL}/api/user/forgot-password`;


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