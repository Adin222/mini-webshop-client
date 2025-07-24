export const handleCloseToast = (setToastMessage) => {
  setToastMessage({
    status: "",
    open: false,
    message: "",
  });
};
