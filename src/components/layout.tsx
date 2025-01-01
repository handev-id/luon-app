import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full relative lg:w-[500px] h-screen overflow-hidden bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
