import axios from "axios";
import https from 'https';
import { useRouter } from "next/navigation";

const api = axios.create({
    baseURL: process.env.API,
});

export const authInterceptor = api.interceptors.request.use(config => {
    config.withCredentials = true;
    config.httpsAgent = new https.Agent({
        rejectUnauthorized: false  // Allows proceeding even if SSL cert is invalid
    });
    return config;
});

export const responseInterceptor = api.interceptors.response.use(
    response => response,
    error => {
        const { push } = useRouter();
        const status = error.response ? error.response.status : null;
        
        if (status === 401) {
            // Handle unauthorized access
            console.log("Unauthorized access");
			push('/login');
        } else if (status === 404) {
            // Handle not found errors
            console.log("Endpoint not found");
        } else {
            // Handle other errors
            console.error("An error occurred:", error);
        }
        
        return Promise.reject(error);
    }
);

export default api;