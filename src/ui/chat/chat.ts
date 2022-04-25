import clear from 'clear';
import { doc, getDocs, onSnapshot } from 'firebase/firestore';
import inquirer from 'inquirer';
import { sendMessage } from '../../services/chat-service';
import { db, usersCollection } from '../../services/db';
import { CoreProvider } from '../../services/state/CoreProvider';
import { MessageType } from '../../types';
import { print } from '../../utils/log';

export const chatView = async (chatId: string, recipientId: string) => {
  let stillChatting = true;
  const senderId = CoreProvider.instance.userId;
  const unsub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
    clear();
    for (const d of doc.data()!.messages) {
      print(d.content);
    }
  });

  while (stillChatting) {
    const { message } = await inquirer.prompt([
      {
        name: 'message',
        type: 'input',
      },
    ]);

    await sendMessage({
      senderId,
      recipientId,
      content: message,
      chatId,
    });
  }
};
