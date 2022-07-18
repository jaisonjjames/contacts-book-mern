import express from "express";
import {
  createContact,
  getContact,
  deleteContact,
  deleteMultipleContacts,
  updateContact,
} from "../controller/contact.js";
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.route("/").post(protect, createContact);
router.route("/").get(protect, getContact);
router.route("/:id").delete(protect, deleteContact).put(updateContact);
router.route("/delete").post(protect, deleteMultipleContacts);

export default router;
