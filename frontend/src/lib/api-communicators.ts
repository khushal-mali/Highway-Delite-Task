import axios from "axios";
import toast from "react-hot-toast";

export const requestSignupOtp = async (
  name: string,
  email: string,
  dob: Date
) => {
  const res = await axios.post("/user/signup", { name, email, dob });

  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  } else {
    toast.success("OTP sent to your email.");
  }

  const data = await res.data;
  return data;
};

export const requestLoginOtp = async (email: string) => {
  const res = await axios.post("/user/login", { email });

  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  } else {
    toast.success("OTP sent to your email.");
  }

  const data = await res.data;
  return data;
};

export const verifySignupOtp = async (email: string, otp: string) => {
  const res = await axios.post("/user/verifySignup", { email, otp });

  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  } else {
    toast.success("Signup successful! You are now logged in.");
  }
  console.log(res);
  const data = await res.data;
  return data;
};

export const verifyLoginOtp = async (
  email: string,
  otp: string,
  keepMeLoggedIn: boolean
) => {
  const res = await axios.post("/user/verifyLogin", {
    email,
    otp,
    keepMeLoggedIn,
  });

  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  } else {
    toast.success("Login successful! You are now logged in.");
  }
  console.log(res);
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  console.log(res);

  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }

  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");

  if (res.status !== 200) {
    throw new Error("Unable to logout.");
  } else {
    toast.success(res?.data?.message);
  }
  const data = await res.data;
  return data;
};

export const createNewNote = async (
  title: string,
  content: string,
  tags: string,
  importance: "Low" | "Medium" | "High"
) => {
  const res = await axios.post("/note/create", {
    title,
    content,
    tags,
    importance,
  });
  console.log(res);

  if (res.status !== 200) {
    throw new Error(res.data.error);
  }

  const data = await res.data;
  return data;
};

export const getAllNotes = async () => {
  const res = await axios.post("/note/getAll");
  console.log(res);

  if (res.status !== 200) {
    throw new Error(res.data.error);
  }

  const data = await res.data;
  return data;
};
