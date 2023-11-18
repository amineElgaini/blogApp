import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import postReducer from "./postSlice";
import authReducer from "./ProfilSlice";
import postViewReducer from "./postViewSlice";

// use useselectore and access wich state you wanna use
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        postView: postViewReducer,
    },
});

export default store;
