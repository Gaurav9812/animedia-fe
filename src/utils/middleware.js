import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchUser } from "./userSlice";


const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator:fetchUser,
    effect : async (action,listenApi) => {
            

    }
});

export default listenerMiddleware;