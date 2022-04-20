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

export interface ProjectState {
    load_create_project: boolean
    load_delete_project: boolean
}