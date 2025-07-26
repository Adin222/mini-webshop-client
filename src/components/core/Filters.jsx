import {
  FunnelIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export const Filters = () => {
  return (
    <div className="mb-4 flex justify-center space-y-4 sm:flex sm:space-y-0 md:justify-end md:mb-8">
      <div className="flex items-center space-x-4">
        <button
          data-modal-toggle="filterModal"
          data-modal-target="filterModal"
          type="button"
          className="flex w-[100px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <FunnelIcon className="-ms-0.5 me-2 h-4 w-4" />
          Filters
          <ChevronDownIcon className="-me-0.5 ms-2 h-4 w-4" />
        </button>

        <button
          id="sortDropdownButton1"
          data-dropdown-toggle="dropdownSort1"
          type="button"
          className="flex w-[100px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <BarsArrowUpIcon className="-ms-0.5 me-2 h-4 w-4" />
          Sort
          <ChevronDownIcon className="-me-0.5 ms-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
