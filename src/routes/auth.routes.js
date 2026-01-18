const router = require("express").Router();
const { registerAdmin, loginAdmin,logoutAdmin } = require("../controllers/auth.controller");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout",logoutAdmin);

module.exports = router;
