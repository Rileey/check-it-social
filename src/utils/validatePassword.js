const validatePassword = (password) => {
    const passLength = password.length >=7
    const passChar = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)
    return passLength && passChar 
}

export default validatePassword