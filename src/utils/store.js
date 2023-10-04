import {  configureStore, } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import listenerMiddleware from "./middleware";



const store = configureStore({
    reducer:{
        user:userSlice
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
    } 
});
export default store;
