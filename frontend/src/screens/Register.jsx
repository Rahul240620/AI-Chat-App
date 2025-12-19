import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "../config/axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = UserContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/register", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="w-full max-w-md px-8 py-10 rounded-2xl bg-slate-900/70 backdrop-blur shadow-2xl border border-slate-800">
        {/* Brand / Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
          <p className="mt-2 text-sm text-slate-400">
            Register to create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1.5"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200 mb-1.5"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition active:scale-[0.98]"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="px-3 text-xs text-slate-500 uppercase tracking-[0.2em]">
            or
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account ?
          <Link
            to="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            &nbsp;Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
