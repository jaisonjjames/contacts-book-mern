import axios from "axios";
import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  DELETE_ALL_CONTACT,
  FETCH_CONTACT,
} from "../constants/contact";

export const createContact = (form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/contact", form, config);
    dispatch({ type: ADD_CONTACT, payload: data });
  } catch (error) {
    console.log("Something went wrong for create contact ", error);
  }
};

export const fetchContacts = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const { token } = userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/contact", config);
    dispatch({ type: FETCH_CONTACT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/contact/${id}`, config);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContacts = (ids) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post("/contact/delete", ids, config);
    dispatch({ type: DELETE_ALL_CONTACT, payload: ids });
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = (id, form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/contact/${id}`, form, config);
    dispatch({ type: EDIT_CONTACT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
