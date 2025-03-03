import {Router} from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers";

const router = Router();

router.get("/getall", getAllUsers);
router.get("/get/:id", getUserById);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);


export default router;