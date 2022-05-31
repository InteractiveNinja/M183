import { Sequelize } from 'sequelize';
import * as mariadb from 'mariadb';
import { Logger } from '../../util/logger';

export class SequelizeFactory {
  private static instance: SequelizeFactory;
  private sequelize = new Sequelize('bill', 'root', 'docker', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectModule: mariadb,
  });
  private logger = Logger.getInstance();

  private constructor() {
    this.sequelize
      .authenticate()
      .then(() => {
        this.logger.log('Verbindung mit der Datenbank aufgebaut!');
        this.syncModels();
      })
      .catch((e) => {
        throw new Error(
          `Verbindung mit der Datenbank konnte nicht aufgebaut werden, ${e}`
        );
      });
  }

  private syncModels() {
    this.sequelize
      .sync()
      .then(() => {
        this.logger.log('Modelle mit der Datenbank gesynced');
      })
      .catch(() => {
        this.logger.log('Modelle mit der Datenbank konnten nicht gesynced');
      });
  }

  public static getInstance(): SequelizeFactory {
    if (!SequelizeFactory.instance) {
      SequelizeFactory.instance = new SequelizeFactory();
    }
    return SequelizeFactory.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}
