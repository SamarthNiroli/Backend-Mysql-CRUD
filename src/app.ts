import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes"

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

sequelize.sync().then(() =>{
    console.log("Database & Tables Created!");
});

export default app;




