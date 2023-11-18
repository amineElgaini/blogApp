import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    users: [],
    pagination: [1, 1],
    currentPagination: 1,
    search: { id: undefined },
    error: "",
};

const USER_URL = "http://localhost:3500/users";

export const fetchUsers = createAsyncThunk("user/fetchUsers", (payload) => {
    return axios
        .get(`${USER_URL}`, {
            params: {
                _page: payload.pagination,
                id: payload.searchByUserIdValue,
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
                    id: payload.searchByUserIdValue,
                },
            };
            return data;
        });
});

export const addUser = createAsyncThunk("user/addUser", (payload) => {
    return axios.post(`${USER_URL}`, payload).then((response) => {
        return response.data;
    });
});

export const updateUser = createAsyncThunk("user/updateUser", (payload) => {
    return axios
        .put(`${USER_URL}/${payload.id}`, payload.updates)
        .then((response) => {
            return response.data;
        });
});

export const deleteUser = createAsyncThunk("user/deleteUser", (payload) => {
    return axios.delete(`${USER_URL}/${payload.id}`).then((response) => {
        return response.data;
    });
});

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        // fetch users
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.users = action.payload.response;

            // i we reload the component he gonna save the search
            state.pagination = action.payload.paginationInterval;
            state.currentPagination = action.payload.pagination;
            state.search = action.payload.search;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });

        // add users
        builder.addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.error = "";
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // udpate users
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((e) => {
                if (e.id === action.meta.arg.id) {
                    return { id: e.id, ...action.meta.arg.updates };
                }
                return e;
            });
            state.error = "";
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // delete users
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter((user) => {
                return user.id != action.meta.arg.id;
            });
            state.error = "";
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

// for configureStore
export default userSlice.reducer;
