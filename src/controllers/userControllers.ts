import { Request, Response } from "express";
import User from "../models/userModel"; 


export const createUser = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });

         res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.error("Create User Error:", error);
         res.status(500).json({
            message: "An error occurred while creating the user",
            error,
        });
    }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();

        if (!users.length) {
            res.status(404).json({ message: "No users found" });
            return;
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "An error occurred while fetching users", error });
    }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({ message: "An error occurred while fetching the user", error });
    }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req.params.id); 

        if (!userId) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const { name, email, password } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await user.update({ name, email, password });

        res.status(200).json({
            message: "User updated successfully",
            user,
        });

    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({
            message: "An error occurred while updating the user",
            error,
        });
    }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);

        if (!userId) {
             res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findByPk(userId);

        if (!user) {
             res.status(404).json({ message: "User not found" });
             return;
        }

        await user.destroy();

         res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Delete User Error:", error);
         res.status(500).json({
            message: "An error occurred while deleting the user",
            error,
        });
    }
};
