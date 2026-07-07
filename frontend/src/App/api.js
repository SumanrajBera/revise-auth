import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 409 &&
            !originalRequest._retry &&
            originalRequest.url !== "/api/auth/me"
        ) {
            originalRequest._retry = true;

            try {
                await api.get("/api/auth/refresh-token");
                return api(originalRequest);
            } catch (err) {
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error)
    }
)

export default api;