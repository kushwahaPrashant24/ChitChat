import {Router} from "express";
import {verifyToken} from "../middlewares/AuthMiddleware.js"
import { getContactsForDMList, searchContact } from "../controllers/ContactsController.js";

const contactsRoutes = Router(); 

contactsRoutes.post("/search", verifyToken, searchContact);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);

export default contactsRoutes;