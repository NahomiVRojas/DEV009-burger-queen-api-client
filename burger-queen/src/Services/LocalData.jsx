export const saveData = (token, role) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    console.log('ESE ES EL TOKEN:', token)
}
