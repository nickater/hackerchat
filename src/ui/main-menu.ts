import inquirer, { ListQuestion, Question } from 'inquirer';
import Choices from 'inquirer/lib/objects/choices';
import { CoreProvider } from '../services/state/CoreProvider';
import { chatView } from './chat';
import { loginView } from './login';
import { registerView } from './register';
import { settingsView } from './settings';

const choiceManager = () => {
  let choices: string[] = [];
  if (true) choices.push('chat');
  if (true) choices.push('login');
  if (true) choices.push('register');
  if (true) choices.push('settings');
  if (true) choices.push('logout');
  return choices;
};

const mainMenuList: ListQuestion = {
  name: 'destination',
  type: 'list',
  message: 'Main Menu',
  choices: choiceManager(),
};

const exit = () => {
  const coreProvider = CoreProvider.instance;
  coreProvider.quitApp();
};

const logout = () => {
  exit();
};

export const mainMenu = async () => {
  const { destination } = await inquirer.prompt<{ destination: string }>([mainMenuList]);
  switch (destination) {
    case 'chat':
      await chatView();
      break;
    case 'login':
      await loginView();
      break;
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
