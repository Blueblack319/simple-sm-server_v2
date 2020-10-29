const signupValidator = (userName, email, password, confirmPassword) => {
  const errors = {};

  if (userName.trim() === "") {
    errors.userName = "User name must not be empty.";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!email.match(regExp)) {
      errors.email = "Email must be a valid email address.";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must be matched.";
  }
  return {
    errors,
    validity: Object.keys(errors).length < 1,
  };
};

export default signupValidator;
