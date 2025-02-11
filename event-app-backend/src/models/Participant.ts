import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ParticipantAttributes {
  id?: number;
  userId: number;
  eventId: number;
}

class Participant
  extends Model<ParticipantAttributes>
  implements ParticipantAttributes
{
  public id!: number;
  public userId!: number;
  public eventId!: number;
}

Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "events", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "participants",
  }
);

export default Participant;
