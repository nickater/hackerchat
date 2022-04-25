export interface MessageType {
  content: string;
  recipientId: string;
  senderId: string;
  sentDate: Date;
}

export interface ChatType {
  userAId: string;
  userBId: string;
  messages?: MessageType[];
}

export interface ChatTypeWithId extends ChatType {
  id: string;
}

export interface UserType {
  userId: string;
  email: string;
}
