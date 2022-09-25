const { Transaction } = require("../../models/transactions");
const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndRemove(transactionId);
  const { income, value } = result;
  const { balance, _id } = req.user;

  let newBalance;

  if (income) {
    newBalance = balance - value;
    if (newBalance < 0) {
      throw createError(400, "Balance cannot be less than 0.00");
    }
  } else {
    newBalance = balance + value;
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { balance: newBalance },
    { new: true }
  );
  const currentBalance = user.balance;

  if (!result) {
    throw createError(404);
  }

  res.json({
    message: "transaction deleted",
    currentBalance,
  });
};

module.exports = deleteTransaction;
