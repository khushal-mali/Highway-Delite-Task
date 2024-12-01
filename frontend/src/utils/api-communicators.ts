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

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  console.log(res);

  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};
