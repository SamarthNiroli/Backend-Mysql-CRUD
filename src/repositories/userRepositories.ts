import User from "../models/userModel";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/userDTO";

export class UserRepository {
    async create(userData: CreateUserDTO): Promise<User> {
        return await User.create(userData);
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async update(id: number, userData: UpdateUserDTO): Promise<[number]> {
        return await User.update(userData, { where: { id } });
    }

    async delete(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }
}