const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = new Schema(
  {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    income: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addTransactionSchema = Joi.object({
  day: Joi.string().min(2).max(2).required(),
  month: Joi.string().min(2).max(2).required(),
  year: Joi.string().min(4).max(4).required(),
  description: Joi.string().required(),
  categories: Joi.string().required(),
  value: Joi.number().required(),
});

const schemas = {
  add: addTransactionSchema,
};

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  schemas,
};
