import School from "../models/schoolModel.js";
import { isItAdmin } from "./userController.js";


async function generateSchoolID() {
  const lastSchool = await School.findOne().sort({ schoolId: -1 });

  if (!lastSchool || !lastSchool.schoolId) {
    return "SCH001";
  }

  const lastIdNum = parseInt(lastSchool.schoolId.replace("SCH", ""), 10);
  const newIdNum = lastIdNum + 1;
  return `SCH${String(newIdNum).padStart(3, "0")}`;
}

export async function addSchool(req, res) {
  try {
    if (!req.user || !isItAdmin(req)) {
      return res.status(403).json({ msg: "You are not authorized" });
    }

    const newId = await generateSchoolID();
    const newSchool = new School({
    schoolId: newId,
    name: req.body.name
    });

    await newSchool.save();
    res.json({ msg: "New school added successfully", school: newSchool });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Get all schools
export async function getAllSchools(req, res) {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get one school by schoolId
export async function getSchool(req, res) {
  const schoolId = req.params.id;

  try {
    const school = await School.findOne({ schoolId });
    if (!school) {
      return res.status(404).json({ msg: "School not found" });
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update school
export async function updateSchool(req, res) {
  const schoolId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await School.findOneAndUpdate({ schoolId }, updatedData, { new: true });
    if (!result) {
      return res.status(404).json({ msg: "School not found" });
    }
    res.json({ msg: "School updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ msg: "Update failed", error });
  }
}

// Delete school
export async function deleteSchool(req, res) {
  const schoolId = req.params.id;

  try {
    const result = await School.findOneAndDelete({ schoolId });
    if (!result) {
      return res.status(404).json({ msg: "School not found" });
    }
    res.json({ msg: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Deletion failed", error });
  }
}
