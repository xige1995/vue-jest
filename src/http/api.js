import axios from 'axios'

export const getMockValue = () => {
  return axios.get('/getMockValue')
}
