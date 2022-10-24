const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return (result);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return (product);
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);', [name],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
