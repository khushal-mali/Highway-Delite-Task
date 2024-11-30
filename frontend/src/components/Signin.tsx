import { Dispatch, SetStateAction, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AuthCompType } from "../pages/Auth";

const Signin = ({
  setAuthComp,
}: {
  setAuthComp: Dispatch<SetStateAction<AuthCompType>>;
}) => {
  const [otpVisible, setOtpVisible] = useState(false);

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
              placeholder="khush@gmail.com"
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border-slate-200 rounded-lg px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary border-2 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label className="absolute cursor-text bg-white px-1 text-slate-400 text-sm transition-all transform origin-left -top-2 left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90">
              Email
            </label>
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            <input
              placeholder="******"
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
          </div>
        </div>

        <button className="bg-primary text-lg font-medium text-white rounded-lg w-full py-3">
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
