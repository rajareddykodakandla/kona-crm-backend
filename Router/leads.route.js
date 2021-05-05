const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const leadController = require('../controller/leads.controller')
const router = express.Router();
const leadcontroller = new leadController();

router.param("leadId", leadcontroller.getLeadbyId);

router.get("/lead/:leadId", isAuthenticated, leadcontroller.getLead)
router.post("/createlead", isAuthenticated, leadcontroller.createlead);
router.put("/editlead", isAuthenticated, leadcontroller.editlead);
router.get("/allleads", isAuthenticated, leadcontroller.getAllLeads);
router.delete("/removelead/:leadId", isAuthenticated, leadcontroller.removelead);

router.put("/cretenotes/:leadId", isAuthenticated, leadcontroller.createnotes);
router.put("/removenotes/:leadId", isAuthenticated, leadcontroller.removenotes);
router.put("/updatenotes/:leadId", isAuthenticated, leadcontroller.updatenotes);

router.put("/createtask/:leadId", isAuthenticated, leadcontroller.createtask);
router.put("/removetask/:leadId", isAuthenticated, leadcontroller.removetask);
router.put("/updatetask/:leadId", isAuthenticated, leadcontroller.updatetask);

router.put("/cratechecklist/:leadId", isAuthenticated, leadcontroller.createchecklist);
router.put("/checklistisdone/:leadId", isAuthenticated, leadcontroller.checklistisdone);
router.put("/removechecklist/:leadId", isAuthenticated, leadcontroller.removecompletechecklist);

module.exports = router;