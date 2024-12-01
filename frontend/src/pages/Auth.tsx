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
      <div className="relative w-5/12 min-w-[500px] flex-shrink-0 px-24 flex items-center justify-center">
        <div className="absolute cursor-pointer flex gap-2 items-center top-[4%] left-[4%]">
          <img src="HD.svg" alt="logo" />
          <p className="font-bold text-2xl text-gray-800">HD</p>
        </div>

        {authComp === "Signup" ? (
          <Signup setAuthComp={setAuthComp} />
        ) : (
          <Signin setAuthComp={setAuthComp} />
        )}
      </div>

      <div className="flex w-full items-center justify-center h-full">
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
