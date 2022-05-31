enum LOGLEVELS {
  WARN,
  INFO,
  ERROR,
}
export class Logger {
  private static instance: Logger;
  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Logger();
    }

    return this.instance;
  }

  public log(msg: string) {
    this.logging(LOGLEVELS.INFO, msg);
  }
  public warn(msg: string) {
    this.logging(LOGLEVELS.WARN, msg);
  }

  private logging(logLevel: LOGLEVELS, msg: string) {
    console.log(`[${logLevel.toString()}] ${msg}`);
  }
}
