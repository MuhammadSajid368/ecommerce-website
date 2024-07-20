import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../assets/common/role";

const AdminPanel = ({active , setactive}) => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()
  useEffect(() => {
    if(user?.role != ROLE.ADMIN){
      navigate('/')
    }
    
  }, [user]);
  return (
    <div className="min-h-screen min-w-[210px]  md:flex hidden">
      <aside className="bg-white min-w-[210px] min-h-full w-full  max-w-60">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer flex justify-center">
            {user?._id ? (
              <img
                src={user?.profilePic}
                className="w-[80px] h-[80px] rounded-full"
                alt={user.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div>
          {/* navigation */}
          <div>
            <nav className="grid p-4">
              <Link className="px-2 py-1 hover:bg-slate-100" onClick={() => setactive(1)} >All Users</Link>
              <Link className="px-2 py-1 hover:bg-slate-100" onClick={() => setactive(2)} >All Products</Link>
            </nav>
          </div>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
