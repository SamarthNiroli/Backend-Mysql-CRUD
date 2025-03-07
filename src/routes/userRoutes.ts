import { Router, Request, Response, NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import { validateUser } from "../middleware/validationMiddleware"; 
import { validationResult } from "express-validator";

const router = Router();


const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

// Routes
router.post("/users", validateUser, handleValidationErrors, createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId", validateUser, handleValidationErrors, updateUser);
router.delete("/users/:userId", deleteUser);

export default router;
