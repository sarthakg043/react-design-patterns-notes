import axios from "axios";

const getServerData = async (url) => {
    const response = await axios.get(`/api${url}`)
    return response.data;
}

const getUserDataByID = async (userId) => {
    const response = await getServerData(`/users/${userId}`)
    return response;
}

const getUserFromLocalStorage = (userId) => {
    const user = localStorage.getItem(userId);
    return JSON.parse(user);
}

export { getServerData, getUserDataByID, getUserFromLocalStorage }