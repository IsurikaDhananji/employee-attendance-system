import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log('Login success:', res.data);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.data.user);
      navigate(res.data.data.user.role === "admin" ? "/admin" : "/dashboard");
      navigate(path, { replace: true });
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative p-8 border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl w-96 border-white/20">
        {/* Decorative elements */}
        <div className="absolute w-24 h-24 rounded-full -top-2 -left-2 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-xl"></div>
        <div className="absolute w-32 h-32 rounded-full -bottom-2 -right-2 bg-gradient-to-br from-purple-400 to-pink-500 opacity-20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 input bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div className="relative group">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 input bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <button 
              className="btn w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-300" 
              onClick={handleLogin}
            >
              <span className="flex items-center justify-center">
                Sign In
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="font-semibold text-transparent transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text hover:from-blue-600 hover:to-purple-700"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Additional decorative element */}
          <div className="pt-6 mt-8 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Secure Login</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;