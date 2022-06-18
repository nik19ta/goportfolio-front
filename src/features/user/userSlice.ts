import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Project, UserState } from '../../interfaces/user';
import { errNotification, successNotification } from '../../utils/notification';
import { changeExistingCategory, chengePhoto, CreateNewCategory, createProject, deleteExistingCategory, deleteProject, renameProject, SetStateProject } from '../project/projectSlice';

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

      // Если мы создаём новый проект
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push({
          uuid: action.payload.uuid,
          category_uuid: action.payload.category_uuid,
          name: "untitled",
          prewiew: "empty",
          state: 1
        })
      })

      // Если проект успешно удалился
      .addCase(deleteProject.fulfilled, (state, action) => {
        const array: Project[] = []

        for (let i = 0; i < state.projects.length; i++) {
          const element = state.projects[i];
          if (element.uuid !== action.payload) array.push(element)
        }

        state.projects = array
      })

      // Если проект переменовали
      .addCase(renameProject.fulfilled, (state, action) => {
        for (let i = 0; i < state.projects.length; i++) {
          if (state.projects[i].uuid === action.payload.uuid) {
            state.projects[i].name = action.payload.title
          }
        }
      })

      // Если мы меняем превью проекта
      .addCase(chengePhoto.fulfilled, (state, action) => {
        for (let i = 0; i < state.projects.length; i++) {
          if (state.projects[i].uuid === action.payload.uuid) {
            state.projects[i].prewiew = action.payload.prewiew
          }
        }
      })

      // Если поменяли состояние проекта 
      .addCase(SetStateProject.fulfilled, (state, action) => {
        for (let i = 0; i < state.projects.length; i++) {
          if (state.projects[i].uuid === action.payload.uuid) {
            state.projects[i].state = action.payload.state
          }
        }
      })

      // Если добавили новую категорию
      .addCase(CreateNewCategory.fulfilled, (state, action) => {
        state.categories.push({
          uuid: action.payload.created,
          user_uuid: state.categories[0].user_uuid,
          name: action.payload.title
        })
      })

      // Если изминили категорию
      .addCase(changeExistingCategory.fulfilled, (state, action) => {
        for (let i = 0; i < state.categories.length; i++) {
          if (state.categories[i].uuid == action.payload.uuid) {
            state.categories[i].name = action.payload.title
          }
        }
      })

      // Если удалили категорию
      .addCase(deleteExistingCategory.fulfilled, (state, action) => {
        const new_array = []

        for (let i = 0; i < state.categories.length; i++) {
          if (state.categories[i].uuid !== action.payload) {
            new_array.push(state.categories[i])
          }
        }

        state.categories = new_array      
      })

  },
});

export default UserSlice.reducer;
