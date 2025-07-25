import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftEndOnRectangleIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
  QueueListIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const AdminMenu = ({ setOpenModal, isOpen, setIsOpen }) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 transition-transform duration-300 ease-in-out bg-gray-50 dark:bg-gray-800 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
          <span className="sr-only">Close menu</span>
        </button>

        <div className="flex-grow mt-10">
          <ul className="space-y-2 font-medium">
            <p className="text-gray-500 px-2">Webshop management</p>
            <li>
              <Link
                to="#"
                className="flex ml-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BuildingStorefrontIcon className="w-6 h-6" />
                <span className="ms-3">products</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex ml-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <QueueListIcon className="w-6 h-6" />
                <span className="ms-3">orders</span>
              </Link>
            </li>
            <p className="text-gray-500 px-2">Settings</p>
            <li>
              <Link
                to="#"
                className="flex ml-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <UserIcon className="w-6 h-6" />
                <span className="ms-3">my profile</span>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="border-gray-300" />
        <div className="mt-auto">
          <ul className="space-y-2 font-medium mt-2">
            <li>
              <Link
                onClick={() => setOpenModal(true)}
                className="flex ml-2 items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-gray-700 group"
              >
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
                <span className="flex-1 ms-3 whitespace-nowrap">log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
