import clear from 'clear';
import inquirer, { ListQuestion, Separator } from 'inquirer';
import { ViewResponseType } from '../types';
import { print } from '../../utils/log';
import { existingChatsView } from './existing-chats';
import { newChatView } from './new-chat';

let shouldStillViewChatMenu = true;

const choiceManager = () => {
  const choices: string[] = [];
  choices.push('new');
  choices.push('existing');
  choices.push('go back');
  return choices;
};

const chatMenuList = (): ListQuestion => ({
  name: 'destination',
  type: 'list',
  message: 'Chat Menu',
  choices: [new inquirer.Separator(), ...choiceManager()],
});

const goBackToMainMenu = () => {
  shouldStillViewChatMenu = false;
};

// should be displayed in a while loop until user leaves
export const chatMenuView = async () => {
  clear();
  while (shouldStillViewChatMenu) {
    const { destination } = await inquirer.prompt<{ destination: string }>([chatMenuList()]);
    switch (destination) {
      case 'new': {
        const newChatResponse = await newChatView();
        if (newChatResponse.responseType === ViewResponseType.SUCCESS) {
          print('Navigate to chat window with', newChatResponse.data);
        }
        break;
      }
      case 'existing': {
        const existingChatResponse = await existingChatsView();
        if (existingChatResponse.responseType === ViewResponseType.SUCCESS) {
          print('Navigate to chat window with', existingChatResponse.data);
        }
        break;
      }
      case 'go back':
        goBackToMainMenu();
        break;
      default:
        break;
    }
  }
};
