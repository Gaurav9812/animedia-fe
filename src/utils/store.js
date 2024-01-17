import {  configureStore, } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import listenerMiddleware from "./middleware";
import urlSlice from "./urlSlice";



const store = configureStore({
    reducer:{
        user:userSlice,
        url:urlSlice

    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
    } 
});
export default store;
