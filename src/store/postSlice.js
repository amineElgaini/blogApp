import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser } from "./userSlice";

const POST_URL = "http://localhost:3500/posts";

const initialState = {
    loading: false,
    posts: [],
    pagination: [1, 1],
    currentPagination: 1,
    search: { userId: undefined, postId: undefined },
    error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", (payload) => {
    return axios
        .get(`${POST_URL}`, {
            params: {
                _page: payload.pagination,
                id: payload.searchByPostIdValue,
                userId: payload.searchByUserIdValue,
            },
        })
        .then((response) => {
            const linkHeader =
                response.headers.get("Link") === ""
                    ? null
                    : response.headers.get("Link").split("_page=");

            const data = {
                response: response.data,
                paginationInterval:
                    linkHeader !== null
                        ? [
                              linkHeader[1][0],
                              linkHeader[linkHeader.length - 1][0],
                          ]
                        : [1, 1],
                pagination: payload.pagination,
                search: {
                    postId: payload.searchByPostIdValue,
                    userId: payload.searchByUserIdValue,
                },
            };
            return data;
        });
});

export const addPost = createAsyncThunk("posts/addPost", (payload) => {
    payload.values.time = new Date().toISOString();
    payload.values.likes = 0;
    payload.values.category.sort();
    payload.values.category = payload.values.category.join(",");
    return axios.post(`${POST_URL}`, payload.values).then((response) => {
        return response.data;
    });
});

export const updatePost = createAsyncThunk("posts/updatePost", (payload) => {
    payload.values.category.sort();
    payload.updates.category = payload.updates.category.join(",");
    return axios
        .patch(`${POST_URL}/${payload.id}`, payload.updates)
        .then((response) => {
            return response.data;
        });
});

export const deletePost = createAsyncThunk("posts/deletePost", (payload) => {
    return axios.delete(`${POST_URL}/${payload.id}`).then((response) => {
        return response.data;
    });
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.posts = action.payload.response;

            // i we reload the component he gonna save the search
            state.pagination = action.payload.paginationInterval;
            state.currentPagination = action.payload.pagination;
            state.search = action.payload.search;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        });

        // add users
        builder.addCase(addPost.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // udpate users
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = state.posts.map((e) => {
                if (e.id === action.meta.arg.id) {
                    return { ...e, ...action.meta.arg.updates };
                }
                return e;
            });
            state.error = "";
        });
        builder.addCase(updatePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // delete users
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter(
                (e) => e.id !== action.meta.arg.id
            );
            state.error = "";
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});
export default postSlice.reducer;
