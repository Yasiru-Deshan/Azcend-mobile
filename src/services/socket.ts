import { io, Socket } from 'socket.io-client';

let rawUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
if (!/^https?:\/\//i.test(rawUrl)) {
  rawUrl = `https://${rawUrl}`;
}
const BASE_URL = rawUrl.replace(/\/$/, '');

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
  if (socket?.connected) return socket;

  socket = io(`${BASE_URL}/chat`, {
    transports: ['websocket'],
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
