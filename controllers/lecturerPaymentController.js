import LecturerPayment from "../models/lecturerPayment.js";
import { isItAdmin } from "./userController.js";



// Add a new lecturer payment
export function addLecturerPayment(req, res) {
  if (!req.user || !isItAdmin(req)) {
    return res.status(401).json({ msg: "You are not authorized" });
  }

  const paymentData = req.body;
  const newPayment = new LecturerPayment(paymentData);

  newPayment.save()
    .then(() => {
      res.json({ msg: "New lecturer payment added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

// Get all lecturer payments
export async function getAllLecturerPayments(req, res) {
  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const payments = await LecturerPayment.find();
    res.json(payments);

  } catch (error) {
    res.status(500).json({ error });
  }
}

// Get a specific lecturer payment by lecturer ID
export async function getLecturerPayment(req, res) {
  const lid = req.params.id;

  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const payment = await LecturerPayment.findOne({ lid });

    if (!payment) {
      return res.status(404).json({ msg: "Lecturer payment not found" });
    }

    res.json(payment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a lecturer payment
export async function updateLecturerPayment(req, res) {
  const lid = req.params.id;
  const updatedData = req.body;

  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const result = await LecturerPayment.findOneAndUpdate(
      { lid },
      updatedData,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Lecturer payment not found" });
    }

    res.json({ msg: "Lecturer payment updated successfully", data: result });

  } catch (error) {
    res.status(500).json({ msg: "Lecturer payment update failed", error });
  }
}

// Delete a lecturer payment
export async function deleteLecturerPayment(req, res) {
  const lid = req.params.id;

  try {
    if (!isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const result = await LecturerPayment.findOneAndDelete({ lid });

    if (!result) {
      return res.status(404).json({ msg: "Lecturer payment not found" });
    }

    res.json({ msg: "Lecturer payment deleted successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Lecturer payment deletion failed", error });
  }
}
