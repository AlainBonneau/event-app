import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import participantRoutes from "./routes/ParticipantRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

const allowedOrigins = ["https://event-app-frontend-sand.vercel.app"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Accès non autorisé par CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Permet l'envoi des cookies et tokens d'authentification
//   })
// );

app.use(cors());

app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie !");

    await sequelize.sync({ alter: true }); // ⚠️ { force: true } en dev efface toutes les données !

    app.listen(port, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/participants", participantRoutes);

startServer();
