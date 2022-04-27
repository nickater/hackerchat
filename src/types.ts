import { Timestamp } from 'firebase/firestore';

export interface MessageTypeFirestore {
  content: string;
  recipientId: string;
  senderId: string;
  sentDate: Timestamp;
}

export interface ChatType {
  userAId: string;
  userBId: string;
  messages?: MessageTypeFirestore[];
}

export interface ChatTypeWithId extends ChatType {
  id: string;
}

export interface UserType {
  userId: string;
  email: string;
}
