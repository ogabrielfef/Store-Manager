const express = require('express');

const { productRoutes } = require('./routers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
// app.get('/products', async (req, res) => {
//   const products = await productService.findAll();

//   return res.status(200).json(products);
// });

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const talker = await productService.findById(Number(id));

//   return res.status(200).json(talker);
// });

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;