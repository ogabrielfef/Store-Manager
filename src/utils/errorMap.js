const errorMap = {
  INVALID_VALUE: 400,
  NOT_FOUND: 404,
  FORMAT_INVALID: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
