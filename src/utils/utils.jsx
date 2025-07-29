export const handleCloseToast = (setToastMessage) => {
  setToastMessage({
    status: "",
    open: false,
    message: "",
  });
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
};

export const validate = (formBody, requiredFields) => {
  const errors = {};

  requiredFields.forEach((field) => {
    const value = formBody?.[field];
    if (value === undefined || value === null || value === "" || value <= 0) {
      errors[field] = true;
    }
  });

  return errors;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return null;
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getToken = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookiePart = parts[1];
    return cookiePart.split(";")[0];
  }
  return null;
};
