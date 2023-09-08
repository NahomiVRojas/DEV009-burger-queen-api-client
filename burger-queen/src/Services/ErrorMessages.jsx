export const errorMessages = (message) => {
    return message.status === 200
        ? "User created successfully"
        : message.status === 400
        ? "Invalid credentials"
        : message.status === 401
        ? "Unauthorized access"
        : message.status === 403
        ? "Forbidden access"
        : message.status === 404
        ? "User not found"
        : "An error occurred";
}
