import { UserRepository } from "../repositories/userRepositories";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/userDTO";
import { mapToUserResponse } from "../mappers/userMapper";
import { confirmationEmail } from "./emailService";

export class UserService {
    private userRepository = new UserRepository();

    async createUser(userData: CreateUserDTO) {
        const user = await this.userRepository.create(userData);

        try {
            await confirmationEmail(user.email, user.name);
        } catch (error) {
            console.log("Failed to send confirmation email:", error);
        }
        return mapToUserResponse(user);
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users.map(mapToUserResponse);
    }

    async getUserById(id: string) { 
        const user = await this.userRepository.findById(id);
        return user ? mapToUserResponse(user) : null;
    }

    async updateUser(id: string, userData: UpdateUserDTO) {
        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete(id);
    }
}
