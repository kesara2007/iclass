import express from "express";
import { addPayment, updatePayment, deletePayment, getAllPayments, getPayment } from "../controllers/studentPaymentController.js";
const router = express.Router();

router.post("/add", addPayment);
router.get("/", getAllPayments);
router.get("/:id", getPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
