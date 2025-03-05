import { Router } from "express";
import { getUsers, getUserById, deleteUser, updatePassword, updateUser} from "./user.controller.js"
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js"

const router = Router()

router.get("/", getUsers)

router.get("/:uid", getUserById, getUserByIdValidator)


router.delete("/:uid", deleteUser, deleteUserValidator)

router.patch("/:uid", updatePassword, updatePasswordValidator)

router.put("/:uid", updateUser, updateUserValidator)

export default router