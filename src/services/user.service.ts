import { apiRequest } from './api';

export async function fetchUserProfileApi(token: string) {
  return apiRequest('/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
