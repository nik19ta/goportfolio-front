import { LoginBody, RegistrationBody } from "../../interfaces/auth"

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export const fetchLogin = async (body: LoginBody) => {
    const data = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/auth/sign-in`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    })

    return data
}

export const fetchRegistration = async (body: RegistrationBody) => {
    const data = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/auth/sign-up`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    })

    return data
}
