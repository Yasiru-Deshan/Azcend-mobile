import { apiRequest } from './api';

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface AuthResponseData {
  access_token?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  message?: string;
}

export async function loginApi(payload: LoginPayload) {
  return apiRequest<AuthResponseData>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logoutApi(token: string) {
  return apiRequest('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
