import axios from 'axios'
import methonds from './methods'

export default class Login {
  jwtConfig = "{ ...jwtDefaultConfig }"

  login(...args) {
    console.log(methonds.login)
    // return axios.post('google.com', ...args)
    // return axios.get('http://172.16.1.46/Raymond/WebApi_Archive/admin/LoginQ3dUsers?UserName=textronicsuser&PasswordHash=1234')
    // return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }
}
