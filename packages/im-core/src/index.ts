export interface IMCoreCreateOptions {}

export class IMCore {
  /**
   * 同一个ak会返回同一个实例
   */
  static create: (opts: IMCoreCreateOptions) => Promise<IMCore>
}
