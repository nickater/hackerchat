import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD4jotQL7YkmbApuaDvMOF4fCiPhNUPw3k',
  authDomain: 'hackerchat-159eb.firebaseapp.com',
  projectId: 'hackerchat-159eb',
  storageBucket: 'hackerchat-159eb.appspot.com',
  messagingSenderId: '92347106497',
  appId: '1:92347106497:web:1ae9c8cfc87ef5f2a4c040',
  measurementId: 'G-X7LHLMRV79',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
