const express = require("express");
const { addOrderItems, getMyOrders, getOrderById } = require("../controllers/ordercontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;
