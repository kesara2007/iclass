import StudentPayment from "../models/studentPayment.js";
import { isItAdmin } from "./userController.js";

// Add a new student payment
export function addPayment(req, res) {
  if (!req.user || !isItAdmin(req)) {
    return res.status(401).json({ msg: "You are not authorized" });
  }

  const paymentData = req.body;
  const newPayment = new StudentPayment(paymentData);

  newPayment.save()
    .then(() => {
      res.json({ msg: "New payment added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

// Get all student payments
export async function getAllPayments(req, res) {
  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const payments = await StudentPayment.find().populate("sid");
    res.json(payments);

  } catch (error) {
    res.status(500).json({ error });
  }
}

// Get a specific payment by ID
export async function getPayment(req, res) {
  const sid = req.params.id;

  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const payment = await StudentPayment.findOne({ sid }).populate("sid");

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.json(payment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a payment
export async function updatePayment(req, res) {
  const sid = req.params.id;
  const updatedData = req.body;

  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const result = await StudentPayment.findOneAndUpdate(
      { sid },
      updatedData,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.json({ msg: "Payment updated successfully", data: result });

  } catch (error) {
    res.status(500).json({ msg: "Payment update failed", error });
  }
}


// Delete a payment
export async function deletePayment(req, res) {
  const sid = req.params.id;

  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const result = await StudentPayment.findOneAndDelete({ sid });

    if (!result) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.json({ msg: "Payment deleted successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Payment deletion failed", error });
  }
}

