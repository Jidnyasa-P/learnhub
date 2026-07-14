const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized: User not authenticated", success: false });
    }
    const userRole = (req.user.role || req.user.type || "").toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    
    if (!normalizedAllowedRoles.includes(userRole)) {
      return res.status(403).send({ message: "Forbidden: Access denied", success: false });
    }
    next();
  };
};

module.exports = checkRole;
