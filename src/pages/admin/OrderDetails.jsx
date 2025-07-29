import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ToastMessage } from "../../components/core/ToastMessage";

//Services
import { Get, Patch } from "../../services/services";

//Path
import { getOrderById, updateOrderStatus } from "../../paths/paths";

export const OrderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });
  const params = useParams();

  const order_id = params.order_id;

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["order-detail", order_id],
    queryFn: () => Get(`${getOrderById}${order_id}`),
    retry: false,
  });

  const handleChangeStatus = async (status) => {
    try {
      setLoading(true);
      const response = await Patch(updateOrderStatus, { status }, order_id);
      if (response.status === 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "Status changes",
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard/order-management");
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

  return (
    <React.Fragment>
      <section className="bg-white antialiased dark:bg-gray-900 mt-27">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {data &&
                      data?.data.items.map((item, index) => (
                        <tr key={`order-item-${index}`}>
                          <td className="whitespace-nowrap py-4 md:w-[384px]">
                            <div className="flex items-center gap-4">
                              <a
                                href="#"
                                className="flex items-center aspect-square w-10 h-10 shrink-0"
                              >
                                <img
                                  className="h-auto w-full max-h-full dark:hidden"
                                  src={item.image}
                                  alt="imac image"
                                />
                                <img
                                  className="hidden h-auto w-full max-h-full dark:block"
                                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                  alt="imac image"
                                />
                              </a>
                              <a href="#" className="hover:underline">
                                {item.name}
                              </a>
                            </div>
                          </td>

                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                            x{item.quantity}
                          </td>

                          <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                            {item.price.toFixed(2)} KM
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {data && data?.data.order_total.toFixed(2)} KM
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      {data && data?.data.order_total.toFixed(2)} KM
                    </dd>
                  </dl>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row items-center">
                  <button
                    disabled={loading}
                    onClick={() => handleChangeStatus("rejected")}
                    className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto ${
                      loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                  >
                    Rejected
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => handleChangeStatus("accepted")}
                    className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto ${
                      loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                  >
                    Accepted (Preparation)
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => handleChangeStatus("finished")}
                    className={`bg-blue-800 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto ${
                      loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                  >
                    Finished (Order done)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </React.Fragment>
  );
};
