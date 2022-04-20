import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { UserState } from '../../interfaces/user';
import { errNotification, successNotification } from '../../utils/notification';

import { fetchCategories, fetchProfile, fetchProjects } from './userAPI';

const initialState: UserState = {} as UserState;


export const getProfile = createAsyncThunk('User/GetProfile', async (username: string) => {
    const response = await fetchProfile(username);

    if (response.status == 200) {
        return response.data;
    } else if (response.status == 404) {
        errNotification("Ошибка", "Такого пользователя не существует")
        return {} as UserState
    } else {
        errNotification("Ошибка", "Что то пошло не так")
        return {} as UserState
    }
  }
);

export const getCategories = createAsyncThunk('User/GetCategories', async (username: string) => {
    const response = await fetchCategories(username);
    if (response.status == 200) {
        if (response.data !== null) {
            return response.data;
        } else {
            return []
        }
    } else {
        return []
    }
});

export const getProjects = createAsyncThunk('User/GetProjects', async (username: string) => {
    const response = await fetchProjects(username);
    if (response.status == 200) {
        if (response.data !== null) {
            return response.data;
        } else {
            return []
        }
    } else {
        return []
    }
});

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Login
      .addCase(getProfile.pending, (state) => {
        state.load = true;
      })
      .addCase(getCategories.pending, (state) => {
        state.load = true;
      })
      .addCase(getProjects.pending, (state) => {
        state.load = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.load = false;
        state.avatar = action.payload.avatar
        state.fullname = action.payload.fullname
        state.mail = action.payload.mail
        state.shortname = action.payload.shortname
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.load = false;
        state.categories = action.payload
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.load = false;
        state.projects = action.payload
      })
  },
});

export default UserSlice.reducer;
