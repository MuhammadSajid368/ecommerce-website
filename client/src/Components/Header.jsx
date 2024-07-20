import React, { useContext, useState, useEffect } from "react";
import logo from "../Images/Logo.png";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../assets/common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const context = useContext(Context);

  useEffect(() => {
    setSearchQuery('');
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null)); // Clear user state in Redux
        navigate('/')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-16 md:h-24 shadow-md bg-white">
        <div className="container h-full mx-auto flex items-center px-4 justify-between">
          <div>
            <Link to={"/"}>
              <img src={logo} className="w-16 h-16 md:w-20 md:h-20" alt="Logo" />
            </Link>
          </div>
          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-6">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full outline-none"
              onChange={handleSearch}
              value={searchQuery}
            />
            <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
              <CiSearch />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-5">
            <div className="relative group lg:block">
              {user && (
                <div
                  className="text-2xl cursor-pointer flex justify-center"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full"
                      alt={user.name}
                    />
                  ) : (
                    <FaRegCircleUser className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
                  )}
                </div>
              )}

              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-11 hidden md:block h-fit shadow-lg rounded">
                  <nav>
                    {user?.role === "ADMIN" && (
                      <Link
                        to={"/admin-panel"}
                        className="whitespace-nowrap block p-2 hover:bg-slate-100"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>

            {user && (
              <Link to={'/cart'} className="text-2xl relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-red-600 text-white w-3 h-3 p-1 rounded-full flex items-center justify-center absolute top-0 right-0">
                  <p className="text-xs">{context.cartProductCount}</p>
                </div>
              </Link>
            )}

            <div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-800"
                >
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-800">
                    Login
                  </button>
                </Link>
              )}

            </div>
          </div>
        </div>
        {/* Mobile search bar always visible */}
        <div className="lg:hidden p-4 w-full border-t shadow-md flex mb-4 items-center">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full p-2 border rounded focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="text-2xl cursor-pointer bg-red-600 text-white p-1.5 rounded-r-sm">
            <CiSearch />
          </div>
        </div>
      </div>
      <div className="pt-32">
        {/* Add this div to apply padding */}
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Header;
