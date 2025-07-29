import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { MarginWrapper } from "../../components/core/MarginWrapper";
import { useQuery } from "@tanstack/react-query";
import { validate } from "../../utils/utils";
import { productFields } from "../../utils/constants";
import { ToastMessage } from "../../components/core/ToastMessage";
import { Loading } from "../../components/core/Loading";

// Firebase
import { storage } from "../../firebase/firebaseSDK";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Services
import { Get, Patch } from "../../services/services";

// Paths
import { getProductById } from "../../paths/paths";

export const EditProduct = () => {
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const product_id = params.product_id;

  const { data, isLoading } = useQuery({
    queryKey: ["product-item", product_id],
    queryFn: () => Get(`${getProductById}${product_id}`),
    retry: false,
  });

  const [formData, setFormData] = useState({
    product_name: "",
    price: 0,
    quantity: 1,
    description: "",
  });

  useEffect(() => {
    if (data) {
      const product = data.data.product;
      setFormData({
        product_name: product.product_name || "",
        price: product.price || 0,
        quantity: product.quantity || 1,
        description: product.description || "",
      });
      setImagePreview(product.image_url || "");
    }
  }, [data]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({ file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, productFields);
    setErrors(validationErrors);
    setLoading(true);

    try {
      let imageUrl = imagePreview;
      console.log("handleSubmit triggered");
      if (image) {
        const imageRef = ref(storage, `product_picture/${image.file.name}`);
        await uploadBytes(imageRef, image.file);
        imageUrl = await getDownloadURL(imageRef);
      }
      console.log("handleSubmit triggered");
      const payload = {
        product_name: formData.product_name,
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        image_url: imageUrl,
      };
      console.log("handleSubmit triggered");
      const response = await Patch(getProductById, payload, product_id);

      if (response.status === 200) {
        setToastMessage({
          status: "success",
          open: true,
          message: "Product updated successfully!",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setToastMessage({
          status: "danger",
          open: true,
          message: response.data.detail || "Something went wrong.",
        });
      }
    } catch (error) {
      setToastMessage({
        status: "danger",
        open: true,
        message: "Internal server error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  const quantityArr = [1, 2, 3, 4, 5];

  return (
    <>
      <MarginWrapper>
        <section className="p-0 mb-10 bg-white dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl mx-auto 2xl:px-0">
            <form onSubmit={handleSubmit}>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="object-contain w-full h-full rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    Edit product
                  </h1>
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
                            Product name cannot be empty
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
                            Price must be greater than 0
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
                          Description cannot be empty
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </MarginWrapper>
      <ToastMessage
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </>
  );
};
