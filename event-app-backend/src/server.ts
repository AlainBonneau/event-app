import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

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

startServer();
