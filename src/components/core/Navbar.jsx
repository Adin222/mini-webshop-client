import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import useUserState from "../../hooks/useUserState";
import { ConfirmModal } from "./ConfirmModal";
import { Navigation } from "../../utils/constants";
import { MenuMobile } from "../guest/MenuMobile";
import { Menu } from "../guest/Menu";
import { AdminMenu } from "../admin/AdminMenu";

//Service
import { Post } from "../../services/services";

//Paths
import { logoutPath } from "../../paths/paths";

export const Navbar = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { is_auth, refetch } = useUserState();

  const navigation = Navigation(is_auth);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await Post(logoutPath, {});
      if (response.status === 200) {
        refetch();
        setLoading(false);
        setOpenModal(false);
      } else {
        console.log("Coldn't log out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="bg-white">
        {role === "guest" && (
          <MenuMobile navigation={navigation} open={open} setOpen={setOpen} />
        )}

        <header className="fixed flex top-0 bg-white w-full z-10">
          <nav aria-label="Top" className="w-full border-b border-gray-200">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center">
                {role === "guest" && (
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>
                )}
                {role === "guest" && (
                  <div className="ml-4 flex lg:ml-0">
                    <Link to="/">
                      <span className="sr-only">Your Company</span>
                      <img
                        alt=""
                        src="logo2.png"
                        className="h-6 w-auto mb-1.5"
                      />
                    </Link>
                  </div>
                )}
                {role === "admin" && (
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="relative rounded-md bg-white p-2 text-black-400 hover:cursor-pointer hover:bg-gray-50"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>
                )}
                {role === "guest" && <Menu navigation={navigation} />}
                {role === "admin" && (
                  <h4 className="ml-6 text-2xl font-semibold text-gray-800">
                    Admin dashboard
                  </h4>
                )}
                <div className="ml-auto flex items-center">
                  {role === "guest" && (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/sign-in"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        sign in
                      </Link>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                    </div>
                  )}

                  {role === "guest" && (
                    <div className="ml-4 flow-root lg:ml-6">
                      <a href="#" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <AdminMenu
        setOpenModal={setOpenModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        text="You will be logged out. Click Confirm if you wish to proceed."
        title="Comeback soon 😄"
        loading={loading}
        handleFunction={handleLogout}
      />
    </React.Fragment>
  );
};
