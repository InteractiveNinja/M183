import { DataTypes, Model } from 'sequelize';
import { SequelizeFactory } from '../factory/sequelizeFactory';

const sequelize = SequelizeFactory.getInstance().getSequelize();

export class Bill extends Model {
  declare id: number;
  declare amount: number;
  declare deadline: Date;
}

Bill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Bill', // We need to choose the model name
  }
);
