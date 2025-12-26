const db = require('../config/db');
const { logAudit } = require('../utils/auditLogger');

async function listProjects(req, res) {
  const { tenantId } = req.user;

  const result = await db.query(
    `SELECT * FROM projects WHERE tenant_id = $1 ORDER BY created_at DESC`,
    [tenantId]
  );

  res.json({ success: true, data: result.rows });
}

async function createProject(req, res) {
  try {
    const { tenantId, id: userId } = req.user;
    const { name, description } = req.body;

    const result = await db.query(
      `INSERT INTO projects (tenant_id, name, description, status, created_by)
       VALUES ($1, $2, $3, 'active', $4)
       RETURNING *`,
      [tenantId, name, description || '', userId]
    );

    await logAudit({
      tenantId,
      userId,
      action: 'CREATE_PROJECT',
      entityType: 'project',
      entityId: result.rows[0].id
    });

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to create project" });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    await db.query(
      `DELETE FROM projects WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    res.status(500).json({ success: false });
  }
}

module.exports = { listProjects, createProject, deleteProject };
