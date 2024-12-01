import { Dispatch, SetStateAction, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AuthCompType } from "../pages/Auth";
import { requestSignupOtp, verifySignupOtp } from "../utils/api-communicators";
import toast from "react-hot-toast";
import { signupOtpVal, verifySignupOptVal } from "../utils/validation";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

const Signup = ({
  setAuthComp,
}: {
  setAuthComp: Dispatch<SetStateAction<AuthCompType>>;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpVisible, setOtpVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [dob, setDob] = useState("");
  const auth = useAuth();

  const handleRequestOTP = async () => {
    try {
      const date = new Date(dob);
      await signupOtpVal.parseAsync({ name, email, dob: date });
      const res = await requestSignupOtp(name, email, date);
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
      const date = new Date(dob);

      await verifySignupOptVal.parseAsync({ name, email, dob: date, otp });

      const data = await verifySignupOtp(email, otp);
      const user = data.user;

      if (user.email && user.name) {
        auth?.setUser({
          email: user.email,
          name: user.name,
          dob: new Date(user.dob),
        });
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
        <p className="text-4xl font-bold text-gray-800">Sign Up</p>
        <p className="tracking-wider text-gray-500">
          Sign up to enjoy the feature of HD
        </p>
      </div>

      <div className="w-full space-y-5 max-w-sm">
        <div className="w-full">
          <div className="relative">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Khushal Mali"
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border-slate-200 rounded-lg px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary border-2 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label className="absolute cursor-text bg-white px-1 text-slate-400 text-sm transition-all transform origin-left -top-2 left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90">
              Your Name
            </label>
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border-slate-200 rounded-lg px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary border-2 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label className="absolute cursor-text bg-white px-1 text-slate-400 text-sm transition-all transform origin-left -top-2 left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90">
              Date Of Birth
            </label>
            {errors.dob && <p className="text-xs text-red-600">{errors.dob}</p>}
          </div>
        </div>

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
              onClick={() => handleRequestOTP()}
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

        <button
          onClick={handleVerifySignup}
          className="bg-primary text-lg font-medium text-white rounded-lg w-full py-3"
        >
          Sign Up
        </button>

        <div className="text-center">
          Already have an account??{" "}
          <span
            onClick={() => setAuthComp("Signin")}
            className="text-primary hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
