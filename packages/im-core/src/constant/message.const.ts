export enum MessageStatus {
  deleted = -1,
  sending = 1,
  sent = 2,
  sendFail = 3,
  awaitSend = 4,
  unread = 5,
  read = 6,
  ACKRead = 7,
}

export enum MessageType {
  TextMessage = 1,
  ImgMessage = 2,
  AudioMessage = 3,
  VideoMessage = 4,
  AttachmentMessage = 5,
  RedBonusMessage = 6,
  CoinMessage = 7,
  RTCMessage = 8,
  MiniProgramMessage = 9,
  MomentShareMessage = 10,
  TransactionMessage = 11,
  RedBonusResultMessage = 12,
  LocationMessage = 13,
  MeetingMessage = 14,
  MeetingMessageV2 = 17,
  AtMessage = 15,
  DeleteSession = 16,
  UidText = 18,
  CardMessage = 19,
  UidTextA = 20,
  Notification = 21,
  Custom = 22,
  CardMessage_V2 = 23,
  AutoReplay = 24,
  RichText = 25,
  MassMessage = 26,
  BusinessCard = 27,
  EditMessage = 80,
  DeleteFlagMessage = 81,
  ACKReadMessage = 82, //Read report

  _LocalTempTipMsg = 444444,
}

export interface FiveElement {
  //TODO: 需要其他字段
  objectId: string
}

export interface MessageContentMap {
  [MessageType.TextMessage]: { text: string }
  [MessageType.ImgMessage]: FiveElement
  [MessageType.AudioMessage]: FiveElement
  [MessageType.VideoMessage]: FiveElement
}
