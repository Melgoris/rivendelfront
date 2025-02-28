import axios from 'axios'

const api = axios.create({
  baseURL: 'https://raider.io/api/v1/',
  mode: 'no-cors',
})

const airtableBd = axios.create({
  baseURL: 'https://api.airtable.com/v0/appyEWdPyASTdHUPb/',
  headers: {
    Authorization:
      'Bearer ' +
      'patLcNRbMP9Esgs0J.f5133a76171be2ecdbc0c4204cd19fd22d5525e9804d54288d57703d611c07bb',
  },
})

export const makeRequest = (url, options) => {
  return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? 'Error'))
}

export const airtableRequest = (url, options) => {
  return airtableBd(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? 'Error'))
}
