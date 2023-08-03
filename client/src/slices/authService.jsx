import axios from "axios";

const REG_URL = "/api/musicians/register";
const LOGIN_URL = "/api/musicians/login";

const register = async (musicianData) => {
    const response = await axios.post(REG_URL, musicianData);
    if (response.data) {
        localStorage.setItem("musician", JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (musicianData) => {
    const response = await axios.post(LOGIN_URL, musicianData, {withCredentials: true});
    if (response.data) {
        localStorage.setItem("musician", JSON.stringify(response.data));
    }
    console.log(response);
    return response.data;
};

const logout = () => {
    localStorage.removeItem("musician")
}

const authService = {
    register,
    login,
    logout,
}

export default authService;