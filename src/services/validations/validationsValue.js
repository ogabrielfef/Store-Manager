const { idSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const MESSAGE_LENGTH = '"name" length must be at least 5 characters long';
const MESSAGE_REQUIRED = '"name" is required';

const validateName = (name) => {
  if (!name) {
    return { type: 'INVALID_VALUE', message: MESSAGE_REQUIRED };
  }
  if (name.length < 5) {
    return { type: 'FORMAT_INVALID', message: MESSAGE_LENGTH };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
};
