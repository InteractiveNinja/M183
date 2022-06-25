enum LOGLEVELS {
  WARN,
  INFO,
  ERROR,
}
export class Logger {
  private constructor() {}

  public static log(msg: string) {
    this.logging(LOGLEVELS.INFO, msg);
  }
  public static warn(msg: string) {
    this.logging(LOGLEVELS.WARN, msg);
  }

  private static logging(logLevel: LOGLEVELS, msg: string) {
    console.log(`[${LOGLEVELS[logLevel]}] ${msg}`);
  }
}
