import {
	addDoc,
	arrayUnion,
	doc,
	DocumentData,
	getDocs,
	query,
	QueryDocumentSnapshot,
	SnapshotOptions,
	updateDoc,
	where,
	WithFieldValue
} from 'firebase/firestore';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { ChatType, MessageTypeFirestore } from '../types';
import { createCollection, createDocument, db } from './db';

export interface ChatParams {
  senderId: string;
  recipientId: string;
  content: string;
}

export const initializeChat = async ({
	senderId,
	recipientId,
	content
}: ChatParams) => {
	const sentDate = new Date();
	const message = new Message(senderId, recipientId, content, sentDate);
	const result = (await addDoc(chatCollectionRefWithConverter, new Chat('', senderId, recipientId, [message])));

	return result.id;
};

export const sendMessage = async ({
	senderId,
	recipientId,
	content,
	chatId
}: ChatParams & { chatId: string }) => {
	return await updateDoc(doc(db, 'chats', chatId), {
		messages: arrayUnion({
			content,
			recipientId,
			senderId,
			sentDate: new Date()
		})
	});
};

export const getAllChatsForUser = async (
	userId: string
): Promise<Chat[]> => {
	const q1 = query(chatCollectionRefWithConverter, where('userAId', '==', userId));
	const q2 = query(chatCollectionRefWithConverter, where('userBId', '==', userId));

	const [docs1, docs2] = await Promise.all([getDocs(q1), getDocs(q2)]);
	return [...docs1.docs, ...docs2.docs].map((doc) => {
		return {
		id: doc.id,
		userAId: doc.data().userAId,
		userBId: doc.data().userBId,
		messages: doc.data().messages
	};
	});
};

// Find the SINGLE chat that exists between two users
export const findChat = async ({
	senderId,
	recipientId
}: Omit<ChatParams, 'content'>) => {
	const results = await getAllChatsForUser(senderId);

	return results.find(
		(chat) => chat.userAId === recipientId || chat.userBId === recipientId
	);
};

const chatConverter = {
  toFirestore(chat: Chat): DocumentData {
    return {
			userAId: chat.userAId,
			userBId: chat.userBId,
			messages: chat.messages.map((mes) => messageConverter.toFirestore(mes))
		};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<ChatType>,
    options: SnapshotOptions
  ): Chat {
		const id = snapshot.id;
    const {userAId, userBId, messages} = snapshot.data(options);
		const formattedMessages = messages?.map((mes) => ({...mes, sentDate: mes.sentDate.toDate()})) || [];
    return new Chat(id, userAId, userBId, formattedMessages);
  }
};

const messageConverter = {
  toFirestore(message: WithFieldValue<Message>): DocumentData {
    return {
			content: message.content,
			recipientId: message.recipientId,
			senderId: message.senderId,
			sentDate: message.sentDate
		};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<MessageTypeFirestore>,
    options: SnapshotOptions
  ): Message {
    const {content, recipientId, senderId, sentDate} = snapshot.data(options);
		const formattedSentDate = sentDate.toDate();
    return new Message(senderId, recipientId, content, formattedSentDate);
  }
};

export const chatDocRef = (chatId: string) => createDocument<Chat>(`chats/${chatId}`);
export const chatDocRefWithConverter = (chatId: string) => chatDocRef(chatId).withConverter(chatConverter);

export const chatCollectionRef = createCollection<Chat>('chats');
export const chatCollectionRefWithConverter = chatCollectionRef.withConverter(chatConverter);
