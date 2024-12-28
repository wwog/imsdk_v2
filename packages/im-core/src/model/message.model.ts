import {
  MessageStatus,
  MessageType,
  type MessageContentMap,
} from '../constant/message.const.js'

export class Message<T extends keyof MessageContentMap> {
  content: MessageContentMap[T]
  status: MessageStatus
  type: MessageType

  static fromDB(dbItem: any) {
    const message = new Message<any>()
    message.type = dbItem.type
    message.status = MessageStatus.sent
    message.content = { text: 'Hello, World!' }
  }
}
