
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  Timestamp,
  getDocs,
  setDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { LyricRequest, UserLyric, ChatMessage } from '../types';

// Replace with your actual Firebase config from console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const firebaseService = {
  // Requests
  submitRequest: async (request: Omit<LyricRequest, 'id' | 'createdAt' | 'status'>) => {
    return await addDoc(collection(db, 'requests'), {
      ...request,
      email: request.email.toLowerCase(),
      status: 'pending',
      createdAt: Date.now()
    });
  },

  updateRequestStatus: async (requestId: string, status: string) => {
    const requestRef = doc(db, 'requests', requestId);
    return await updateDoc(requestRef, { status });
  },

  // Library
  sendLyricsToUser: async (lyric: Omit<UserLyric, 'id' | 'timestamp'>, requestId: string) => {
    // 1. Save to user_library
    await addDoc(collection(db, 'user_library'), {
      ...lyric,
      userEmail: lyric.userEmail.toLowerCase(),
      timestamp: Date.now()
    });

    // 2. Mark request as completed
    const requestRef = doc(db, 'requests', requestId);
    return await updateDoc(requestRef, { status: 'completed' });
  },

  // Listeners
  listenToRequests: (callback: (requests: LyricRequest[]) => void) => {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LyricRequest));
      callback(requests);
    });
  },

  listenToLibrary: (email: string, callback: (lyrics: UserLyric[]) => void) => {
    const q = query(
      collection(db, 'user_library'), 
      where('userEmail', '==', email.toLowerCase()),
      orderBy('timestamp', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const lyrics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserLyric));
      callback(lyrics);
    });
  },

  // Chat
  listenToChat: (callback: (messages: ChatMessage[]) => void) => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      callback(messages);
    });
  },

  sendMessage: async (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    return await addDoc(collection(db, 'messages'), {
      ...message,
      timestamp: Date.now()
    });
  }
};
