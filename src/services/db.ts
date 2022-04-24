import { app } from '../firebase';
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore';
import { ChatType, UserType } from '../types';

export const db = getFirestore(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const usersCollection = createCollection<UserType>('users');
export const chatsCollection = createCollection<ChatType>('chats');
