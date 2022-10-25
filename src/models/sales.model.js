const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT  p.sale_id, s.date, p.product_id, p.quantity FROM StoreManager.sales 
    AS s INNER JOIN StoreManager.sales_products AS p ON p.sale_id = s.id `,
  );
  return camelize(result);
};

const findSalesById = async (salesId) => {
  const [[sale]] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity FROM StoreManager.sales AS s
     INNER JOIN StoreManager.sales_products AS p ON p.sale_id = s.id
     WHERE p.sale_id = ? `,
    [salesId],
  );
  return camelize(sale);
};

// const addSales = async () => {
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
//   );

//   return insertId;
// };

module.exports = {
  findAllSales,
  findSalesById,
  // addSales,
};
