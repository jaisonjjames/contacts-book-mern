import axios from "axios";
import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  DELETE_ALL_CONTACT,
  FETCH_CONTACT,
} from "../constants/contact";

export const createContact = (form) => async (dispatch) => {
  try {
    const { data } = await axios.post("/contact", form);
    dispatch({ type: ADD_CONTACT, payload: data });
  } catch (error) {
    console.log("Something wen wrong ", error);
  }
};

export const fetchContacts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/contact");
    dispatch({ type: FETCH_CONTACT, payload: data });
  } catch (error) {}
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/contact/${id}`);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContacts = (ids) => async (dispatch) => {
  try {
    await axios.post("/contact/delete", ids);
    dispatch({ type: DELETE_ALL_CONTACT, payload: ids });
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = (id, form) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/contact/${id}`, form);
    dispatch({ type: EDIT_CONTACT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
