const { createError } = require("../../helpers");
const { Transaction } = require("../../models/transactions");

const getReportTrans = async (req, res) => {
  const { _id: owner } = req.user;
  const { type } = req.params;
  const { month, year } = req.query;

  if (!month && !year) {
    throw createError(400);
  }

  if (month.length !== 2 || year.length !== 4) {
    throw createError(400, "Format must be: `month=02&year=2022`");
  }

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
        month: month,
        year: year,
        income: income,
      },
    },

    {
      $group: {
        _id: {
          categories: "$categories",
          description: "$description",
        },
        totalDescriptionSum: { $sum: "$value" },
      },
    },
    {
      $group: {
        _id: "$_id.categories",
        report: { $push: "$$ROOT" },
        totalCategoriesSum: {
          $sum: "$totalDescriptionSum",
        },
      },
    },

    {
      $project: {
        _id: 1,
        report: 1,
        total: 1,
        totalCategoriesSum: 1,
      },
    },
  ]);

  res.json({
    status: "success",
    code: 200,
    transactions,
  });
};

module.exports = getReportTrans;
