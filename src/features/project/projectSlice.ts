import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectResp, ProjectState } from '../../interfaces/project';
import { errNotification, successNotification } from '../../utils/notification';
import { getProjects } from '../user/userSlice';

import { addTextToProject, deleteCategory, editCategory, fetchAddPhoto, fetchCreateNewCategory, fetchCreateProject, fetchDeleteProject, fetchRenameProject, fetchSetPrewiew, fetchSetState } from './projectAPI';

const initialState: ProjectState = {} as ProjectState;


export const createProject = createAsyncThunk('Project/CreateProject', async (category_uuid: string) => {
    const response = await fetchCreateProject(category_uuid);
    if (response.status == 200) {
        successNotification("Новый проект успешно создан", "")
    } else {
        errNotification("Ошибка при создании проекта", "Что то пошло не так")
    }

    return {category_uuid, uuid: response.data.project }
});

export const deleteProject = createAsyncThunk('Project/DeleteProject', async (uuid: string) => {
    const response = await fetchDeleteProject(uuid);
    if (response.status == 200) {
        successNotification("Проект успешно удалён", "")
    } else {
        errNotification("Ошибка при удаленние проекта", "Что то пошло не так")
    }

    return uuid
});

export const renameProject = createAsyncThunk('Project/RenameProject', async (data: {uuid: string, title: string}) => {
  await fetchRenameProject(data.uuid, data.title);
    return {uuid: data.uuid, title: data.title}
});

export const chengePhoto = createAsyncThunk('Project/ChengePhotoProject', async (data: {uuid: string, image: File}) => {
  const resp = await fetchSetPrewiew(data.uuid, data.image);
  return {uuid: data.uuid, prewiew: resp.data.upload}
});

export const addPhotoProject = createAsyncThunk('Project/AddPhotoProject', async (data: {uuid: string, image: File}) => {

  const resp = await fetchAddPhoto(data.uuid, data.image);
  return {uuid: data.uuid, photo: resp.data.upload}
});

export const SetStateProject = createAsyncThunk('Project/ChengeState', async (data: {uuid: string, state: number}) => {
  await fetchSetState(data.uuid, data.state);
  return {uuid: data.uuid, state: data.state}
});

export const CreateNewCategory = createAsyncThunk('Category/Create', async (title: string) => {
  const resp = await fetchCreateNewCategory(title);
  return {created: resp.data.created, title}
});

export const changeExistingCategory = createAsyncThunk('Category/Edit', async (data: {uuid: string, title: string}) => {
  await editCategory(data.uuid, data.title)
  return {uuid: data.uuid, title: data.title}
});

export const deleteExistingCategory = createAsyncThunk('Category/Delete', async (uuid: string) => {
  await deleteCategory(uuid)
  return uuid
});

export const AddDescritionToProject = createAsyncThunk('Project/AddDescription', async (data: {uuid: string, text: string}) => {
  const resp = await addTextToProject(data.uuid, data.text)
  return {uuid: resp.data.description_id, text: data.text, project_uuid: data.uuid}
});

export const ProjectSlice = createSlice({
  name: 'Project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create Prpjects
      .addCase(createProject.pending, (state) => {
        state.load_create_project = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.load_create_project = true;
      })
      .addCase(deleteProject.pending, (state) => {
        state.load_delete_project = true;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.load_delete_project = true;
      })
      .addCase(renameProject.pending, (state) => {})
      .addCase(renameProject.fulfilled, (state, action) => {})
  },
});

export default ProjectSlice.reducer;
