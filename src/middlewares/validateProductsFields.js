module.exports = (req, res, next) => {
  const { productId } = req.params;

  if (!productId) return res.status(400).json({ message: '"passengerId" not passed' });

  return next();
};
