import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id?: number;
  email: string;
  lastname: string;
  firstname: string;
  password: string;
  role: "admin" | "organisateur" | "participant";
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public lastname!: string;
  public firstname!: string;
  public password!: string;
  public role!: "admin" | "organisateur" | "participant";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "organisateur", "participant"),
      allowNull: false,
      defaultValue: "participant",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
