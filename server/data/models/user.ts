import { compareSync, hashSync } from 'bcryptjs';
import { DataTypes, Model, SaveOptions } from 'sequelize';
import { SequelizeFactory } from '../factory/sequelizeFactory';

const sequelize = SequelizeFactory.getInstance().getSequelize();

export class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare firstname: string;
  declare lastname: string;
  declare gender: string;
  declare address: string;
  declare city: string;
  declare job: string;
  declare admin: boolean;
  declare version: number;

  override save(options?: SaveOptions<any>): Promise<this> {
    this.encryptPassword();
    return super.save(options);
  }

  private encryptPassword(): void {
    const hashedPassword = hashSync(this.password, 10);
    this.password = hashedPassword;
  }

  public checkPassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    version: true,
  }
);
