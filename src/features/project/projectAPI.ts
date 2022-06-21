import { AxiosResponse } from "axios"
import { ChangePrewiewProject, CreateProjectResp, DeleteProjectResp, RenameProjectResp, RespCreateCategory, SetStateProject } from "../../interfaces/project"
import { client } from "../../utils/api"

// Создание пустого проекта
export const fetchCreateProject = async (category_uuid: string): Promise<AxiosResponse<CreateProjectResp>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project/new`
    const response: AxiosResponse<CreateProjectResp> = await client().post(url, {category_uuid: category_uuid})
    return response
}

// Удалить проект
export const fetchDeleteProject = async (uuid: string): Promise<AxiosResponse<DeleteProjectResp>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project`
    const response: AxiosResponse<DeleteProjectResp> = await client().delete(url, {data: {uuid: uuid}})
    return response
}

// Переменовать проект
export const fetchRenameProject = async (uuid: string, title: string): Promise<AxiosResponse<RenameProjectResp>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project/title`
    const response: AxiosResponse<RenameProjectResp> = await client().put(url, {uuid, title})
    return response
}

// Поменять state провекта
export const fetchSetState = async (uuid: string, state: number): Promise<AxiosResponse<SetStateProject>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project/state`
    const response: AxiosResponse<SetStateProject> = await client().put(url, {
      project_uuid: uuid,
      state: state
    })
    return response
}

// Создать новую категорию
export const fetchCreateNewCategory = async (title: string): Promise<AxiosResponse<RespCreateCategory>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/categories/create`
    const response: AxiosResponse<RespCreateCategory> = await client().post(url, {title})
    return response
}

// Изменить существующую категорию
export const editCategory = async (uuid: string, new_title: string): Promise<AxiosResponse<RespCreateCategory>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/categories/edit`
    const response: AxiosResponse<RespCreateCategory> = await client().put(url, {
      uuid: uuid,
      title: new_title,
    })
    return response
}

// Изменить существующую категорию
export const deleteCategory = async (uuid: string): Promise<AxiosResponse<any>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/categories/delete`
    const response: AxiosResponse<any> = await client().delete(url, {
      data: { uuid: uuid }
    })
    return response
}

// Добавить текст
export const addTextToProject = async (uuid: string, text: string): Promise<AxiosResponse<{description_id: string}>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project/create/description`
    const response: AxiosResponse<{description_id: string}> = await client().post(url, {
      text: text,
      uuid: uuid
    })
    return response
}

// Изменить prewiew проекта
export const fetchSetPrewiew = async (uuid: string, selectedFile: any) => {
  console.log("ADD PREWIEW");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("photo_type", "prewiew");
    formData.append("project_uuid", uuid);

    const response: AxiosResponse<ChangePrewiewProject> = await client()({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_HOST}/api/project/photo`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response
}

// Добавить изображение для проекта
export const fetchAddPhoto = async (uuid: string, selectedFile: any) => {
  console.log("ADD PHOTO");

    const formData = new FormData();
    formData.append("photo_type", "desktop");
    formData.append("project_uuid", uuid);
    formData.append("file", selectedFile);

    const response: AxiosResponse<ChangePrewiewProject> = await client()({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_HOST}/api/project/photo`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response
}
