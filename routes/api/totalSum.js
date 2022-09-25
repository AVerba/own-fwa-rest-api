const express = require("express");

const ctrl = require(`../../controllers/totalSum`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getTotalSum));

module.exports = router;
