
import { LyricRequest, ChatMessage, UserLyric } from '../types';

const STORAGE_KEYS = {
  REQUESTS: 'l4u_requests',
  CHAT: 'l4u_chat',
  LIBRARY: 'l4u_library'
};

export const mockDb = {
  getRequests: (): LyricRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  },
  addRequest: (request: Omit<LyricRequest, 'id' | 'createdAt' | 'status'>) => {
    const current = mockDb.getRequests();
    const newRequest: LyricRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      status: 'pending'
    };
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([newRequest, ...current]));
    return newRequest;
  },
  updateRequestStatus: (id: string, status: LyricRequest['status']) => {
    const current = mockDb.getRequests();
    const updated = current.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
  },
  
  // Library Logic
  getLibraryByEmail: (email: string): UserLyric[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LIBRARY);
    const library: UserLyric[] = data ? JSON.parse(data) : [];
    return library.filter(item => item.userEmail === email);
  },
  saveToLibrary: (lyric: Omit<UserLyric, 'id' | 'timestamp'>) => {
    const data = localStorage.getItem(STORAGE_KEYS.LIBRARY);
    const current: UserLyric[] = data ? JSON.parse(data) : [];
    const newItem: UserLyric = {
      ...lyric,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify([newItem, ...current]));
    return newItem;
  },

  getChat: (): ChatMessage[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT);
    return data ? JSON.parse(data) : [];
  },
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const current = mockDb.getChat();
    const newMessage: ChatMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify([...current, newMessage]));
    return newMessage;
  },
  clearChat: () => localStorage.removeItem(STORAGE_KEYS.CHAT)
};
