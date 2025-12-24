const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { listTasks, createTask } = require('../controllers/taskController');
router.get('/', auth, listTasks);
router.post('/', auth, createTask);
module.exports = router;