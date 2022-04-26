import inquirer, { ListQuestion } from 'inquirer';
import { getAllChatsForUser } from '../../services/chat-service';
import { CoreProvider } from '../../services/state/CoreProvider';
import { searchForUserById } from '../../services/user-service';
import { handleError } from '../../utils/error-handler';
import { ViewResponse, ViewResponseType } from '../types';
import { ChatTypeWithId, UserType } from '../../types';
import { goBackChoice } from '../../utils/questions';
import { clear } from 'console';
import { line, waitWithDone } from '../../utils/general';

interface MappedChatType {
  id: string;
  loggedInUser: UserType;
  otherUser: UserType;
}

const mapChats = async (chats: ChatTypeWithId[]): Promise<MappedChatType[]> => {
	const mappedChats: MappedChatType[] = [];

	for (const chat of chats) {
		let loggedInUserId;
		let otherUserId;
		if (chat.userAId === CoreProvider.instance.userId) {
			loggedInUserId = chat.userAId;
			otherUserId = chat.userBId;
		} else {
			loggedInUserId = chat.userBId;
			otherUserId = chat.userAId;
		}
		const loggedInUserEmail = (await searchForUserById(loggedInUserId)).email;
		const otherUserEmail = (await searchForUserById(otherUserId)).email;

		mappedChats.push({
			id: chat.id,
			loggedInUser: {
				userId: loggedInUserId,
				email: loggedInUserEmail
			},
			otherUser: {
				userId: otherUserId,
				email: otherUserEmail
			}
		});
	}
	return mappedChats;
};

export const existingChatsView = async (): Promise<
  ViewResponse<{ chatId: string; recipient: UserType } | void>
> => {
	try {
		const userId = CoreProvider.instance.userId;
		const chats = await getAllChatsForUser(userId);
		if (chats.length === 0)
			throw new Error('No existing chats. Start a new one, ya dingus!');
		const mappedChats = await mapChats(chats);

		const list: ListQuestion = {
			name: 'chat',
			message: 'Existing Chats',
			choices: [
				line,
				...mappedChats.map((choice) => ({
					name: choice.otherUser.email,
					short: choice.otherUser.email,
					value: { chatId: choice.id, recipient: choice.otherUser },
					disabled: false
				})),
				goBackChoice
			],
			type: 'list'
		};
		const { chat } = await inquirer.prompt([list]);
		if (chat === goBackChoice) {
			clear();
			return new ViewResponse(ViewResponseType.SUCCESS);
		}
		const response = new ViewResponse(ViewResponseType.SUCCESS, chat);
		return response;
	} catch (error) {
		handleError(error);
		await waitWithDone();
		const response = new ViewResponse(ViewResponseType.FAIL);
		return response;
	}
};
