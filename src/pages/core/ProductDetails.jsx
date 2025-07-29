import React, { useState } from "react";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import useUserState from "../../hooks/useUserState";
import { Loading } from "../../components/core/Loading";
import { ToastMessage } from "../../components/core/ToastMessage";
import { Link } from "react-router-dom";

//Service
import { Get, Post, Delete } from "../../services/services";

//Path
import { getProductById, addCartItemPath } from "../../paths/paths";

export const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });
  const params = useParams();

  const { is_auth } = useUserState();

  const product_id = params.product_id;

  const navigate = useNavigate();

  const handleAddCartItem = async () => {
    try {
      const response = await Post(addCartItemPath, {
        product_id,
        quantity: 1,
      });
      if (response.status === 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "Item added to cart",
        });
      } else {
        setToastMessage({
          status: "danger",
          open: true,
          message: response.data.detail,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await Delete(getProductById, product_id);

      if (response.status === 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "Product soft deleted",
        });
        setTimeout(() => {
          navigate("/dashboard");
          setLoading(false);
        }, [1500]);
      } else {
        setToastMessage({
          status: "danger",
          open: true,
          message: response.data.detail,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product_details"],
    queryFn: () => Get(`${getProductById}${product_id}`),
    retry: false,
  });

  return (
    <React.Fragment>
      <MarginWrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 w-80 mx-auto">
                <img
                  className="w-full dark:hidden"
                  src={
                    (data && data?.data?.product?.image_url) ||
                    "https://support.heberjahiz.com/hc/article_attachments/21013076295570"
                  }
                  alt=""
                />
                <img
                  className="w-full hidden dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                  alt=""
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0 w-full">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {data ? data?.data.product.product_name : "Nothing"}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    {data ? data?.data.product.price : "Nothing"} KM
                  </p>
                </div>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-xl text-gray-900 sm:text-xl dark:text-white">
                    Quantity: {data ? data?.data.product.quantity : "Nothing"}
                  </p>
                </div>

                <p className="mb-6 text-gray-500 dark:text-gray-400 mt-6 leading-relaxed w-full">
                  {data ? data?.data.product.description : "Nothing"}
                </p>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6 w-full">
                  {is_auth && (
                    <>
                      <Link
                        to={`/dashboard/edit/product/${product_id}`}
                        className="w-full max-w-[150px] flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Edit
                      </Link>

                      <button
                        disabled={loading}
                        onClick={handleDelete}
                        className={`w-full max-w-[150px] flex items-center justify-center py-2.5 px-5 text-sm font-medium rounded-lg border 
       ${
         loading
           ? "bg-red-400 border-gray-300 text-gray-300 cursor-not-allowed"
           : "bg-red-700 border-gray-200 text-white hover:bg-red-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-700 dark:hover:text-white"
       }
        focus:outline-none focus:ring-4 focus:ring-gray-100`}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {!is_auth && (
                    <button
                      onClick={handleAddCartItem}
                      className="w-full max-w-[150px] flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                        />
                      </svg>
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </MarginWrapper>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </React.Fragment>
  );
};
