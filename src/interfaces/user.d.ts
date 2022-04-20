export interface UserState {
    avatar: string
    fullname: string
    mail: string
    shortname: string
    load: boolean
    categories: Category[]
    projects: Project[]
}

export interface ProfileResp {
    avatar: string
    fullname: string
    mail: string
    shortname: string
}

export interface Category {
    uuid: string
    user_uuid: string
    name: string
}

export interface Project {
    uuid: string
    category_uuid: string
    name: string
    prewiew: string
    state: number
}