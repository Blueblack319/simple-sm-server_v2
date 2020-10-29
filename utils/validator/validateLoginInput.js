const validateLoginInput = (userName, password) => {
  const errors = {};

  if (userName.trim() === "") {
    errors.userName = "User name must not be empty.";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty.";
  }

  return {
    errors,
    validity: Object.keys(errors).length < 1,
  };
};

export default validateLoginInput;
