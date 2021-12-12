const extractToken = () => {
    let user = JSON.parse(window.localStorage.getItem('loggedInUser')) 
    const token = user ? user.token : null
    return token
}

const createAuthHeader = () => {
    var token = extractToken();
    if (token) {
    return { headers:  {
        authorization: 'bearer ' + extractToken()
    } 
}
    } else {
        return null;
    }
}


export default { extractToken, createAuthHeader }

