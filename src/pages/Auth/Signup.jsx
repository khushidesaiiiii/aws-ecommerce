import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../redux/authSlice";
import Button from "../../UI/Button";

import loginImg from "../../assets/images/login/login-img.jpg";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signupUser({ email, password })).unwrap();
      toast.success("Account created. Check your email.");
      navigate("/confirm", {
        state: { fromSignup: true, email },
      });
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  return (
    <div className="signup-page">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <Button type="submit">
            {loading ? "Creating account" : "Sign Up"}
          </Button>
        </form>
        <div className="login-card-img">
          <img src={loginImg} alt="Login page Image" />
        </div>{" "}
        <p>
          Already have an account? <span> Login into your account </span>{" "}
        </p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
      {/* {error && <p>{error || "Something went Wrong"}</p>} */}
    </div>
  );
}
