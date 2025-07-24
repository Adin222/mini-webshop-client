import { useEffect } from "react";
import { handleCloseToast } from "../utils/utils";

const COLORS = {
  danger: {
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-500",
    heading: "text-red-800",
    close: "text-red-400 hover:text-red-500",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-100",
    text: "text-green-500",
    heading: "text-green-800",
    close: "text-green-400 hover:text-green-500",
  },
  warning: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-500",
    heading: "text-orange-800",
    close: "text-orange-400 hover:text-orange-500",
  },
};

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ToastMessage = ({ toastMessage, setToastMessage }) => {
  const { status, message, open } = toastMessage;

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      handleCloseToast(setToastMessage);
    }, [2500]);

    return () => clearTimeout(timer);
  }, [open, handleCloseToast]);

  if (!open) return null;

  const colors = COLORS[status] || COLORS.warning;

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-3 w-80">
      <div
        className={`toast flex items-start p-4 ${colors.bg} rounded-lg border ${colors.border} shadow-lg`}
      >
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 ${colors.text}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {status === "success" && (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            )}
            {status === "warning" && (
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            )}
            {status === "danger" && (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${colors.heading}`}>
            {capitalize(status)}
          </h3>
          <p className={`mt-1 text-sm ${colors.text}`}>{message}</p>
        </div>
        <button
          onClick={() => handleCloseToast(setToastMessage)}
          className={`ml-auto ${colors.close}`}
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
