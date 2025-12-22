function tenantGuard(paramName = 'tenantId') {
  return (req, res, next) => {
    const { role, tenantId } = req.user;
    const requestedTenantId =
      req.params[paramName] || req.body[paramName];
    if (role === 'super_admin') {
      return next();
    }
    if (!requestedTenantId || requestedTenantId !== tenantId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: tenant access denied'
      });
    }
    next();
  };
}
module.exports = tenantGuard;