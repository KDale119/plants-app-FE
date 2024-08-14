import {createAsyncThunk, createSlice, isFulfilled, isPending} from '@reduxjs/toolkit';
import { User } from "@/models/user.model";
import axios, { axiosCatch } from "./axios-utils";


const initialState = {
    currentUser: undefined as unknown as User,
    loading: false
};

export const createUser = createAsyncThunk('user/create_user', async (user: User) => {
    return axios.post('/users', JSON.stringify(user)).catch(axiosCatch);
});

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addMatcher(isFulfilled(createUser), (state, action) => {
                return {
                    ...state,
                    currentUser: action.payload.data,
                    loading: false,
                };
            })
            .addMatcher(isPending(createUser), (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
    }
});

export default UserSlice.reducer;
export const selectCurrentUser = (state: any): User => state.user.currentUser;
export const selectUserLoading = (state: any): boolean => state.user.loading;