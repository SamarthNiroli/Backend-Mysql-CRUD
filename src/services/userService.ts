import { UserRepository } from "../repositories/userRepositories";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/userDTO";
import { mapToUserResponse } from "../mappers/userMapper";
import { confirmationEmail } from "./emailService";

export class UserService {
    private userRepository = new UserRepository();

    async createUser(userData: CreateUserDTO) {
        const user = await this.userRepository.create(userData);

        // return mapToUserResponse(user);

        try {
            await confirmationEmail(user.email, user.name)
        } catch (error) {
            console.log("Failed to send  confirmation email:", error)
        }
        return mapToUserResponse(user); 
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users.map(mapToUserResponse);
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findById(id);
        return user ? mapToUserResponse(user) : null;
    }

    async updateUser(id: number, userData: UpdateUserDTO) {
        return await this.userRepository.update(id, userData);
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }


}
 