import axios from "axios";
import { AUTH, LOGOUT } from "../constants/user";

export const signIn = (form) => async (dispatch) => {
  try {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/auth/login", form, config);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = (form) => async (dispatch) => {
  try {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/auth", form, config);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = (form) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("userInfo");
  document.location.href = ("/");
};
