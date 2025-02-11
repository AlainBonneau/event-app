import User from "./User";
import Event from "./Event";
import Participant from "./Participant";

User.hasMany(Event, { foreignKey: "createdBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });

User.belongsToMany(Event, { through: Participant, foreignKey: "userId" });
Event.belongsToMany(User, { through: Participant, foreignKey: "eventId" });

export { User, Event, Participant };
