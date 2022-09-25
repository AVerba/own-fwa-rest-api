const { User } = require("../../models/user");

const { Transaction, schemas } = require("../../models/transactions");

const { createError } = require("../../helpers");

const addTransaction = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { _id, balance } = req.user;

  const { type } = req.params;

  const { value, categories } = req.body;

  let newBalance, income;
  switch (type) {
    case "income":
      newBalance = balance + value;
      income = true;
      break;
    case "expense":
      newBalance = balance - value;
      income = false;
      break;
    default:
      return;
  }

  if (newBalance < 0) {
    throw createError(400, "Balance cannot be less than 0.00");
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { balance: newBalance },
    { new: true }
  );
  const currentBalance = user.balance;
  const transaction = await Transaction.create({
    ...req.body,
    categories,
    income,
    owner: _id,
  });
  if (transaction === undefined) {
    throw createError(404);
  }

  if (transaction === null) {
    throw createError(
      409,
      "You cannot create a transaction that exceeds the balance"
    );
  }

  res.status(201).json({ transaction, currentBalance });
};

module.exports = addTransaction;
