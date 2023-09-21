export const saveData = (token, role, name) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('name', name)
}

export const removeData = (token, role, name) => {
    localStorage.removeItem('token', token)
    localStorage.removeItem('role', role)
    localStorage.removeItem('name', name)
}
