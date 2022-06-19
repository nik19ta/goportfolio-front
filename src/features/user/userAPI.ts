import { AxiosResponse } from "axios"
import { RespGetProjectById } from "../../interfaces/project"
import { Category, ProfileResp, Project } from "../../interfaces/user"
import { client } from "../../utils/api"

// Получение информации о юзера
export const fetchProfile = async (shortname: string): Promise<AxiosResponse<ProfileResp>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/auth/profile?shortname=${shortname}`
    const response: AxiosResponse<ProfileResp> = await client().get(url)
    return response
}

// Получение категорий проектов юзера
export const fetchCategories = async (shortname: string): Promise<AxiosResponse<Category[]>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/categories/?shortname=${shortname}`
    const response: AxiosResponse<Category[]> = await client().get(url)
    return response
}

// Получение проектов юзера
export const fetchProjects = async (shortname: string): Promise<AxiosResponse<Project[]>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project/user?shortname=${shortname}`
    const response: AxiosResponse<Project[]> = await client().get(url)
    return response
}

// Подтянуть проект 
export const getProjectByUUID = async (uuid: string): Promise<AxiosResponse<RespGetProjectById>> => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/api/project/id?id=${uuid}`
    const response: AxiosResponse<RespGetProjectById> = await client().get(url)
    return response
}
