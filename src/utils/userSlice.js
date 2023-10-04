import { createSlice } from "@reduxjs/toolkit"


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
                    
                   return {
                    ...state,
                    user:action.payload.user,
                    bearerToken:action.payload.token
                   }

                } ,
                removeUser:(state)=>{

                },
            },
            
        });

    export const {addUser,removeUser,fetchUser} = userSlice.actions;

    export default userSlice.reducer;