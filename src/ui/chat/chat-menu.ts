import inquirer, { ListQuestion } from 'inquirer';
import { ViewResponseType } from '../types';
import { existingChatsView } from './existing-chats';
import { newChatView } from './new-chat';
import { chatView } from './chat';
import { UserType } from '../../types';
import clear from 'clear';

export interface MappedChatType {
  id: string;
  loggedInUser: UserType;
  otherUser: UserType;
}

const choiceManager = () => {
	const choices: (string | inquirer.SeparatorOptions)[] = [];
	choices.push('new');
	choices.push('existing');
	choices.push('go back');
	return choices;
};

const chatMenuList = (): ListQuestion => ({
	name: 'destination',
	type: 'list',
	message: 'Chat Menu',
	choices: [new inquirer.Separator(), ...choiceManager()]
});

export const chatMenuView = async () => {
	let keepViewing = true;

	while (keepViewing) {
		let chat;
		clear();
		const { destination } = await inquirer.prompt<{ destination: string }>([
			chatMenuList()
		]);
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
				keepViewing = false;
				break;
			default:
				break;
		}
		if (chat) {
			await chatView(chat);
		}
	}
	keepViewing = true;
};
