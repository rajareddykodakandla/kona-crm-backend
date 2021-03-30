const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const leadController = require('../controller/leads.controller')
const router = express.Router();
const leadcontroller = new leadController();

router.post("/createlead", isAuthenticated, leadcontroller.createlead);
router.put("/editlead", isAuthenticated, leadcontroller.editlead)
router.get("/allleads", isAuthenticated, leadcontroller.getAllLeads)
router.delete("/removelead", isAuthenticated, leadcontroller.removelead)

module.exports = router;