const db = require('../config/db');
const { logAudit } = require('../utils/auditLogger');
async function listTasks(req,res){
  const { tenantId } = req.user;
  const result = await db.query(
    `SELECT * FROM tasks WHERE tenant_id=$1`,
    [tenantId]
  );
  res.json({ success:true, data: result.rows });
}
async function createTask(req,res){
  const { tenantId, userId } = req.user;
  const { projectId, title, priority } = req.body;

  const result = await db.query(
    `INSERT INTO tasks (project_id,tenant_id,title,status,priority)
     VALUES ($1,$2,$3,'todo',$4) RETURNING *`,
    [projectId, tenantId, title, priority]
  );
  await logAudit({ tenantId, userId, action:'CREATE_TASK', entityType:'task', entityId:result.rows[0].id });
  res.status(201).json({ success:true, data: result.rows[0] });
}
module.exports = { listTasks, createTask };