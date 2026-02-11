
export type Language = 'Urdu' | 'Hindi' | 'Punjabi' | 'English' | 'Gojri';

export interface LyricRequest {
  id: string;
  songName: string;
  artistName: string;
  language: Language;
  email: string;
  specialRequests: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: number;
}

export interface UserLyric {
  id: string;
  userEmail: string;
  songName: string;
  artistName: string;
  language: string;
  lyrics: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: number;
  userName?: string;
}

export interface User {
  uid: string;
  email: string;
  role: 'user' | 'admin';
  isPremium: boolean;
}

export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  REQUEST = 'request',
  PREMIUM = 'premium',
  MY_LIBRARY = 'my-library',
  ADMIN_LOGIN = 'admin-login',
  ADMIN_DASHBOARD = 'admin-dashboard'
}
