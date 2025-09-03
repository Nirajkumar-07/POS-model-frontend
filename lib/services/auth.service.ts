import axios from "axios";
import { API } from "../api";
import handleErrors from "../actions/common.action";

export async function Signup(body: any) {
  try {
    const res = await axios.post(API.Signup, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: "Successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function Login(body: any) {
  try {
    const res = await axios.post(API.Login, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: res.data.data,
      message: "Successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}
