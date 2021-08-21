import { Router } from "express";
import { getUser, postUser, getUsers, putUser, deleteUser } from '../controllers/userController';


const router = Router();


router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);






export default router;