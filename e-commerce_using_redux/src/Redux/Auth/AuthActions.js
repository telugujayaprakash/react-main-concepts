export const signin = (name, email, password) => {
  const userdata = { name, email, password }
  return { type: 'Signin', payload: userdata }
}
export const login = (email, password) => {
  const userdata = { email, password }
  return { type: 'login', payload: userdata }
}
export const logout = () => {
  return { type: 'logout' }
}
