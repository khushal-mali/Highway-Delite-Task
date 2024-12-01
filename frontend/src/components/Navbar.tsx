import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../utils/api-communicators";

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
    <div className="h-16 px-10 border-b flex items-center justify-between">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex gap-2 items-center"
      >
        <img src="HD.svg" alt="logo" />
        <p className="font-bold text-2xl text-gray-800">Dashboard</p>
      </div>

      <div
        onClick={handleLogout}
        className="font-semibold text-xl cursor-pointer hover:underline text-primary"
      >
        Sign Out
      </div>
    </div>
  );
};

export default Navbar;
