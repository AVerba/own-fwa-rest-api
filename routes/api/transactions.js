const express = require("express");

const ctrl = require(`../../controllers/transaction`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.post("/:type", auth, ctrlWrapper(ctrl.addTransaction));

router.delete("/:transactionId", auth, ctrlWrapper(ctrl.deleteTransaction));

router.get("/:type", auth, ctrlWrapper(ctrl.getTransactionListByType));

router.get("/summary/:type", auth, ctrlWrapper(ctrl.getTransByMonth));

router.get("/", auth, ctrlWrapper(ctrl.getAllTransactions));

router.get("/report/:type", auth, ctrlWrapper(ctrl.getReportTrans));

module.exports = router;
