// ** JWT Service Import
import Login from './loginController'

// ** Export Service as useJwt
export default function loginUser() {
  const login = new Login()

  return {
    login
  }
}
