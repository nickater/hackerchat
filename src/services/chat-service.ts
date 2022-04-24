import { addDoc, collection } from 'firebase/firestore';
import { db } from './db';

const chatRef = collection(db, 'chats');

export const initializeChat = async () => {
  const result = await addDoc(chatRef, {
    hackers: ['userA', 'userB'],
  });

  const messagesCollectionRef = collection(db, `chats/${result.id}/messages`);
  const messageResult = await addDoc(messagesCollectionRef, {
    content: 'Hello!',
    recipient: 'userB',
    sender: 'userA',
    sentDate: new Date(),
  });
  console.log(messageResult);
};
