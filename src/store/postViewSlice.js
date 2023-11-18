import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const POST_URL = "http://localhost:3500/posts";

const initialState = {
    loading: false,
    posts: [],
    pagination: [1, 1],
    currentPagination: 1,
    search: { title: undefined, category: undefined },
    error: "",
};

export const fetchPosts = createAsyncThunk("postView/fetchPosts", (payload) => {
    //send category filtred
    if (payload.category) {
        payload.category = payload.category.split(",").sort().join(",");
    }
    return axios
        .get(`${POST_URL}`, {
            params: {
                _page: payload.pagination,
                q: payload.title,
                category_like: payload.category,
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
                    title: payload.title,
                    category: payload.category,
                },
            };
            return data;
        });
});

const postViewSlice = createSlice({
    name: "postView",
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
    },
});
export default postViewSlice.reducer;
