let rawUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
if (!/^https?:\/\//i.test(rawUrl)) {
  rawUrl = `https://${rawUrl}`;
}
const API_BASE_URL = rawUrl;

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        error: data?.message || data?.error || 'An error occurred during request',
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (err: any) {
    return {
      error: err?.message || 'Network request failed',
      status: 0,
    };
  }
}
