import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../../redux/authSlice";
import Button from "../../UI/Button";

import loginImg from "../../assets/images/login/login-img.jpg";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      //debugger;
      toast.success("Login Success");

      if (result.role === "ADMIN") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error(err || "Login Failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="login-card">
        <h2>Login</h2>
        <div className="login-card-img">
          <img src={loginImg} alt="Login page Image" />
        </div>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Enter your Email"
            type="email"
            required
            name="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter your Password"
            type="password"
            required
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">{loading ? "Logging in" : "Login"}</Button>
        </form>
      <p>
        Don't have an account yet? <span> Create account now</span>{" "}
      </p>
      <Button onClick={() => navigate("/signup")}>Sign Up</Button>
    </div>
    {/* {error && <p>{error || "Something went Wrong"}</p>} */}
      </div>
  );
}
