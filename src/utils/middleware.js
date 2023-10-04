import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addUser } from "./userSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator:addUser,
    effect : async (action,listenApi) => {
            console.log(action);
            console.log(listenApi)
            console.log("middleware end");
            
            // listenApi.dispatch(addUser())
    }
});

export default listenerMiddleware;