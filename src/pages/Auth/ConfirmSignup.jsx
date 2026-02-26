import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import { confirmUser, resendCode } from "../../redux/authSlice";
import { toast } from "react-toastify";

export default function ConfirmSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  if (!location.state?.fromSignup) {
    return <Navigate to="/signup" replace />;
  }

  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState(loading.state?.email || "");
  const [code, setCode] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      await dispatch(confirmUser({ email, code })).unwrap();
      toast.success("Account verified. You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const handleResend = async (e) => {
    try {
      await dispatch(resendCode(email)).unwrap();
      toast.success("Verification Code sent again!");
    } catch (errr) {
      toast.error(errr || "Resent failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="login-card">
        <h2>Verify your account</h2>
        <form onSubmit={handleConfirm}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <Button onClick={handleResend} disabled={!email || loading}>
          Resend code
        </Button>
      </div>
    </div>
  );
}
