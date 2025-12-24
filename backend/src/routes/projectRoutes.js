const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { listProjects, createProject } = require('../controllers/projectController');
router.get('/', auth, listProjects);
router.post('/', auth, createProject);
module.exports = router;