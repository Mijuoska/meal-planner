const extractToken = () => {
    let user = JSON.parse(window.localStorage.getItem('loggedInUser')) 
    const token = user ? user.token : null
    return token
}

const createAuthHeader = () => {
    return { headers:  {
        authorization: 'bearer ' + extractToken()
    }
}
}

export default { extractToken, createAuthHeader }

