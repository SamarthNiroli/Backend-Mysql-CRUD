import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { confirmationEmail } from "../services/emailService";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        await confirmationEmail(user.email, user.name);
        res.status(201).json({ message: "User created successfully. Confirmation email sent.", user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }

        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by ID", error });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }

        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await userService.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }

        const userData = req.body;
        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const updatedUser = await userService.updateUser(userId, userData);
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
