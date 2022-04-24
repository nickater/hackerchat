import { createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthCredentials } from './types';
import { app } from '../../firebase';
import { initializeUser } from '../db';

const auth = initializeAuth(app);

export const registerUser = async ({ email, password }: AuthCredentials) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await initializeUser(user.uid, email);
};

export const authenticateUser = async ({ email, password }: AuthCredentials) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
