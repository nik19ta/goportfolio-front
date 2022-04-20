import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectResp, ProjectState } from '../../interfaces/project';
import { errNotification, successNotification } from '../../utils/notification';

import { fetchCreateProject, fetchDeleteProject, fetchRenameProject } from './projectAPI';

const initialState: ProjectState = {} as ProjectState;


export const createProject = createAsyncThunk('Project/CreateProject', async (projectname: string) => {
    const response = await fetchCreateProject(projectname);
    if (response.status == 200) {
        successNotification("Новый проект успешно создан", "")
    } else {
        errNotification("Ошибка при создании проекта", "Что то пошло не так")
    }

    return
});

export const deleteProject = createAsyncThunk('Project/DeleteProject', async (uuid: string) => {
    const response = await fetchDeleteProject(uuid);
    if (response.status == 200) {
        successNotification("Проект успешно удалён", "")
    } else {
        errNotification("Ошибка при удаленние проекта", "Что то пошло не так")
    }

    return
});

export const renameProject = createAsyncThunk('Project/RenameProject', async (data: {uuid: string, title: string}) => {
    await fetchRenameProject(data.uuid, data.title);
    return
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
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.load_delete_project = true;
      })
      .addCase(renameProject.pending, (state) => {})
      .addCase(renameProject.fulfilled, (state, action) => {})
  },
});

export default ProjectSlice.reducer;
