import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const { signup } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const result = signup(
      form.username,
      form.email,
      form.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Signup</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            required
            onChange={e =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="login-btn">
            Signup
          </button>

        </form>

        <p>
          Already have account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>

  );
}

export default Signup;
