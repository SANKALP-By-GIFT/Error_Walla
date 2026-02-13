import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Admin Login</h2>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

// REQUIRED default export
export default Login;
