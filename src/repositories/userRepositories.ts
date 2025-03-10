import User from "../models/userModel";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/userDTO";

export class UserRepository {
    async create(userData: CreateUserDTO): Promise<User> {
        return await User.create(userData);
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async findById(id: string): Promise<User | null> { 
        return await User.findByPk(id);
    }

    async update(id: string, userData: UpdateUserDTO): Promise<[number]> { // 
        return await User.update(userData, { where: { id } });
    }

    async delete(id: string): Promise<number> { 
        return await User.destroy({ where: { id } });
    }
}
