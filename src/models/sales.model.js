const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT  p.sale_id, s.date, p.product_id, p.quantity FROM StoreManager.sales 
    AS s INNER JOIN StoreManager.sales_products AS p ON p.sale_id = s.id `,
  );
  return camelize(sales);
};

const findById = async (salesId) => {
  const [sale] = await connection.execute(
  `SELECT s.date, p.product_id, p.quantity FROM StoreManager.sales AS s
     INNER JOIN StoreManager.sales_products AS p ON p.sale_id = s.id
     WHERE p.sale_id = ? `,
    [salesId],
  );
  return camelize(sale);
};

module.exports = {
  findAll,
  findById,
};
