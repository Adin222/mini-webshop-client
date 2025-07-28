export const FilterModal = ({
  filterModal,
  setFilterModal,
  filterData,
  handleFilterData,
  buildQueryString,
  clearFilter,
}) => {
  if (!filterModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-black/40 flex items-center justify-center z-50"
      onClick={() => setFilterModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Product filter
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Product name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleFilterData}
              value={filterData.name}
              placeholder="product name"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Minimum price
            </label>
            <input
              type="number"
              min={0}
              name="min_price"
              onChange={handleFilterData}
              value={filterData.min_price}
              placeholder="min price"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Maximum price
            </label>
            <input
              type="number"
              min={0}
              name="max_price"
              value={filterData.max_price}
              onChange={handleFilterData}
              placeholder="max price"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <input
              type="number"
              min={0}
              name="quantity"
              onChange={handleFilterData}
              value={filterData.quantity}
              placeholder="quantity"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setFilterModal(false);
              clearFilter();
            }}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Close
          </button>

          <button
            onClick={buildQueryString}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
