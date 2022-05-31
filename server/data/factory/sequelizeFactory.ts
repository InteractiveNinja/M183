import { Sequelize } from 'sequelize';
import * as mariadb from 'mariadb';

export class SequelizeFactory {
  private static instance: SequelizeFactory;
  private sequelize = new Sequelize('bill', 'root', 'docker', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectModule: mariadb,
  });

  private constructor() {
    this.sequelize
      .authenticate()
      .then(() => console.log('Connection aufgebaut'))
      .catch((e) => {
        throw new Error(
          `Verbindung mit der Datenbank konnte nicht aufgebaut werden, ${e}`
        );
      });
  }

  public static getInstance(): SequelizeFactory {
    if (!SequelizeFactory.instance) {
      SequelizeFactory.instance = new SequelizeFactory();
    }
    return SequelizeFactory.instance;
  }
}
