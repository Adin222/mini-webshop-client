import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastMessage } from "../../components/core/ToastMessage";
import { ButtonSpinner } from "../../components/core/ButtonSpinner";
import useUserState from "../../hooks/useUserState";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

//Services
import { Post } from "../../services/services";

//Path
import { loginPath } from "../../paths/paths";

export const SignIn = () => {
  const { refetch } = useUserState();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });

  const [loginBody, setLoginBody] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChangeBody = (e) => {
    setLoginBody((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Post(loginPath, loginBody);
      if (response.status === 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "You have logged in, welcome!",
        });
        setLoading(false);
        refetch();
        setTimeout(() => {
          setLoginBody({
            username: "",
            password: "",
          });
          navigate("/dashboard");
        }, [1000]);
      } else if (response.status === 401) {
        setToastMessage({
          status: "danger",
          open: true,
          message: "Wrong credentials",
        });
        setLoading(false);
      } else if (response.status === 403) {
        setToastMessage({
          status: "danger",
          open: true,
          message: "You are already signed in",
        });
        setLoading(false);
      } else {
        setToastMessage({
          status: "danger",
          open: true,
          message: "Unexpected error occured",
        });
        setLoading(false);
      }
    } catch (error) {
      setToastMessage({
        status: "danger",
        open: true,
        message: "Internal server error",
      });
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={handleChangeBody}
                  value={loginBody.username}
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={!toggle ? "password" : "text"}
                  onChange={handleChangeBody}
                  value={loginBody.password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 pr-10"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setToggle(!toggle)}
                >
                  {!toggle ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <ButtonSpinner /> : "Sign in"}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Back to home page{" "}
            <Link
              to="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              home page
            </Link>
          </p>
        </div>
      </div>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </React.Fragment>
  );
};
