import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OpenedProject, Project, UserState} from '../../interfaces/user';
import {errNotification} from '../../utils/notification';

import {AddDescritionToProject, addPhotoProject,
  changeExistingCategory, chengePhoto,
  createNewCategory, createProject,
  deleteExistingCategory, deleteProject,
  renameProject, setStateProject} from '../project/projectSlice';

import {fetchCategories, fetchProfile,
  fetchProjects, getProjectByUUID} from './userAPI';

const initialState: UserState = {} as UserState;

export const getProfile = createAsyncThunk(
    'User/GetProfile', async (username: string) => {
      const response = await fetchProfile(username);

      if (response.status == 200) {
        return response.data;
      } else if (response.status == 404) {
        errNotification('Ошибка', 'Такого пользователя не существует');
        return {} as UserState;
      } else {
        errNotification('Ошибка', 'Что то пошло не так');
        return {} as UserState;
      }
    },
);

export const getCategories = createAsyncThunk(
    'User/GetCategories', async (username: string) => {
      const response = await fetchCategories(username);
      if (response.status == 200) {
        if (response.data !== null) {
          return response.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    });

export const getProjects = createAsyncThunk(
    'User/GetProjects', async (username: string) => {
      const response = await fetchProjects(username);
      if (response.status == 200) {
        if (response.data !== null) {
          return response.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    });

export const getProjectById = createAsyncThunk(
    'User/GetProjectById', async (uuid: string) => {
      const response = await getProjectByUUID(uuid);
      return response.data;
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
          state.avatar = action.payload.avatar;
          state.fullname = action.payload.fullname;
          state.mail = action.payload.mail;
          state.shortname = action.payload.shortname;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.load = false;
          state.categories = action.payload;
        })
        .addCase(getProjects.fulfilled, (state, action) => {
          state.load = false;
          state.projects = action.payload;
        })

        // Если мы создаём новый проект
        .addCase(createProject.fulfilled, (state, action) => {
          state.projects.push({
          // uuid: action.payload.uuid,
            category_uuid: action.payload.categoryId,
            name: 'untitled',
            prewiew: 'empty',
            state: 1,
            uuid: '',
          });
        })

        // Если проект успешно удалился
        .addCase(deleteProject.fulfilled, (state, action) => {
          const array: Project[] = [];

          for (let i = 0; i < state.projects.length; i++) {
            const element = state.projects[i];
            if (element.uuid !== action.payload) array.push(element);
          }

          state.projects = array;
        })

        // Если проект переменовали
        .addCase(renameProject.fulfilled, (state, action) => {
          for (let i = 0; i < state.projects.length; i++) {
            if (state.projects[i].uuid === action.payload.uuid) {
              state.projects[i].name = action.payload.title;
            }
          }
        })

        // Если мы меняем превью проекта
        .addCase(chengePhoto.fulfilled, (state, action) => {
          for (let i = 0; i < state.projects.length; i++) {
            if (state.projects[i].uuid === action.payload.uuid) {
              state.projects[i].prewiew = action.payload.prewiew;
            }
          }
        })

        // Если поменяли состояние проекта
        .addCase(setStateProject.fulfilled, (state, action) => {
          for (let i = 0; i < state.projects.length; i++) {
            if (state.projects[i].uuid === action.payload.uuid) {
              state.projects[i].state = action.payload.state;
            }
          }
        })

        // Если добавили новую категорию
        .addCase(createNewCategory.fulfilled, (state, action) => {
          state.categories.push({
            uuid: action.payload.created,
            user_uuid: state.categories[0].user_uuid,
            name: action.payload.title,
          });
        })

        // Если изминили категорию
        .addCase(changeExistingCategory.fulfilled, (state, action) => {
          for (let i = 0; i < state.categories.length; i++) {
            if (state.categories[i].uuid == action.payload.uuid) {
              state.categories[i].name = action.payload.title;
            }
          }
        })

        // Если удалили категорию
        .addCase(deleteExistingCategory.fulfilled, (state, action) => {
          const newArray = [];

          for (let i = 0; i < state.categories.length; i++) {
            if (state.categories[i].uuid !== action.payload) {
              newArray.push(state.categories[i]);
            }
          }

          state.categories = newArray;
        })

        // Если lобавили фото
        .addCase(addPhotoProject.fulfilled, (state, action) => {
          state.active_project.photos.push({
            project_uuid: '',
            photo_uuid: action.payload.uuid,
            src: action.payload.photo,
            type: 0,
          });
        })

        // Если lобавили Текст
        .addCase(AddDescritionToProject.fulfilled, (state, action) => {
          state.active_project.descriptions.push({
            uuid: action.payload.uuid,
            project_uuid: action.payload.project_uuid,
            value: action.payload.text,
          });
        })

        // Если открыли проект
        .addCase(getProjectById.fulfilled, (state, action) => {
          const openedProject = {
            project: {},
            photos: [],
            descriptions: [],
          } as unknown as OpenedProject;
          if (action.payload?.photos) {
            openedProject.photos = action.payload?.photos;
          }

          if (action.payload?.descriptions) {
            openedProject.descriptions = action.payload?.descriptions;
          }

          if (action.payload!.project.contents !== '') {
            openedProject.project.contents = action.payload!.project.contents
                .split(',')
                .map((item) => {
                  return {
                    content: item.split('&')[1],
                    type: item.split('&')[0],
                  };
                });
          }
          // eslint-disable-next-line max-len
          openedProject.project.category_uuid = action.payload!.project.category_uuid;
          openedProject.project.name = action.payload!.project.name;
          openedProject.project.prewiew = action.payload!.project.prewiew;
          openedProject.project.state = action.payload!.project.state;
          openedProject.project.user_uuid = action.payload!.project.user_uuid;
          openedProject.project.uuid = action.payload!.project.uuid;

          state.active_project = openedProject;
        });
  },
});

export default UserSlice.reducer;
