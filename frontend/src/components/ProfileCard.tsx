import { useAuth } from "../context/AuthContext";

const ProfileCard = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-44 border md:m-8 xs:m-6 m-4 rounded-lg">
      <div className="text-slate-800 md:text-4xl xs:text-2xl text-xl font-bold">
        Welcome, {auth?.user?.name}
      </div>
      <div className="text-slate-800 md:text-xl xs:text-lg">
        Email: {auth?.user?.email}
      </div>
    </div>
  );
};

export default ProfileCard;
