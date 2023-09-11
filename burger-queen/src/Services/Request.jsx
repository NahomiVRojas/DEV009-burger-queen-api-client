export const auth = (email, password) => {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
};

export const products = (token) => {
    return fetch('http://localhost:8080/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export const users = (token) => {
    return fetch('http://localhost:8080/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export const deleteProduct = (id, token) => {
    return fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export const editProduct = (id, updatedData, token) => {
    return fetch(`http://localhost:8080/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    });
};

export const addProduct = (data, token) => {
    return fetch(`http://localhost:8080/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data.name,
            type: data.type,
            price: data.price,
            id: data.id,
        })
    });
};

export const addUsers = (data, token) => {
    return fetch(`http://localhost:8080/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            id: data.id,
        })
    });
};

export const deleteUser = (id, token) => {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export const editUser = (id, updatedData, token) => {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    });
};

export const allOrders = (token) => {
    return fetch('http://localhost:8080/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
};

export const postOrder = (data, token) => {
    return fetch(`http://localhost:8080/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
};
