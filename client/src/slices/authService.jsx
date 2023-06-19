import axios from "axios";

const API_URL = "http://localhost:8000/api/musicians/register";

const register = async (musicianData) => {
    const response = await axios.post(API_URL, musicianData);
    if (response.data) {
        localStorage.setItem("musician", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("musician")
}

const authService = {
    register,
    logout
}

export default authService;