import { Sequelize } from 'sequelize';
import * as mariadb from 'mariadb';

export class SequlizeFactory {
  private static instance: SequlizeFactory;
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

  public static getInstance(): SequlizeFactory {
    if (!SequlizeFactory.instance) {
      SequlizeFactory.instance = new SequlizeFactory();
    }
    return SequlizeFactory.instance;
  }
}
