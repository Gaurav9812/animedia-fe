import { createSlice } from "@reduxjs/toolkit";

export const HOME ="HOME";
export  const MESSAGES ="MESSAGES";
export const VIDEOS ="VIDEOS";
export const NOTIFICATIONS="NOTIFICATIONS";


const initialState ={
    component:null,
};

const urlSlice = createSlice({
    name:"url",
    initialState:initialState,
    reducers:{
        currUrl:(state,action)=>{
                  return {
                    ...state,
                    component:action.payload.component
                  }  
        }
    }
})


export const {currUrl} = urlSlice.actions;

export default urlSlice.reducer;