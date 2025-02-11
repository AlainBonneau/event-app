import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface EventAttributes {
  id?: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  maxParticipants: number;
  createdBy: number;
}

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: Date;
  public location!: string;
  public category!: string;
  public maxParticipants!: number;
  public createdBy!: number;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "events",
  }
);

export default Event;
