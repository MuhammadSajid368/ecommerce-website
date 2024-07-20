import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import gifImage from "../Images/UserIcon.gif";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("data login", data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // This is important to include cookies in the request
      });
  
      if (!dataResponse.ok) {
        const errorResponse = await dataResponse.json();
        throw new Error(errorResponse.message || "Login failed");
      }
  
      const responseData = await dataResponse.json();
      toast.success("Login successful");
      await fetchUserDetails();
      await fetchAddToCart();
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Failed to login: " + error.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img
              src={gifImage}
              style={{ width: "90px", height: "100px" }}
              alt="GIF Image"
            />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="email">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent "
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white mt-4 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block"
            >
              Login
            </button>
          </form>
          <p className="my-5">
            Not Have Account ?{" "}
            <Link
              className="text-red-600 hover:text-red-700 hover:underline"
              to={"/sign-up"}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
