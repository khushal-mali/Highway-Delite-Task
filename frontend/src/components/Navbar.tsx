import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../lib/api-communicators";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      auth?.setIsLoggedIn(false);
      auth?.setUser(null);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:h-16 md:px-10 h-14 px-6 border-b flex items-center justify-between">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex gap-2 items-center"
      >
        <img src="HD.svg" alt="logo" />
        <p className="font-bold md:text-2xl text-lg text-gray-800">Dashboard</p>
      </div>

      <div
        onClick={handleLogout}
        className="font-semibold md:text-xl text-lg cursor-pointer hover:underline text-primary"
      >
        Sign Out
      </div>
    </div>
  );
};

export default Navbar;
