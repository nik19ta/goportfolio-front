import {LoginBody, RegistrationBody} from '../../interfaces/auth';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');


export const fetchLogin = async (body: LoginBody) => {
  const url = `${process.env.REACT_APP_SERVER_HOST}/api/auth/sign-in`;

  const data = await fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  });

  return data;
};

export const fetchRegistration = async (body: RegistrationBody) => {
  const url = `${process.env.REACT_APP_SERVER_HOST}/api/auth/sign-up`;

  const data = await fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  });

  return data;
};
