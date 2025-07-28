export const SortModal = ({
  sortModal,
  setSortModal,
  filterData,
  handleFilterData,
  buildQueryString,
  clearFilter,
}) => {
  if (!sortModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-black/40 flex items-center justify-center z-50"
      onClick={() => setSortModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Sorting
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Date sorting
            </label>
            <select
              onChange={handleFilterData}
              name="sort"
              value={filterData.sort}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="desc">Newest first (DESC)</option>
              <option value="asc">Oldest first (ASC)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setSortModal(false);
              clearFilter(false);
            }}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Close
          </button>

          <button
            onClick={buildQueryString}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Apply sorting
          </button>
        </div>
      </div>
    </div>
  );
};
