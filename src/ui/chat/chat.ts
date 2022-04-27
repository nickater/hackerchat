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
	blankLine;
};

const formatChat = (
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

	if (message.senderId === mappedChat.loggedInUser.userId) {
		formattedMessage =
			chalk.red(mappedChat.loggedInUser.email.padEnd(longestEmailLength)) +
			' ' +
			chalk.blue(formattedDate.padEnd(dateTimeLength)) +
			' ' +
			chalk.blueBright(message.content);
	} else {
		formattedMessage =
			chalk.cyan(mappedChat.otherUser.email.padEnd(longestEmailLength)) +
			' ' +
			chalk.green(formattedDate.padEnd(dateTimeLength)) +
			' ' +
			chalk.yellow(message.content);
	}
	return formattedMessage;
};

export const chatView = async (mappedChat: MappedChatType) => {
	let stillChatting = true;
	const senderId = CoreProvider.instance.userId;
	const unsub = onSnapshot(chatDocRefWithConverter(mappedChat.id), (doc) => {
		if(doc.exists()) {
			clear();
			chatHeader(mappedChat.otherUser.email);
			for (const d of doc.data().messages) {
				print(
					formatChat(d, mappedChat)
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
	return unsub();
};
