
import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log("Database is synced! Tables are created or updated if necessary.");
}).catch((error) => {
    console.error("Error syncing database:", error);
});

export default app;
