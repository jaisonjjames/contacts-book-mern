import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  DELETE_ALL_CONTACT,
  FETCH_CONTACT,
} from "../constants/contact";

export const contactReducer = (contacts = [], action) => {
  switch (action.type) {
    case FETCH_CONTACT:
      return action.payload;
    case ADD_CONTACT:
      return [...contacts, action.payload];
    case EDIT_CONTACT:
      return contacts.map((contact) =>
        contact._id === action.payload._id ? action.payload : contact
      );
    case DELETE_CONTACT:
      return contacts.filter((contact) => contact._id !== action.payload);
    case DELETE_ALL_CONTACT:
      return contacts.filter(
        (contact) => action.payload.indexOf(contact._id) === -1
      );
    default:
      return contacts;
  }
};
