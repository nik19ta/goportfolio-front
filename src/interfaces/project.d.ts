export interface CreateProjectResp {
    project: string
}

export interface DeleteProjectResp {
    deleted: string
}

export interface RenameProjectResp {
    statue: string
    title: string
    uuid: string
}

export interface ChangePrewiewProject {
    upload: string
}

export interface ProjectState {
    load_create_project: boolean
    load_delete_project: boolean
}

export interface SetStateProject {
    project: string
    state: number
}

export interface RespCreateCategory {
    created: string
}

export interface RespGetProjectById {
  project: {
    uuid: string
    user_uuid: string
    category_uuid: string
    name: string
    prewiew: string
    contents: string
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
  }[]
}
