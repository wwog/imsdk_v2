/* 
类型文件描述了Promiser包装器的全部，常用API具有完整的类型安全性。
*/

interface Sqlite3WorkerConfig {
  worker?: Worker | (() => Worker);
  onerror?: (...args: any[]) => void;
  debug?: (...args: any[]) => void;
  onready?: (promiserFunc: PromiserFunc) => void;
  onunhandled?: (event: MessageEvent) => void;
  generateMessageId?: (msg: any) => string;
}

interface PromiserMessageArgs {
  dbId?: string;
  callback?: (...args: any[]) => void;
  [index: string]: any;
}

interface PromiserOpenDTO extends PromiserMessageArgs {
  filename?: string;
}

interface PromiserExecDTO extends PromiserMessageArgs {
  sql: string;
  dbId: string;
}

interface PromiserMessageArgsMap {
  open: PromiserOpenDTO;
  exec: PromiserExecDTO;
  "config-get": {};
  export: {};
  close: {};
  toss: {};
}

interface PromiserMessage<T extends PromiserMessageType> {
  type: T;
  args: PromiserMessageArgsMap[T];
}

interface Version {
  libVersion: string;
  libVersionNumber: number;
  sourceId: string;
  downloadVersion: number;
}

interface ConfigGetDTO {
  bigIntEnabled: boolean;
  version: Version;
  vfsList: string[];
}

interface OpenDTO {
  dbId: string;
  filename: string;
  persistent: boolean;
  vfs: string;
}

interface PromiserResultMap {
  "config-get": ConfigGetDTO;
  export: any;
  open: OpenDTO;
  exec: any;
  close: any;
  toss: any;
}

type PromiserMessageType = keyof PromiserResultMap;

interface PromiserMessageResponse<T extends PromiserMessageType> {
  dbId?: string;
  departureTime: number;
  messageId: string;
  result: PromiserResultMap[T];
  type: T;
  workerReceivedTime: number;
  workerRespondTime: number;
}

interface PromiserFunc {
  <T extends PromiserMessageType>(msg: PromiserMessage<T>): Promise<
    PromiserMessageResponse<T>
  >;
  <T extends PromiserMessageType>(
    type: T,
    args: PromiserMessageArgsMap[T]
  ): Promise<PromiserMessageResponse<T>>;
}

interface Sqlite3Worker1Promiser {
  (
    config?: Sqlite3WorkerConfig | ((promiserFunc: PromiserFunc) => void)
  ): PromiserFunc;
  defaultConfig: Sqlite3WorkerConfig;
  v2: (
    config?: Sqlite3WorkerConfig | ((promiserFunc: PromiserFunc) => void)
  ) => Promise<PromiserFunc>;
}

declare module "@sqlite.org/sqlite-wasm" {
  export const sqlite3Worker1Promiser: Sqlite3Worker1Promiser;
}
