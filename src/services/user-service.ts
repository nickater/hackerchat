import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { UserType } from '../types';
import { db } from './db';

export const initializeUser = async ({ userId, email }: UserType): Promise<void> => {
  const newUser = doc(db, `users/${userId}`);
  return await setDoc(newUser, {
    userId,
    email,
  });
};

export const searchForUserByEmail = async (email: string) => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('email', '==', email));
  const result = await getDocs(q);
  if (!result.docs[0]?.exists()) {
    throw new Error('No user found with that email');
  }
  return result.docs[0].data() as UserType;
};

export const searchForUserById = async (id: string) => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('userId', '==', id));
  const result = await getDocs(q);
  if (!result.docs[0]?.exists()) {
    throw new Error('No user found with that id');
  }
  return result.docs[0].data() as UserType;
};
