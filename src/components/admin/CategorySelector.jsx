import { categoryOptions } from "../../utils/constants";

export const CategorySelector = ({ formData, handleForm, errors }) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="w-1/2">
        <label className="block text-sm">Category</label>
        <select
          value={formData.category}
          name="category"
          onChange={handleForm}
          className={`mt-1 block w-full border rounded p-2 ${
            errors.category ? "border-red-500" : "border-black-300"
          }`}
        >
          <option value="">Select category</option>
          {Object.keys(categoryOptions).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500">category cannot be empty</p>
        )}
      </div>

      <div className="w-1/2">
        <label className="block text-sm">Subcategory</label>
        <select
          value={formData.sub_category}
          name="sub_category"
          onChange={handleForm}
          disabled={!formData.category}
          className={`mt-1 block w-full border rounded p-2 
    ${
      !formData.category
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : `bg-white cursor-pointer ${
            errors.sub_category ? "border-red-500" : "border-black-300"
          }`
    }`}
        >
          <option value="">Select subcategory</option>
          {formData.category &&
            categoryOptions[formData.category].map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
        {errors.sub_category && (
          <p className="text-xs text-red-500">sub category cannot be empty</p>
        )}
      </div>
    </div>
  );
};
