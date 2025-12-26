const db = require('../config/db');
const bcrypt = require('bcrypt');

async function listUsers(req, res) {
  const { tenantId, role } = req.user;

  const result = await db.query(
    role === 'super_admin'
      ? `SELECT id, email, full_name, role, tenant_id FROM users`
      : `SELECT id, email, full_name, role FROM users WHERE tenant_id = $1`,
    role === 'super_admin' ? [] : [tenantId]
  );

  res.json({ success: true, data: result.rows });
}

async function createUser(req, res) {
  try {
    const { email, password, fullName } = req.body;
    const { tenantId } = req.user;

    if (!email || !password || !fullName) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (email, password_hash, full_name, tenant_id, role)
       VALUES ($1, $2, $3, $4, 'user')
       RETURNING id, email, full_name, role`,
      [email, hashed, fullName, tenantId]
    );

    res.status(201).json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("CREATE USER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const { tenantId, id: requesterId } = req.user;

    // 🔒 Prevent deleting yourself
    if (id === requesterId) {
      return res.status(400).json({ success: false, message: "You cannot delete yourself" });
    }

    await db.query(
      `DELETE FROM users WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    res.status(500).json({ success: false });
  }
}

module.exports = { listUsers, createUser, deleteUser };
