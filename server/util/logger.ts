import * as winston from "winston";

enum LOGLEVELS {
  WARN = "warn",
  INFO = "info",
  ERROR = "error",
}

export class Logger {

  private static logger = winston.createLogger({
    level: LOGLEVELS.INFO,
    format: winston.format.json(),
    //defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
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
