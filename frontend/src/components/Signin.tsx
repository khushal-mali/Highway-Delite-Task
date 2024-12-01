import { Dispatch, SetStateAction, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AuthCompType } from "../pages/Auth";
import { loginOtpVal, verifyLoginOtpVal } from "../utils/validation";
import { z } from "zod";
import toast from "react-hot-toast";
import { requestLoginOtp, verifyLoginOtp } from "../utils/api-communicators";
import { useAuth } from "../context/AuthContext";

const Signin = ({
  setAuthComp,
}: {
  setAuthComp: Dispatch<SetStateAction<AuthCompType>>;
}) => {
  const [otpVisible, setOtpVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const auth = useAuth();

  const handleRequestOTP = async () => {
    try {
      await loginOtpVal.parseAsync({ email });
      const res = await requestLoginOtp(email);
      console.log(res);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");
        return { error: "Validation failed", status: "ERROR" };
      }

      console.log(error);
      toast.error(error.message);
    }
  };

  const handleVerifySignup = async () => {
    try {
      await verifyLoginOtpVal.parseAsync({ email, otp });

      const data = await verifyLoginOtp(email, otp, keepMeLoggedIn);
      const user = data.user;

      if (user.email && user.name) {
        auth?.setUser({
          email: user.email,
          name: user.name,
          dob: new Date(user.dob),
        });
        auth?.setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");
        return { error: "Validation failed", status: "ERROR" };
      }

      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full space-y-6 max-w-sm">
      <div className="flex w-full max-w-sm flex-col gap-1">
        <p className="text-4xl font-bold text-gray-800">Sign In</p>
        <p className="tracking-wider text-gray-500">
          Please login to continue to your account.
        </p>
      </div>

      <div className="w-full space-y-5 max-w-sm">
        <div className="w-full">
          <div className="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="khush@gmail.com"
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border-slate-200 rounded-lg px-3 py-3 pr-24 transition duration-300 ease focus:outline-none focus:border-primary border-2 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label className="absolute cursor-text bg-white px-1 text-slate-400 text-sm transition-all transform origin-left -top-2 left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90">
              Email
            </label>
            <div
              onClick={handleRequestOTP}
              className="right-3 shadow-lg active:shadow-none duration-150 transition-all top-3.5 absolute cursor-pointer text-white bg-primary py-1 px-2 rounded-md text-sm"
            >
              Send Otp
            </div>
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            <input
              placeholder="******"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type={otpVisible ? "text" : "password"}
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border-slate-200 rounded-lg px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary border-2 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label className="absolute cursor-text bg-white px-1 text-slate-400 text-sm transition-all transform origin-left -top-2 left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90">
              OTP
            </label>
            <div
              className="right-3 top-4 absolute cursor-pointer text-slate-800 text-2xl"
              onClick={() => setOtpVisible((val) => !val)}
            >
              {!otpVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            {errors.otp && <p className="text-xs text-red-600">{errors.otp}</p>}
          </div>
        </div>

        <div className="w-full">
          <div className="inline-flex items-center">
            <label
              className="flex items-center cursor-pointer relative"
              htmlFor="check-2"
            >
              <input
                type="checkbox"
                checked={keepMeLoggedIn}
                onChange={() => setKeepMeLoggedIn((prev) => !prev)}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-pribg-primary"
                id="check-2"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="cursor-pointer ml-2 text-slate-600 text-sm"
              htmlFor="check-2"
            >
              Keep me logged in
            </label>
          </div>
        </div>

        <button
          onClick={handleVerifySignup}
          className="bg-primary text-lg font-medium text-white rounded-lg w-full py-3"
        >
          Sign Up
        </button>

        <div className="text-center">
          Don't have an account??{" "}
          <span
            onClick={() => setAuthComp("Signup")}
            className="text-primary hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
