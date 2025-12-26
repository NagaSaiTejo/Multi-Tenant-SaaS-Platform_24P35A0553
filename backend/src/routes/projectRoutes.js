const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { listProjects, createProject, deleteProject } = require("../controllers/projectController");

router.get("/", auth, listProjects);
router.post("/", auth, createProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;
