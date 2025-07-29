import { useQuery } from "@tanstack/react-query";

//Service
import { Get } from "../../services/services";

//Paths
import { getCartItemsPath } from "../../paths/paths";

export const Checkout = () => {
  const { data } = useQuery({
    queryKey: ["checkout-data"],
    queryFn: () => Get(getCartItemsPath),
    retry: false,
  });

  return (
    <div className="mt-25 mb-10">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items.</p>
          {data &&
            data?.data.items.map((item, index) => (
              <div
                key={`checkout_item_${index}`}
                className="mt-8 rounded-lg bg-white"
              >
                <div className="flex flex-col rounded-lg sm:flex-row bg-gray-100 shadow-md">
                  <img
                    className="m-2 h-24 w-28 rounded-md object-cover object-center"
                    src={item.image_url}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.name}</span>
                    <span className="float-right text-gray-400">
                      quantity: {item.quantity}
                    </span>
                    <p className="mt-auto text-lg font-bold">{item.price} KM</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <form
          className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-xl font-medium">Customer Details</p>
          <p className="text-gray-400">
            Please provide your information to complete the order.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="Doe"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="+1234567890"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {data && data?.data.total_price.toFixed(2)} KM
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 mb-8 w-full rounded-md bg-indigo-700 px-6 py-3 font-medium text-white hover:cursor-pointer hover:bg-indigo-500"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};
