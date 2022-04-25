import { addDoc, arrayUnion, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { ChatTypeWithId } from '../types';
import { chatsCollection, db } from './db';

export interface ChatParams {
  senderId: string;
  recipientId: string;
  content: string;
}

export const initializeChat = async ({ senderId, recipientId, content }: ChatParams) => {
  const result = await addDoc(chatsCollection, {
    userAId: senderId,
    userBId: recipientId,
    messages: [
      {
        content,
        recipientId,
        senderId,
        sentDate: new Date(),
      },
    ],
  });

  return result.id;
};

export const sendMessage = async ({ senderId, recipientId, content, chatId }: ChatParams & { chatId: string }) => {
  return await updateDoc(doc(db, 'chats', chatId), {
    messages: arrayUnion({
      content,
      recipientId,
      senderId,
      sentDate: new Date(),
    }),
  });
};

export const getAllChatsForUser = async (userId: string): Promise<ChatTypeWithId[]> => {
  const q1 = query(chatsCollection, where('userAId', '==', userId));
  const q2 = query(chatsCollection, where('userBId', '==', userId));

  const [docs1, docs2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  return [...docs1.docs, ...docs2.docs].map((doc) => ({
    id: doc.id,
    userAId: doc.data().userAId,
    userBId: doc.data().userBId,
  }));
};

// Find the SINGLE chat that exists between two users
export const findChat = async ({ senderId, recipientId }: Omit<ChatParams, 'content'>, canThrowError = true) => {
  const results = await getAllChatsForUser(senderId);

  return results.find((chat) => chat.userAId === recipientId || chat.userBId === recipientId);
};
