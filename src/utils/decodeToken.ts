import jwt from 'jwt-decode'

export interface DecodedData {
  id: string
  mail: string
  shortname: string
}

export const decode = (token: string): DecodedData => {
  return jwt(token);
}
