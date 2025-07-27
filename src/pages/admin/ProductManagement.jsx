import { useState } from "react";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import { CategorySelector } from "./CategorySelector";

export const ProductManagement = () => {
  const [formData, setFormData] = useState({
    category: "",
    sub_category: "",
    product_name: "",
    price: 0,
    quantity: 1,
    description: "",
  });

  const handleForm = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formData);

  const quantityArr = [1, 2, 3, 4, 5];

  return (
    <MarginWrapper>
      <section className="p-0 mb-10 bg-white dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Product creation
              </h1>
              <div className="mt-4 flex flex-col gap-2">
                <label className="text-sm font-medium">Select category</label>
                <CategorySelector formData={formData} handleForm={handleForm} />
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-800" />
              <div className="space-y-4 p-1">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Product name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      value={formData.product_name}
                      onChange={handleForm}
                      className="w-full border rounded p-2"
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="sm:w-32">
                    <label className="block text-sm font-medium mb-1">
                      Quantity
                    </label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleForm}
                      className="w-full border rounded p-2 h-10.5"
                    >
                      {quantityArr.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:w-40">
                    <label className="block text-sm font-medium mb-1">
                      Price in BAM
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleForm}
                      className="w-full border rounded p-2"
                      placeholder="Enter price"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description ({formData.description.length} / 500)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleForm}
                    className="w-full h-28 border rounded p-2 resize-none"
                    placeholder="Enter description"
                    maxLength={500}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 rounded border border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                  Clear
                </button>

                <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Create product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarginWrapper>
  );
};
