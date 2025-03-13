"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = exports.Event = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Event_1 = __importDefault(require("./Event"));
exports.Event = Event_1.default;
const Participant_1 = __importDefault(require("./Participant"));
exports.Participant = Participant_1.default;
User_1.default.hasMany(Event_1.default, { foreignKey: "createdBy" });
Event_1.default.belongsTo(User_1.default, { foreignKey: "createdBy" });
User_1.default.belongsToMany(Event_1.default, { through: Participant_1.default, foreignKey: "userId" });
Event_1.default.belongsToMany(User_1.default, { through: Participant_1.default, foreignKey: "eventId" });
