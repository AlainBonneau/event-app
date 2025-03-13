"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Participant extends sequelize_1.Model {
}
Participant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    eventId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "events", key: "id" },
    },
}, {
    sequelize: database_1.default,
    tableName: "participants",
});
exports.default = Participant;
