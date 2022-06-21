export interface AuthState {
    token: string
    load: boolean
}

export interface RegistrationBody {
    shortname: string
    mail: string
    password: string
    fullname: string
}

export interface LoginBody {
    mail: string
    password: string
}
