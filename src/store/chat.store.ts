import { create } from 'zustand';
import { fetchConversationApi, type ChatMessage } from '../services/chat.service';
import { connectSocket, disconnectSocket, getSocket } from '../services/socket';
import { useAuthStore } from './auth.store';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isSending: boolean;
  isConnected: boolean;
  error: string | null;

  connectSocket: () => void;
  disconnectSocket: () => void;
  fetchMessages: (coachId: string) => Promise<void>;
  sendMessage: (content: string, receiverId: string) => void;
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  isSending: false,
  isConnected: false,
  error: null,

  connectSocket: () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    const socket = connectSocket(token);

    socket.on('connect', () => {
      set({ isConnected: true, error: null });
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('connect_error', (err) => {
      set({ isConnected: false, error: `Connection failed: ${err.message}` });
    });

    socket.on('receive_message', (message: ChatMessage) => {
      set((state) => {
        const hasOptimistic = state.messages.some(
          (m) => m.id.startsWith('optimistic-') &&
            m.content === message.content &&
            m.senderId === message.senderId
        );
        if (hasOptimistic) {
          return {
            messages: state.messages.map((m) =>
              m.id.startsWith('optimistic-') &&
                m.content === message.content &&
                m.senderId === message.senderId
                ? message
                : m
            ),
            isSending: false,
          };
        }
        return { messages: [...state.messages, message] };
      });
    });

    socket.on('messages_read', (data: { by: string }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m.receiverId === data.by ? { ...m, isRead: true } : m
        ),
      }));
    });

    socket.on('user_status', (data: { userId: string; isOnline: boolean }) => {
      const coach = useAuthStore.getState().coach;
      if (coach && coach.id === data.userId) {
        useAuthStore.setState({
          coach: { ...coach, isOnline: data.isOnline },
        });
      }
    });

    socket.on('error', (err: { message: string }) => {
      set((state) => ({
        messages: state.messages.filter((m) => !m.id.startsWith('optimistic-')),
        isSending: false,
        error: err.message,
      }));
    });
  },

  disconnectSocket: () => {
    disconnectSocket();
    set({ isConnected: false });
  },

  fetchMessages: async (coachId: string) => {
    const token = useAuthStore.getState().token;
    if (!token || !coachId) return;

    set({ isLoading: true, error: null });
    const response = await fetchConversationApi(token, coachId);

    if (response.data?.data && Array.isArray(response.data.data)) {
      set({ messages: response.data.data, isLoading: false });
    } else {
      set({ isLoading: false, error: response.error || 'Failed to load messages' });
    }
  },

  sendMessage: (content: string, receiverId: string) => {
    if (!content.trim() || !receiverId) return;

    const socket = getSocket();
    if (!socket?.connected) {
      set({ error: 'Not connected to chat. Please wait...' });
      return;
    }

    const currentUserId = useAuthStore.getState().user?.id ?? '';

    const optimisticMessage: ChatMessage = {
      id: `optimistic-${Date.now()}`,
      senderId: currentUserId,
      receiverId,
      content: content.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, optimisticMessage],
      isSending: true,
    }));

    socket.emit('send_message', { receiverId, content: content.trim() });
  },

  clearError: () => set({ error: null }),
}));
