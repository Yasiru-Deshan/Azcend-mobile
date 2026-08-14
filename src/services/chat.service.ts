import { apiRequest } from './api';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export async function fetchConversationApi(token: string, otherUserId: string, page = 1, limit = 50) {
  return apiRequest<ChatMessage[]>(`/chat/conversation/${otherUserId}?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}
