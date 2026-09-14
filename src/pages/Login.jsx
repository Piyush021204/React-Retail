import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const location = useLocation();

const from = location.state?.from?.pathname || "/checkout";

  const navigate = useNavigate();

  const handleLogin = (event) => {
  event.preventDefault();

  if (username && password) {
    login(
      
    );
    navigate(from, { replace: true });
  }
};

 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
    <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Login
      </h1>

      <p className="text-gray-500 text-center mt-2">
        Sign in to continue to checkout
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>

          <input
  
  type="password"
            value={password}
          onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;