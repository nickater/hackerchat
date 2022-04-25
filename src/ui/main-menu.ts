import clear from 'clear';
import inquirer, { ListQuestion } from 'inquirer';
import { CoreProvider } from '../services/state/CoreProvider';
import { getId } from '../utils/hackerchatrc';
import { chatMenuView } from './chat/chat-menu';
import { loginView } from './login';
import { registerView } from './register';
import { settingsView } from './settings';
import { ViewResponseType } from './types';

const choiceManager = () => {
  const { isLoggedIn } = CoreProvider.instance;
  const choices: string[] = [];
  if (isLoggedIn) choices.push('chat');
  if (!isLoggedIn) choices.push('login');
  if (!isLoggedIn) choices.push('register');
  choices.push('settings');
  if (isLoggedIn) choices.push('logout');
  choices.push('exit');
  return choices;
};

const mainMenuList = (): ListQuestion => ({
  name: 'destination',
  type: 'list',
  message: 'Main Menu',
  choices: choiceManager(),
});

const attemptAutoLogin = async () => {
  try {
    const userId = await getId();
    if (userId) {
      CoreProvider.instance.setUserId(userId);
    }
  } catch {}
};

const exit = () => {
  const coreProvider = CoreProvider.instance;
  coreProvider.quitApp();
};

const logout = () => {
  exit();
};

export const mainMenu = async () => {
  await attemptAutoLogin();
  clear();
  const { destination } = await inquirer.prompt<{ destination: string }>([mainMenuList()]);
  switch (destination) {
    case 'chat':
      await chatMenuView();
      break;
    case 'login': {
      let loginSuccessful = false;
      while (!loginSuccessful) {
        const loginResponse = await loginView();
        loginSuccessful = loginResponse.responseType === ViewResponseType.SUCCESS;
      }
      break;
    }
    case 'register':
      await registerView();
      break;
    case 'settings':
      await settingsView();
      break;
    case 'logout':
      logout();
      break;
    case 'exit':
      exit();
      break;
    default:
      break;
  }
};
