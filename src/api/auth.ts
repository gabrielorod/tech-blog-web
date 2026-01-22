import axios from 'axios';
import { api } from './api';

interface LoginResponse {
  access_token: string;
}

export const authLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao realizar login';
      throw new Error(errorMessage);
    }

    throw new Error('Ocorreu um erro inesperado. Tente novamente.');
  }
};
