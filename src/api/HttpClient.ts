import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"


const getToken = async () => {
    try {
        let token = await AsyncStorage.getItem('userToken');
        token = JSON.parse(token ?? "")
        return token;
    } catch (error) {
        console.error("Token alınamadı:", error);
        return null;
    }
};




const httpClient = axios.create({
    baseURL: "http://192.168.1.77:5000"
})

httpClient.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log("errrr ==>", error)
        return Promise.reject(error);
    }
);

export {
    httpClient
}