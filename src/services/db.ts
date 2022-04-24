import { app } from '../firebase';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

export const db = getFirestore(app);

export const initializeUser = async (userId: string, email: string): Promise<void> => {
  const collectionRef = collection(db, 'users');
  const newUser = doc(db, `users/${userId}`);
  return await setDoc(newUser, {
    userId,
    email,
  });
};
