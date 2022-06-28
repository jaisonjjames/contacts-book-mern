import express from "express";
import {
  createContact,
  getContact,
  deleteContact,
  deleteMultipleContacts,
  updateContact,
} from "../controller/contact.js";
const router = express.Router();

router.route("/").post(createContact);
router.route("/").get(getContact);
router.route("/:id").delete(deleteContact).put(updateContact);
router.route("/delete").post(deleteMultipleContacts);

export default router;
