import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes{
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id">{}

class User extends Model<UserAttributes, UserCreationAttributes> 

implements UserAttributes{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull:false,

        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
    },
    {
        tableName:'users',
        sequelize,
    }
)

export default User;