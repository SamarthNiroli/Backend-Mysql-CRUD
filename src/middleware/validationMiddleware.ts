import { body } from "express-validator";

export const validateUser = [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("password").optional().isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
];
