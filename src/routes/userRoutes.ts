import { Router, Request, Response, NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import { validateUser } from "../middleware/validationMiddleware"; 
import { validationResult, param } from "express-validator";

const router = Router();

const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next(); 
    }
};



const validateUUID = param("userId")
    .isUUID()
    .withMessage("Invalid UUID format");

//
router.post("/users", validateUser, handleValidationErrors, createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", validateUUID, handleValidationErrors, getUserById);
router.put("/users/:userId", validateUUID, validateUser, handleValidationErrors, updateUser);
router.delete("/users/:userId", validateUUID, handleValidationErrors, deleteUser);

export default router;
