import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartItem } from "../../components/core/cards/CartItem";
import { ToastMessage } from "../../components/core/ToastMessage";
import { Link } from "react-router-dom";

//Service
import { Get, Delete, Patch } from "../../services/services";

//Paths
import {
  getCartItemsPath,
  removeCartItemPath,
  actionCartItemPath,
} from "../../paths/paths";

export const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["user-cart"],
    queryFn: () => Get(getCartItemsPath),
    retry: false,
  });

  const handleRemoveItem = async (id) => {
    try {
      setLoading(true);
      const response = await Delete(removeCartItemPath, id);
      if (response.status == 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "Item removed",
        });
        setLoading(false);
        refetch();
      } else {
        setToastMessage({
          status: "success",
          open: true,
          message: response.data.detail,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncreaseDecrease = async (action, id) => {
    const cart_item = {
      id,
    };
    try {
      const response = await Patch(actionCartItemPath, cart_item, action);
      if (response.status == 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: action === "inc" ? "Item increased" : "Item decreased",
        });
        refetch();
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

  const isCartEmpty =
    !data || !data.data || !data.data.items || data.data.items.length === 0;

  return (
    <React.Fragment>
      <section className="bg-white antialiased dark:bg-gray-900 mb-10 mt-30">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          {isCartEmpty ? (
            <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
              Cart is empty
            </p>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="w-full flex-none lg:max-w-xl xl:max-w-3xl">
                {data.data.items.map((item, index) => (
                  <div key={`cart_item_${index}`} className="mb-2">
                    <CartItem
                      id={item.id}
                      product_name={item.name}
                      imageUrl={item.image_url}
                      price={item.price}
                      quantity={item.quantity}
                      loading={loading}
                      handleRemoveItem={handleRemoveItem}
                      handleIncreaseDecrease={handleIncreaseDecrease}
                    />
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-6 max-w-5xl min-w-[220px] flex-1 space-y-8 lg:mt-0 lg:w-full">
                <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Cart summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {data.data.total_price.toFixed(2)} KM
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                      <dt className="text-lg font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-lg font-bold text-gray-900 dark:text-white">
                        {data.data.total_price.toFixed(2)} KM
                      </dd>
                    </dl>
                  </div>

                  <Link
                    to="/checkout"
                    className="flex w-full items-center justify-center rounded-xl bg-indigo-700 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </React.Fragment>
  );
};
