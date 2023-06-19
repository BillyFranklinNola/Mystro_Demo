export const setHeaders = (token) => {
    const headers = {
        headers: {
        "x-auth-token": token
    }
    };
    console.log(headers);
    return headers;
    };