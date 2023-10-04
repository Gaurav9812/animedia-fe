import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user:null,
    bearerToken:null,
};
 const userSlice = createSlice({
            name:"User",
            initialState:initialState,
            reducers:{
                addUser:(state,action) => {
                      console.log(action);  
                      console.log(state);  
                } ,
                removeUser:(state)=>{

                },
            },
            
        });

    export const {addUser,removeUser} = userSlice.actions;

    export default userSlice.reducer;