

const extractToken = () => {
    let user = JSON.parse(window.localStorage.getItem('loggedInUser')) 
    const token = user ? user.token : null
    return token
}

export default { extractToken }

