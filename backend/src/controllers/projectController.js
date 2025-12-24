const db = require('../config/db');
const { logAudit } = require('../utils/auditLogger');
async function listProjects(req,res){
  const { tenantId } = req.user;
  const result = await db.query(
    `SELECT * FROM projects WHERE tenant_id=$1`,
    [tenantId]
  );
  res.json({ success:true, data: result.rows });
}
async function createProject(req,res){
  const { tenantId, userId } = req.user;
  const { name, description } = req.body;
  const result = await db.query(
    `INSERT INTO projects (tenant_id,name,description,status,created_by)
     VALUES ($1,$2,$3,'active',$4) RETURNING *`,
    [tenantId,name,description,userId]
  );
  await logAudit({ tenantId, userId, action:'CREATE_PROJECT', entityType:'project', entityId:result.rows[0].id });
  res.status(201).json({ success:true, data: result.rows[0] });
}
module.exports = { listProjects, createProject };