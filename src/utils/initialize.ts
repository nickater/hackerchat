import { CoreProvider } from '../services/state/CoreProvider';
import { getEmail, getId, getRememberMe, saveRememberMe } from './persistence';

export const initialStateHandler = async () => {
  await setRememberMe();
  setUserId();
  setEmail();
};

const setRememberMe = async () => {
  try {
    const rememberMe = getRememberMe();
    CoreProvider.instance.setRememberMe(rememberMe);
  } catch {
    saveRememberMe(CoreProvider.instance.shouldRememberMe);
  }
};

const setEmail = () => {
  try {
    const email = getEmail();
    CoreProvider.instance.setUserEmail(email);
  } catch {}
};

const setUserId = () => {
  try {
    const userId = getId();
    CoreProvider.instance.setUserId(userId);
  } catch {}
};