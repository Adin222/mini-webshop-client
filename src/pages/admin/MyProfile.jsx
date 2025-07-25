import { useState } from "react";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export const MyProfile = () => {
  const [editable, setEditable] = useState(false);

  return (
    <MarginWrapper>
      <div
        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 sm:mb-6"
        role="alert"
      >
        <strong class="font-bold">Disclaimer!</strong>{" "}
        <span class="block sm:inline">
          Please update this email to your own existing address so you can test
          receiving the order confirmation
        </span>
      </div>
      <div className="flex justify-center items-center min-h-[55vh] sm:min-h-[62vh]">
        <form className="bg-white rounded-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Admin profile
          </h2>

          <div className="flex space-x-4">
            <div className="w-1/2 flex flex-col">
              <div className="flex gap-1">
                <label className="mb-1 font-medium text-gray-700">
                  Username
                </label>
                {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
              </div>
              <input
                type="text"
                disabled={!editable}
                name="username"
                placeholder="Username"
                className={`p-2 border border-gray-300 rounded ${
                  !editable ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex gap-1">
                <label className="mb-1 font-medium text-gray-700">Name</label>
                {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
              </div>
              <input
                type="text"
                name="name"
                disabled={!editable}
                placeholder="Name"
                className={`p-2 border border-gray-300 rounded ${
                  !editable ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>

          <div className="mb-4 mt-2 flex flex-col">
            <div className="flex gap-1">
              <label className="mb-1 font-medium text-gray-700">Email</label>
              {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
            </div>
            <input
              type="email"
              name="email"
              disabled={!editable}
              placeholder="Email"
              className={`p-2 border border-gray-300 rounded ${
                !editable ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <div className="flex gap-1">
              <label className="mb-1 font-medium text-gray-700">
                New password
              </label>
              {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
            </div>
            <input
              type="password"
              name="newPassword"
              disabled={!editable}
              placeholder="New Password"
              className={`p-2 border border-gray-300 rounded ${
                !editable ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="mb-6 flex flex-col">
            <div className="flex gap-1">
              <label className="mb-1 font-medium text-gray-700">
                Confirm new password
              </label>
              {!editable && <LockClosedIcon className="h-5 w-5 mr-2" />}
            </div>
            <input
              type="password"
              name="confirmPassword"
              disabled={!editable}
              placeholder="Confirm New Password"
              className={`p-2 border border-gray-300 rounded ${
                !editable ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {editable && (
            <div className="flex justify-between">
              <button
                type="reset"
                onClick={() => setEditable(false)}
                className="px-6 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
  );
};
