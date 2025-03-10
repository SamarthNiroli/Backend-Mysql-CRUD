import { UserResponseDTO } from "../dtos/userDTO";
import User from "../models/userModel";

export const mapToUserResponse = (user: User): UserResponseDTO => {
    return {
        id: user.id as string, 
        name: user.name,
        email: user.email,
    };
};
