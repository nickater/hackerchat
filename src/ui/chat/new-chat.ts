import inquirer from 'inquirer';
import { findChat, initializeChat } from '../../services/chat-service';
import { CoreProvider } from '../../services/state/CoreProvider';
import { searchForUserByEmail } from '../../services/user-service';
import { ViewResponse, ViewResponseType } from '../types';
import { handleError } from '../../utils/error-handler';

export const newChatView = async (): Promise<ViewResponse<{ chatId: string; recipientId: string } | void>> => {
  const senderId = CoreProvider.instance.userId;
  try {
    const { newChatRecipientEmail } = await inquirer.prompt([
      {
        name: 'newChatRecipientEmail',
        message: 'Recipient Email: ',
        type: 'input',
      },
    ]);

    const { userId: recipientId } = await searchForUserByEmail(newChatRecipientEmail);
    const chatId = await findChat({ senderId, recipientId }, false);
    if (chatId) {
      throw new Error('Chat already exists. Navigate to existing chats.');
    }

    const { content } = await inquirer.prompt([
      {
        name: 'content',
        message: 'Message:',
        type: 'input',
      },
    ]);
    const newChatId = await initializeChat({ senderId, recipientId, content });
    const response = new ViewResponse(ViewResponseType.SUCCESS, { chatId: newChatId, recipientId });
    return response;
  } catch (error) {
    handleError(error);
    const response = new ViewResponse(ViewResponseType.FAIL);
    return response;
  }
};
