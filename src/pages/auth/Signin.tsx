import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullLogo from "../../assets/logo/full_logo.png";
import AuthApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);


  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    AuthApi.login(signinData.email, signinData.password)
      .then((res) => {
        setLoading(false);
        console.log(res);
        const payload = {
          token: res.token,
          user: res.user,
        };
        
        dispatch(login(payload))
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err.response.data.message || "Something went wrong. Please try again later.");
      });
  };

  return (
    <div>
      <div className="p-4 px-8 max-w-[500px] mx-auto mt-20 rounded-lg shadow mb-20">
        <div className="text-center">
          <img src={FullLogo} alt="Logo" className="mx-auto h-20" />
        </div>

        <h1 className="mt-10 mb-6 text-2xl font-semibold">
          Login with your ByteId
        </h1>

        {/* <p className="mb-10 text-sm text-center text-gray-700">
          Login with your ByteId to continue
        </p> */}

        {error && (
          <div
            className="p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500"
            role="alert"
            onClick={() => setError("")}
          >
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label className="hidden" htmlFor="email">
              Email / Byte Id
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email or byteId"
              value={signinData.email}
              onChange={handleChange}
              className="p-2 w-full border-b-2 border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="hidden" htmlFor="password">
              Password
            </label>
            <div className="flex justify-between items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={signinData.password}
                onChange={handleChange}
                className="p-2 w-full border-b-2 border-black"
                required
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>

          {/* forgot password */}
          <Link
            to="/community/forgot-password"
            className="block text-sm underline text-primary"
          >
            Forgot password?
          </Link>

          <button
            className="p-2 mt-10 w-full font-bold text-white bg-black rounded-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signin"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-red">
              Create Byte Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
