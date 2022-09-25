const { createError } = require("../../helpers");
const { Transaction } = require("../../models/transactions");

const getTotalSum = async (req, res) => {
  const { _id: owner } = req.user;
  const { month, year } = req.query;
  if (!month && !year) {
    throw createError(400);
  }
  if (month.length !== 2 || year.length !== 4) {
    throw createError(400, "Format must be: `month=02&year=2022`");
  }
  const transactionsByType = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        month: month,
        year: year,
      },
    },
    {
      $group: {
        _id: {
          categories: "$categories",
          description: "$description",
          income: "$income",
          value: "$value",
        },
      },
    },
    {
      $group: {
        _id: "$_id.income",
        totalSum: { $sum: "$_id.value" },
      },
    },
    {
      $project: {
        _id: 1,
        totalSum: 1,
      },
    },
  ]);
  res.json({
    data: transactionsByType,
  });
};

module.exports = getTotalSum;
