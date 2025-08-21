const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  console.log(req.body, "req.body in userAuth middleware");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      if (!req.body) {
        req.body = {};
      }
      req.body.userId = decoded?.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token, Login Again" });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `${error.message} Failed Authentication`,
    });
  }
};

module.exports = userAuth;
