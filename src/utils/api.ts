import axios, { AxiosError } from 'axios';
import { ApiError } from 'src/models/Api';

const BASE_URL = 'HTTP://localhost:8000/api/v1';

export const useApi = async <TypeDataResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: object,
    withAuth: boolean = true
): Promise<{
    data?: TypeDataResponse,
    detail: string
}> => {
    // Lógica de autenticação

    try {
        const request = await axios({
            method,
            data: method != 'GET' && data,
            params: method == 'GET' && data,
        })

        return {
            data: request.data,
            detail: ''
        }
    } catch (e) {
        const axiosError = e as AxiosError<ApiError>;
        return {
            data: null,
            detail: axiosError.response?.data.details || axiosError.message
        }
    }
}
