export class Message {
  constructor(readonly senderId: string, readonly recipientId: string, readonly content: string, readonly sentDate: Date) {}
}