import { useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import Notes from "../components/Notes";

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!auth?.isLoggedIn) {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [auth, navigate]);

  return (
    <div>
      <Navbar />
      <ProfileCard />
      <Notes />
    </div>
  );
};

export default Home;
