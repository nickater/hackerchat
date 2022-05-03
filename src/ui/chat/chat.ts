import chalk from 'chalk';
import clear from 'clear';
import { onSnapshot } from 'firebase/firestore';
import inquirer from 'inquirer';
import { Message } from '../../models/Message';
import { chatDocRefWithConverter, sendMessage } from '../../services/chat-service';
import { CoreProvider } from '../../services/state/CoreProvider';
import { isSameDay } from '../../utils/dates';
import { blankLine, longestStringLength } from '../../utils/general';
import { print } from '../../utils/log';
import { MappedChatType } from './chat-menu';

const chatHeader = (otherUser: string) => {
	print(chalk.cyan(otherUser));
	const exitText = chalk.underline.red('"exit()"');
	print(`Type ${exitText} to leave chat`);
	blankLine();
};

const mapMessage = (email: string, date: string, content: string, emailPadding: number, datePadding: number, isLoggedInUser: boolean ) => {
	let mappedMessage = '';
	if(isLoggedInUser) {
				mappedMessage =
			chalk.green(email.padEnd(emailPadding)) + ' ' +
			chalk.gray(date.padEnd(datePadding)) +
			' ' +
			chalk.green(content);
	} else {
		mappedMessage = chalk.cyan(email.padEnd(emailPadding)) + ' ' +
			chalk.gray(date.padEnd(datePadding)) +
			' ' +
			chalk.cyan(content);
	}

			return mappedMessage;
};

const formatMessage = (
	message: Message,
	mappedChat: MappedChatType
): string => {
	let formattedDate = message.sentDate.toDateString();
	const actualDate = message.sentDate;
	if (isSameDay(new Date(), actualDate)) {
		formattedDate = actualDate.toLocaleTimeString();
	}
	let formattedMessage;

	const longestEmailLength = longestStringLength([mappedChat.loggedInUser.email, mappedChat.otherUser.email]);
	const dateTimeLength = formattedDate.length;
	const {loggedInUser, otherUser} = mappedChat;
	if (message.senderId === mappedChat.loggedInUser.userId) {
		formattedMessage = mapMessage(loggedInUser.email, formattedDate, message.content, longestEmailLength, dateTimeLength, true);
	} else {
		formattedMessage = mapMessage(otherUser.email, formattedDate, message.content, longestEmailLength, dateTimeLength, false);
	}
	return formattedMessage;
};

export const chatView = async (mappedChat: MappedChatType) => {
	let stillChatting = true;
	const senderId = CoreProvider.instance.userId;
	const unsubscribe = onSnapshot(chatDocRefWithConverter(mappedChat.id), (doc) => {
		if(doc.exists()) {
			clear();
			chatHeader(mappedChat.otherUser.email);
			for (const d of doc.data().messages) {
				print(
					formatMessage(d, mappedChat)
				);
			}
		}
	});

	while (stillChatting) {
		const { message } = await inquirer.prompt([
			{
				name: 'message',
				message: '->',
				type: 'input',
				validate: (input) => input !== ''
			}
		]);

		if (message === 'exit()') {
			stillChatting = false;
			clear();
		} else {
			await sendMessage({
				senderId,
				recipientId: mappedChat.otherUser.userId,
				content: message,
				chatId: mappedChat.id
			});
		}
	}
	return unsubscribe();
};
