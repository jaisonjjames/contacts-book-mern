import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Contact from "../model/contact.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, address, selectedImage } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    address,
    selectedImage,
  });

  try {
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Incorrect ID");
  }

  await Contact.findByIdAndRemove(id);
  res.json({ message: "Contact removed successfully!" });
});

const deleteMultipleContacts = asyncHandler(async (req, res) => {
  const ids = req.body;
  if (ids.length > 0) {
    await Contact.deleteMany({
      _id: { $in: ids },
    });
    res.json({ message: "Contacts are removed successfully!" });
  } else {
    res.status(400).json({ message: "No IDs found" });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, selectedImage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No contact available with id: ${id}`);
  }

  const existContact = await Contact.findById(id);
  existContact.name = name || existContact.name;
  existContact.email = email || existContact.email;
  existContact.phone = phone || existContact.phone;
  existContact.address = address || existContact.address;
  existContact.selectedImage = selectedImage || existContact.selectedImage;

  const updatedContact = await existContact.save();
  res.json(updatedContact);
});

export {
  createContact,
  getContact,
  deleteContact,
  deleteMultipleContacts,
  updateContact,
};
