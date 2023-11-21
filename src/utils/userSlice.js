import { createSlice } from "@reduxjs/toolkit"
import { addOnLocalStorage, tokenKey } from "../helpers/helper";


const initialState = {
    user:null,
    bearerToken:null,
};
 const userSlice = createSlice({
            name:"User",
            initialState:initialState,
            reducers:{
                fetchUser:()=>{},
                addUser:(state,action) => {
                    
                    addOnLocalStorage(tokenKey,action.payload.token);
                   return {
                    ...state,
                    user:action.payload.user,
                    bearerToken:action.payload.token
                   }

                } ,
                removeUser:(state)=>{
                        return {
                            user:null,
                            bearerToken:null
                        } ;
                },
            },
            
        });

    export const {addUser,removeUser,fetchUser} = userSlice.actions;

    export default userSlice.reducer;