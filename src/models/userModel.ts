import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { v4 as uuidv4 } from "uuid";

interface UserAttributes {
    id: string; // Change id to string for UUID
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: "users",
        sequelize,
        timestamps: true,
    }
);

export default User;
