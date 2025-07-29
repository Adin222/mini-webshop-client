import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";

//Services
import { Get } from "../../services/services";

//Path
import { getOrderItemsPath } from "../../paths/paths";

export const Orders = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(false);

  const { data } = useQuery({
    queryKey: ["order-items", page, sort],
    queryFn: () =>
      Get(`${getOrderItemsPath}?page=${page}&page_size=5&sort_asc=${sort}`),
    retry: false,
  });

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value === "oldest");
  };

  const maxPages = data ? Math.ceil(data.data.total_orders / 5) : 0;
  const pagesArray = Array.from({ length: maxPages }, (_, i) => i + 1);

  const goToPreviousPage = () => {
    setPage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      } else {
        return prevPage;
      }
    });
  };

  const goToNextPage = () => {
    setPage((prevPage) => {
      if (prevPage < maxPages) {
        return prevPage + 1;
      } else {
        return prevPage;
      }
    });
  };

  return (
    <section className="bg-white antialiased dark:bg-gray-900 mb-10 mt-25">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Orders
            </h2>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <span className="inline-block text-gray-500 dark:text-gray-400">
                {" "}
                sort by date{" "}
              </span>

              <div>
                <label
                  htmlFor="duration"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select duration
                </label>
                <select
                  id="duration"
                  onChange={handleSortChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  <option selected value="oldest">
                    Oldest (ASC)
                  </option>
                  <option value="newest">Newest (DESC)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {data &&
                data?.data.orders.map((order_item, index) => (
                  <div
                    key={`order-item-${index}`}
                    className="flex flex-wrap items-center gap-y-4 p-6 bg-gray-50 rounded-md shadow-md mb-5"
                  >
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {formatDate(order_item.created_at)}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {order_item.total_price.toFixed(2)} KM
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Status:
                      </dt>
                      <dd
                        className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium
      ${
        order_item.finished
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          : order_item.status === "accepted"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          : order_item.status === "rejected"
          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      }
    `}
                      >
                        {order_item.finished ? "finished" : order_item.status}
                      </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <Link
                        to={`/dashboard/order/${order_item.id}`}
                        className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <nav
            className="mt-6 flex items-center justify-center sm:mt-8"
            aria-label="Page navigation example"
          >
            <ul className="flex h-8 items-center -space-x-px text-sm">
              <li>
                <button
                  onClick={goToPreviousPage}
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-4 w-4 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                </button>
              </li>
              {data &&
                pagesArray.map((element, index) => (
                  <li key={`page_${index}`}>
                    <button
                      onClick={() => setPage(element)}
                      className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        element === page ? "font-bold" : ""
                      }`}
                    >
                      {element}
                    </button>
                  </li>
                ))}

              <li>
                <button
                  onClick={goToNextPage}
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-4 w-4 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};
