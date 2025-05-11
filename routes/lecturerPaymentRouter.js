import express from "express";
import {
  addLecturerPayment,
  getAllLecturerPayments,
  getLecturerPayment,
  updateLecturerPayment,
  deleteLecturerPayment
} from "../controllers/lecturerPaymentController.js";

const router = express.Router();

router.post("/add", addLecturerPayment);
router.get("/", getAllLecturerPayments);
router.get("/:id", getLecturerPayment);
router.put("/:id", updateLecturerPayment);
router.delete("/:id", deleteLecturerPayment);

export default router;
