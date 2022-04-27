import { Message } from './Message';

export class Chat {
  constructor(readonly id: string, readonly userAId: string, readonly userBId: string, readonly messages: Message[]) { }
}