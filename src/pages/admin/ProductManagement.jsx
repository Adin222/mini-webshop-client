import React, { useState } from "react";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import { CategorySelector } from "../../components/admin/CategorySelector";
import { validate } from "../../utils/utils";
import { productFields } from "../../utils/constants";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { ToastMessage } from "../../components/core/ToastMessage";

export const ProductManagement = () => {
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();
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
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };

  const handleClearForm = () => {
    setFormData({
      category: "",
      sub_category: "",
      product_name: "",
      price: 0,
      quantity: 1,
      description: "",
    });
    setErrors({});
  };

  const quantityArr = [1, 2, 3, 4, 5];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, productFields);
    if (!image) validationErrors.image = true;
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid, submitting...");
    }
  };

  return (
    <React.Fragment>
      <MarginWrapper>
        <section className="p-0 mb-10 bg-white dark:bg-gray-900 -mt-5 antialiased">
          <div className="max-w-screen-xl mx-auto 2xl:px-0">
            <form onSubmit={handleSubmit}>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <ImageUploader
                  image={image}
                  setImage={setImage}
                  errors={errors}
                  setErrors={setErrors}
                />

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    Product creation
                  </h1>

                  <div className="mt-4 flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      Select category
                    </label>
                    <CategorySelector
                      formData={formData}
                      handleForm={handleForm}
                      errors={errors}
                    />
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
                          className={`w-full border rounded p-2 ${
                            errors.product_name
                              ? "border-red-500"
                              : "border-black-300"
                          }`}
                          placeholder="Enter name"
                        />
                        {errors.product_name && (
                          <p className="text-xs text-red-500">
                            product name cannot be empty
                          </p>
                        )}
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
                          className={`w-full border rounded p-2 ${
                            errors.price ? "border-red-500" : "border-black-300"
                          }`}
                          placeholder="Enter price"
                        />
                        {errors.price && (
                          <p className="text-xs text-red-500">
                            Price can't be empty or less than 1
                          </p>
                        )}
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
                        className={`w-full h-28 border rounded p-2 resize-none ${
                          errors.description
                            ? "border-red-500"
                            : "border-black-300"
                        }`}
                        placeholder="Enter description"
                        maxLength={500}
                      />
                      {errors.description && (
                        <p className="text-xs text-red-500">
                          description cannot be empty
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="px-4 py-2 rounded border border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Create product
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </MarginWrapper>
    </React.Fragment>
  );
};
