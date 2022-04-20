import { AxiosResponse } from "axios"
import { CreateProjectResp, DeleteProjectResp, RenameProjectResp } from "../../interfaces/project"
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

// Изменить prewiew проекта 
export const fetchSetPrewiew = async (uuid: string, selectedFile: any) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("photo_type", "prewiew");
    formData.append("project_uuid", uuid);
    try {
      const response = await client()({
        method: "put",
        url: `${process.env.REACT_APP_SERVER_HOST}/api/project/photo`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

    } catch(error) {
      console.log(error)
    }
}