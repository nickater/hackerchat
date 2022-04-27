import inquirer from 'inquirer';
import { findChat, initializeChat } from '../../services/chat-service';
import { CoreProvider } from '../../services/state/CoreProvider';
import { searchForUserByEmail } from '../../services/user-service';
import { ViewResponse, ViewResponseType } from '../types';
import { handleError } from '../../utils/error-handler';
import { color } from '../../utils/colors';
import { MappedChatType } from './chat-menu';
import { getRecipientEmail, getTryAgainResponse } from '../../utils/questions';

export const newChatView = async (): Promise<
	ViewResponse<MappedChatType | void>
> => {
	const senderId = CoreProvider.instance.userId;
	const senderEmail = CoreProvider.instance.userEmail;
	let askForEmail = true;
	let recipientId;
	let recipientEmail;
	while (askForEmail) {
		try {
			const { email } = await getRecipientEmail();
			recipientEmail = email;

			const { userId: id } = await searchForUserByEmail(
				recipientEmail
			);
			recipientId = id;
			if (recipientId) {
				askForEmail = false;
			}
		} catch (error) {
			handleError(error);
			const { isConfirmed } = await getTryAgainResponse();
			if (!isConfirmed) {
				return new ViewResponse(ViewResponseType.FAIL);
			}
		}
	}
	askForEmail = true;

	try {
		if(!recipientId) throw new Error('No recipient ID');
		color.casual('User found!');

		const chatId = await findChat({ senderId, recipientId });
		if (chatId) {
			throw new Error('Chat already exists. Navigate to existing chats.');
		}

		const { content } = await inquirer.prompt([
			{
				name: 'content',
				message: 'Message:',
				type: 'input'
			}
		]);

		const newChatId = await initializeChat({ senderId, recipientId, content });
		const mappedChat: MappedChatType = {
			id: newChatId,
			loggedInUser: {
				userId: senderId,
				email: senderEmail,
			},
			otherUser: {
				userId: recipientId,
				email: recipientEmail
			}
		};
		const response = new ViewResponse(ViewResponseType.SUCCESS, mappedChat);
		return response;
	} catch (error) {
		handleError(error);
		const response = new ViewResponse(ViewResponseType.FAIL);
		return response;
	}
};
