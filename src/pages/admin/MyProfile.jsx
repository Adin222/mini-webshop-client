import React, { useState, useEffect } from "react";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import useUserState from "../../hooks/useUserState";
import { Skeleton } from "../../components/core/Skeleton";
import { ToastMessage } from "../../components/core/ToastMessage";
import { validateEmail, validatePassword } from "../../utils/utils";

//Service
import { Get, Patch } from "../../services/services";

//Path
import { getUserPath, updateUserPath } from "../../paths/paths";

export const MyProfile = () => {
  const [editable, setEditable] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [togglePass, setTogglePass] = useState(false);
  const [toggleConfirmPass, setToggleConfirmPass] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });
  const [body, setBody] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useUserState();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["auth_user", id],
    queryFn: () => Get(`${getUserPath}${id}`),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const { name, username, email } = data?.data?.user || {};

  useEffect(() => {
    if (data?.data?.user) {
      setUserData({
        name: data.data.user.name || "",
        username: data.data.user.username || "",
        email: data.data.user.email || "",
      });
    }
  }, [name, username, email]);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setBody((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelEditing = () => {
    setUserData({
      name: data.data.user.name || "",
      username: data.data.user.username || "",
      email: data.data.user.email || "",
    });
    setBody({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
    setEditable(false);
  };

  const updateUserData = async (e) => {
    e.preventDefault();

    if (body.password && body.password !== confirmPassword) {
      setToastMessage({
        status: "danger",
        open: true,
        message: "Passwords do not match",
      });
      return;
    }

    if (email.password && !validatePassword(body.password)) {
      setToastMessage({
        status: "danger",
        open: true,
        message: "Password must be 8+ chars, 1 uppercase, 1 special char",
      });
      return;
    }

    if (body.email && !validateEmail(body.email)) {
      setToastMessage({
        status: "danger",
        open: true,
        message: "Invalid email format",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await Patch(updateUserPath, body, id);
      console.log(response);
      if (response.status === 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "You successfully update your data",
        });
        setLoading(false);
        setBody({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        setEditable(false);
        refetch();
      } else {
        setLoading(false);
        setEditable(false);
        setToastMessage({
          status: "danger",
          open: true,
          message: response.data.detail,
        });
      }
    } catch (error) {
      setToastMessage({
        status: "danger",
        open: true,
        message: "Internal server error",
      });
    }
  };

  return (
    <React.Fragment>
      <MarginWrapper>
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 sm:mb-6"
          role="alert"
        >
          <strong className="font-bold">Disclaimer!</strong>{" "}
          <span className="block sm:inline">
            Please update this email to your own existing address so you can
            test receiving the order confirmation
          </span>
        </div>
        <div className="flex justify-center items-center min-h-[55vh] sm:min-h-[62vh]">
          <form
            onSubmit={updateUserData}
            className="bg-white rounded-md w-full max-w-md"
          >
            <h4 className="text-xl font-semibold mb-6 text-center">
              Your profile
            </h4>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 flex flex-col">
                <div className="flex gap-1">
                  <label className="mb-1 font-medium text-gray-700">
                    Username
                  </label>
                  {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
                </div>
                {isLoading ? (
                  <Skeleton skeletonClass="p-2 h-10 bg-gray-200 border border-gray-300 rounded" />
                ) : (
                  <input
                    type="text"
                    disabled={!editable}
                    name="username"
                    onChange={handleChange}
                    value={userData.username}
                    placeholder="Username"
                    className={`p-2 border border-gray-300 rounded ${
                      !editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 flex flex-col mt-4 md:mt-0">
                <div className="flex gap-1">
                  <label className="mb-1 font-medium text-gray-700">Name</label>
                  {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
                </div>
                {isLoading ? (
                  <Skeleton skeletonClass="p-2 h-10 bg-gray-200 border border-gray-300 rounded" />
                ) : (
                  <input
                    type="text"
                    name="name"
                    disabled={!editable}
                    onChange={handleChange}
                    value={userData.name}
                    placeholder="Name"
                    className={`p-2 border border-gray-300 rounded ${
                      !editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                )}
              </div>
            </div>

            <div className="mb-4 mt-2 flex flex-col">
              <div className="flex gap-1">
                <label className="mb-1 font-medium text-gray-700">Email</label>
                {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
              </div>
              {isLoading ? (
                <Skeleton skeletonClass="h-10 bg-gray-200 p-2 border border-gray-300 rounded" />
              ) : (
                <input
                  type="email"
                  name="email"
                  disabled={!editable}
                  onChange={handleChange}
                  value={userData.email}
                  placeholder="Email"
                  className={`p-2 border border-gray-300 rounded ${
                    !editable ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              )}
            </div>

            <div className="mb-4 flex flex-col">
              <div className="flex gap-1">
                <label className="mb-1 font-medium text-gray-700">
                  New password
                </label>
                {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
              </div>
              {isLoading ? (
                <Skeleton skeletonClass="h-10 bg-gray-200 p-2 border border-gray-300 rounded" />
              ) : (
                <div className="relative">
                  <input
                    type={togglePass ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={body.password}
                    disabled={!editable}
                    placeholder="**********"
                    className={`w-full p-2 pr-10 border border-gray-300 rounded ${
                      !editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setTogglePass(!togglePass)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {togglePass ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6 flex flex-col">
              <div className="flex gap-1">
                <label className="mb-1 font-medium text-gray-700">
                  Confirm new password
                </label>
                {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
              </div>
              {isLoading ? (
                <Skeleton skeletonClass="h-10 bg-gray-200 p-2 border border-gray-300 rounded" />
              ) : (
                <div className="relative">
                  <input
                    type={toggleConfirmPass ? "text" : "password"}
                    name="confirm_password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    disabled={!editable}
                    placeholder="**********"
                    className={`w-full p-2 pr-10 border border-gray-300 rounded ${
                      !editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setToggleConfirmPass(!toggleConfirmPass)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {toggleConfirmPass ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {editable && (
              <div className="flex justify-between">
                <button
                  type="reset"
                  disabled={loading}
                  onClick={cancelEditing}
                  className={`px-6 py-2 border border-gray-400 rounded text-gray-700 
                 ${
                   loading
                     ? "opacity-50 cursor-not-allowed"
                     : "hover:bg-gray-100"
                 }`}
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  type="submit"
                  className={`px-6 py-2 bg-indigo-600 text-white rounded 
                   ${
                     loading
                       ? "opacity-50 cursor-not-allowed"
                       : "hover:bg-indigo-700"
                   }`}
                >
                  Submit
                </button>
              </div>
            )}
            {!editable && (
              <div>
                <button
                  onClick={() => setEditable(true)}
                  className="w-full px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Start Editing!
                </button>
              </div>
            )}
          </form>
        </div>
      </MarginWrapper>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </React.Fragment>
  );
};
