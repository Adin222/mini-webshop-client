import { MarginWrapper } from "../../components/core/MarginWrapper";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUserState from "../../hooks/useUserState";
import { Loading } from "../../components/core/Loading";

//Service
import { Get } from "../../services/services";

//Path
import { getProductById } from "../../paths/paths";

export const ProductDetails = () => {
  const params = useParams();

  const { is_auth } = useUserState();

  const product_id = params.product_id;

  const { data } = useQuery({
    queryKey: ["product_details"],
    queryFn: () => Get(`${getProductById}${product_id}`),
    retry: false,
  });

  return (
    <MarginWrapper>
      <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 w-80 mx-auto">
            <img
              className="w-full dark:hidden"
              src={data && data?.data.product.image_url}
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
                  <a
                    href="#"
                    className="w-full max-w-[150px] flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Edit
                  </a>

                  <a
                    href="#"
                    className="w-full max-w-[150px] flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white bg-red-700 rounded-lg border border-gray-200 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-700 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </>
              )}

              {!is_auth && (
                <a
                  href="#"
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
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </MarginWrapper>
  );
};
