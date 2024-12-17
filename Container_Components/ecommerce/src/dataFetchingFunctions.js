import axios from "axios";

const getServerData = async (url) => {
    const response = await axios.get(`/api${url}`)
    return response.data;
}

const getUserDataByID = async (userId) => {
    const response = await getServerData(`/users/${userId}`)
    return response;
}

export { getServerData, getUserDataByID }