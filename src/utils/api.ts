import axios from 'axios'

import Storage from './storage'

export const client = () => {
  const token = Storage.get('api_token')

  const headers: {[key: string]: string} = {
    "content-type": "application/json",
    "Accept": "application/json"
  }
  if (!!token) headers['Authorization'] = `Bearer ${token}`

  return axios.create({ headers })
}