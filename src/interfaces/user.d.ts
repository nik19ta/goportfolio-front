export interface UserState {
    avatar: string
    fullname: string
    mail: string
    shortname: string
    load: boolean
    categories: Category[]
    projects: Project[]
    active_project: OpenedProject
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
export interface OpenedProject {
    project: {
        uuid: string
        user_uuid: string
        category_uuid: string
        name: string
        prewiew: string
        contents: {
            type: string
            content: string
        }[]
        state: number
    },
    photos: {
        photo_uuid: string
        project_uuid: string
        src: string
        type: number
    }[]
    descriptions: {
        uuid: string
        project_uuid: string
        value: string
    }
}