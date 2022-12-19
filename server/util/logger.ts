import * as winston from "winston";

enum LOGLEVELS {
  WARN = "warn",
  INFO = "info",
  ERROR = "error",
}

export class Logger {

  private static logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: "logs/error.log", level: LOGLEVELS.ERROR }),
      new winston.transports.File({ filename: "logs/combined.log" }),
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });

  public static log(msg: string) {
    this.logger.log(LOGLEVELS.INFO,msg);
  }

  public static warn(msg: string) {
    this.logger.log(LOGLEVELS.WARN, msg);
  }
  public static error(msg: string) {
    this.logger.log(LOGLEVELS.ERROR, msg);
  }
}
