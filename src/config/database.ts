import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: Number(process.env.DB_PORT) || 3306, 
        logging: false,
    }
)

sequelize.authenticate()
    .then(() => console.log("Database connected successfully!"))
    .catch((error) => console.error("Unable to connect to database:", error));

export default sequelize;
