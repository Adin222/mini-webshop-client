import { Link } from "react-router-dom";

//Service
import { Post } from "../../../services/services";

//Path
import { addCartItemPath } from "../../../paths/paths";

export const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  setToastMessage,
}) => {
  const handleAddCartItem = async () => {
    try {
      const response = await Post(addCartItemPath, { product_id: id, quantity: 1 });
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

  return (
    <div className="w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`product/${id}`}>
        <img
          className="p-2 rounded-t-lg h-[280px] w-full object-contain"
          src={imageUrl}
          alt="product image"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`product/${id}`}>
          <h6 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h6>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <h6 className="text-gray-500 font-semibold">Quantity: {quantity}</h6>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-md font-bold text-gray-600 dark:text-white">
            BAM: {price.toFixed(2)}
          </span>
          <button
            onClick={handleAddCartItem}
            className="group relative inline-block bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg p-2 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
              Add to cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
