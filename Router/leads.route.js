const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const leadController = require('../controller/leads.controller')
const router = express.Router();
const leadcontroller = new leadController();

router.param("leadId", leadcontroller.getLeadbyId);

router.get("/lead/:leadId", isAuthenticated, leadcontroller.getLead)
router.post("/createlead", isAuthenticated, leadcontroller.createlead);
router.put("/editlead/:leadId", isAuthenticated, leadcontroller.editlead)
router.get("/allleads", isAuthenticated, leadcontroller.getAllLeads)
router.delete("/removelead/:leadId", isAuthenticated, leadcontroller.removelead)

module.exports = router;