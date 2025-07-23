import { Dialog } from "@headlessui/react";

export const ToastMessage = ({ toastMessage }) => {
  const { status, message, open } = toastMessage;

  if (!open) return;

  const Path = (status) => {
    if (status === "success")
      return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z";
    else if (status === "warning")
      return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z";
    else
      return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z";
  };

  const classType = (status) => {
    if (status === "success") return "bg-green-100 text-green-500";
    else if (status === "danger")
      return "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
    else
      return "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200";
  };

  return (
    <div
      id="toast-bottom-left"
      className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-gray-50 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-md bottom-5 left-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
      role="alert"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className={`
    inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg dark:bg-green-800 dark:text-green-200 ${classType(
      status
    )}`}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={Path(status)}
          />
        </svg>
      </div>

      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target={`#toast-${status}`}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};
