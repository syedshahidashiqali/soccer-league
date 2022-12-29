exports.apiSuccessWithData = (message, data) => {
  const res = {
    status: true,
    message: message,
    data: data,
  };
  return res;
};

exports.apiSuccess = (message) => {
  const res = {
    status: true,
    message: message,
  };
  return res;
};

exports.apiError = (message) => {
  const res = {
    status: false,
    message: message,
  };
  return res;
};

exports.apiValidationErrors = (errors) => {
  const res = {
    status: false,
    message: "Validation errors",
    errors: errors,
  };
  return res;
};
