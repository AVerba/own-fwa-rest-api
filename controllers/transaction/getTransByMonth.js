const { createError } = require("../../helpers");
const { Transaction } = require("../../models/transactions");

const getTransByMonth = async (req, res) => {
  const { _id: owner } = req.user;

  const { type } = req.params;

  let income;

  if (type === "income") {
    income = true;
  } else if (type === "expense") {
    income = false;
  }

  if (income === undefined) {
    throw createError(400);
  }

  const transactions = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        income: income,
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year",
          income: "$income",
        },
        total: { $sum: "$value" },
      },
    },
    {
      $project: {
        _id: 1,
        income: 1,
        total: 1,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  res.json({
    status: "success",
    code: 200,
    transactions,
  });
};

module.exports = getTransByMonth;
