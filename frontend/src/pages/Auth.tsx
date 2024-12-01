import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { useAuth } from "../context/AuthContext";

export type AuthCompType = "Signup" | "Signin";

const Auth = () => {
  const [authComp, setAuthComp] = useState<AuthCompType>("Signup");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (auth?.isLoggedIn) {
        navigate("/");
      }
    };

    checkAuth();
  }, [auth, navigate]);

  return (
    <div className="w-full h-screen flex">
      <div className="relative md:w-5/12 md:min-w-[500px] w-full flex-shrink-0 md:px-20 px-10 flex items-center justify-center">
        <div className="absolute cursor-pointer flex gap-2 items-center top-[4%] md:left-[4%] left-1/2 md:-translate-x-0 -translate-x-1/2">
          <img src="HD.svg" alt="logo" />
          <p className="font-bold text-2xl text-gray-800">HD</p>
        </div>

        {authComp === "Signup" ? (
          <Signup setAuthComp={setAuthComp} />
        ) : (
          <Signin setAuthComp={setAuthComp} />
        )}
      </div>

      <div className="hidden md:flex w-full items-center justify-center h-full">
        <div className="h-[96%] w-[96%] rounded-lg overflow-hidden">
          <img
            src="authSideImage.png"
            className="aspect-[33/40] h-full w-full"
            alt="Static Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
