const Navbar = () => {
  return (
    <div className="h-16 px-10 border-b flex items-center justify-between">
      <div className="cursor-pointer flex gap-2 items-center">
        <img src="HD.svg" alt="logo" />
        <p className="font-bold text-2xl text-gray-800">Dashboard</p>
      </div>

      <div className="font-semibold text-xl cursor-pointer hover:underline text-primary">
        Sign Out
      </div>
    </div>
  );
};

export default Navbar;
