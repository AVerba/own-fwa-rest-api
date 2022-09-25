const { User, schemas } = require(`../../models/user`);
const { createError } = require(`../../helpers`);

const updateBalance = async (req, res) => {
  const { error } = schemas.updateBalanceSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { _id } = req.user;
  const { balance } = req.body;
  if (balance <= 0) {
    throw createError(400, "Balance must be greater than 0");
  }
  const result = await User.findByIdAndUpdate(_id, { balance }, { new: true });
  res.status(200).json({ email: result.email, balance: result.balance });
};

module.exports = updateBalance;
