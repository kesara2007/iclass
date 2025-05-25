import express from "express";
import { addSchool, deleteSchool, getAllSchools, getSchool, updateSchool } from "../controllers/schoolController.js";

const router = express.Router();

router.post("/add", addSchool);
router.get("/", getAllSchools);
router.get("/:id", getSchool);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);


export default router;
