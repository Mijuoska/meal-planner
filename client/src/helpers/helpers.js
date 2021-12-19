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


const shortenString = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...'
    } else {
        return str;
    }
}

const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout)
        let context = this;
        timeout = setTimeout(() => {
            callback.apply(context, args)
        }, wait);

    }

}

export default { extractToken, createAuthHeader, shortenString, debounce }

