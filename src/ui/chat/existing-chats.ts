import inquirer, { ListQuestion } from 'inquirer';
import { getAllChatsForUser } from '../../services/chat-service';
import { CoreProvider } from '../../services/state/CoreProvider';
import { searchForUserById } from '../../services/user-service';
import { handleError } from '../../utils/error-handler';
import { ViewResponse, ViewResponseType } from '../types';
import { ChatTypeWithId, UserType } from '../../types';

interface MappedChatType {
  id: string;
  loggedInUser: UserType;
  otherUser: UserType;
}

const mapChats = async (chats: ChatTypeWithId[]): Promise<MappedChatType[]> => {
  let mappedChats: MappedChatType[] = [];

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
        email: loggedInUserEmail,
      },
      otherUser: {
        userId: otherUserId,
        email: otherUserEmail,
      },
    });
  }
  return mappedChats;
};

export const existingChatsView = async (): Promise<ViewResponse> => {
  try {
    const userId = CoreProvider.instance.userId;
    const chats = await getAllChatsForUser(userId);
    const mappedChats = await mapChats(chats);

    const list: ListQuestion = {
      name: 'chatChoice',
      message: 'Existing Chats',
      choices: [
        new inquirer.Separator(),
        ...mappedChats.map((choice) => ({
          name: choice.otherUser.email,
          short: choice.otherUser.email,
          value: choice.id,
          disabled: false,
        })),
      ],
      type: 'list',
    };
    const { chatChoice } = await inquirer.prompt([list]);

    const response = new ViewResponse(ViewResponseType.SUCCESS, chatChoice);
    return response;
  } catch (error) {
    handleError(error);
    const response = new ViewResponse(ViewResponseType.FAIL);
    return response;
  }
};
