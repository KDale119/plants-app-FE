import { default as Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosHelper {
    public static get<T = any, R = AxiosResponse<T>>(apiUrl: string): Promise<R> {
        return Axios.get(apiUrl, config());
    }

    public static post<T = any, R = AxiosResponse<T>, D = any>(
        apiUrl: string,
        data?: D,
        requestConfig?: AxiosRequestConfig
    ): Promise<R> {
        return Axios.post(apiUrl, data, config(requestConfig));
    }

    public static put<T = any, R = AxiosResponse<T>, D = any>(
        apiUrl: string,
        data?: D
    ): Promise<R> {
        return Axios.put(apiUrl, data, config());
    }

    public static delete<T = any, R = AxiosResponse<T>>(apiUrl: string): Promise<R> {
        return Axios.delete(apiUrl, config());
    }
}

const config = (requestConfig: AxiosRequestConfig = {}) => {
    requestConfig.baseURL = `http://localhost:8080/api`;
    requestConfig.headers = {"Content-Type": "application/json"}
    return requestConfig;
};

const axios = {
    get: AxiosHelper.get,
    post: AxiosHelper.post,
    put: AxiosHelper.put,
    delete: AxiosHelper.delete,
};

export const axiosCatch = (reason: Error | AxiosError) => {
    if (Axios.isAxiosError(reason)) {
        return Promise.reject({
            name: reason.name,
            message: reason.response?.data,
            code: reason.response?.status
        });
    }

    throw reason;
};

export default axios;