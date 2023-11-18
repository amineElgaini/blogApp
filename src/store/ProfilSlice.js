import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser as deleteUserFromDashboard } from "./userSlice";

const initialState = {
    userInfo: {},
    userPosts: [],
    error: "",
};

export const fetchUser = createAsyncThunk("userAuth/fetchUser", (payload) => {
    return axios
        .get(
            `http://localhost:3500/users?username=${payload.username}&password=${payload.password}`
        )
        .then((response) => {
            return response.data;
        });
});

export const deleteUser = createAsyncThunk("userAuth/deleteUser", (payload) => {
    return axios
        .delete(`http://localhost:3500/users/${payload.id}`)
        .then((response) => {
            return response.data;
        });
});

export const fetchUserPosts = createAsyncThunk(
    "userAuth/fetchUserPosts",
    (payload) => {
        return axios
            .get(`http://localhost:3500/posts/?userId=${payload.id}`)
            .then((response) => {
                return response.data;
            });
    }
);

export const createPost = createAsyncThunk("userAuth/createPost", (payload) => {
    payload.time = new Date().toISOString();
    payload.likes = 0;
    return axios
        .post(`http://localhost:3500/posts`, payload)
        .then((response) => {
            return response.data;
        });
});

export const editPost = createAsyncThunk("userAuth/editPost", (payload) => {
    return axios
        .patch(`http://localhost:3500/posts/${payload.id}`, payload.updates)
        .then((response) => {
            return response.data;
        });
});

export const deletePost = createAsyncThunk(
    "userAuth/deletePost",
    (payload) => {
        return axios
            .delete(`http://localhost:3500/posts/${payload.id}`)
            .then((response) => {
                return response.data;
            });
    }
);

const authSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logout(state) {
            state.userInfo = {};
            localStorage.removeItem("user");
        },
        check(state) {
            const user = localStorage.getItem("user");
            if (user) {
                state.userInfo = JSON.parse(user);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            if (action.payload.length !== 0) {
                const user = action.payload[0];
                state.userInfo = user;
                state.error = "";
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                state.error = "User Not Found";
            }
        });
        builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
            state.userPosts = action.payload;
        });
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.userInfo = {};
            localStorage.removeItem("user");
        });
        builder.addCase(deleteUserFromDashboard.fulfilled, (state, action) => {
            if (state.userInfo.id == action.meta.arg.id) {
                localStorage.removeItem("user");
                state.userInfo = {};
            }
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
        });
        builder.addCase(editPost.fulfilled, (state, action) => {
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
        });
    },
});

// for configureStore
export default authSlice.reducer;
export const { logout, check } = authSlice.actions;
