import { createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthCredentials } from './types';
import { app } from '../../firebase';
import { initializeUser } from '../user-service';
import { UserType } from '../../types';

const auth = initializeAuth(app);

export const registerUser = async ({ email, password }: AuthCredentials) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: UserType = { userId: response.user.uid, email };
    await initializeUser(newUser);
    return response;
  } catch {
    throw new Error('Registration unsuccessful. Try again.');
  }
};

export const authenticateUser = async ({ email, password }: AuthCredentials) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch {
    throw new Error('Login unsuccessful. Try again.');
  }
};
