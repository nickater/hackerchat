import clear from 'clear';
import inquirer, { ListQuestion, Separator } from 'inquirer';
import { ViewResponseType } from '../types';
import { print } from '../../utils/log';
import { existingChatsView } from './existing-chats';
import { newChatView } from './new-chat';
import { chatView } from './chat';

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

export const chatMenuView = async () => {
  let chat;
  clear();
  const { destination } = await inquirer.prompt<{ destination: string }>([chatMenuList()]);
  switch (destination) {
    case 'new': {
      const newChatResponse = await newChatView();
      if (newChatResponse.responseType === ViewResponseType.SUCCESS) {
        chat = newChatResponse.data;
      }
      break;
    }
    case 'existing': {
      const existingChatResponse = await existingChatsView();
      if (existingChatResponse.responseType === ViewResponseType.SUCCESS) {
        chat = existingChatResponse.data;
      }
      break;
    }
    case 'go back':
      break;
    default:
      break;
  }
  if (chat) {
    await chatView(chat.chatId, chat.recipient);
  }
};
