const Leads = require('../model/leads.model')

class leadService {
    getAllLeads() {
        return Leads.find()
    }
    getLeadById(leadid) {
        return Leads.findById(leadid);
    }
    createLeads(leadinfo) {
        const lead = new Leads(leadinfo)
        return lead.save();
    }
    editlead(lead) {
        return Leads.findByIdAndUpdate(lead._id, { $set: lead }, { new: true, useFindAndModify: false })
    }
    removeLead(id) {
        return Leads.findByIdAndRemove(id, { new: true, useFindAndModify: false })
    }

    //NOTES//
    createnotes(id, notes) {
        return Leads.findByIdAndUpdate(id, { $push: { notes: notes } }, { new: true, useFindAndModify: false })
    }
    removenote(leadid, noteid) {
        return Leads.findOneAndUpdate({ _id: leadid }, { $pull: { notes: { noteId: noteid } } }, { new: true })
    }
    updatenote(lead) {
        return Leads.findByIdAndUpdate(lead._id, { $set: lead }, { new: true, useFindAndModify: false })
    }

    //TASKS//
    createtask(id, task) {
        return Leads.findByIdAndUpdate(id, { $push: { tasks: task } }, { new: true, useFindAndModify: false })
    }
    removetask(leadid, taskid) {
        return Leads.findOneAndUpdate({ _id: leadid }, { $pull: { tasks: { taskId: taskid } } }, { new: true })
    }
    updatetask(lead) {
        return Leads.findByIdAndUpdate(lead._id, { $set: lead }, { new: true, useFindAndModify: false })
    }

    //checkList//
    creatchecklist(id, checklist) {
        return Leads.findByIdAndUpdate(id, { $push: { checkList: checklist } }, { new: true, useFindAndModify: false })
    }
    checklistisdone(lead) {
        return Leads.findByIdAndUpdate(lead._id, { $set: lead }, { new: true, useFindAndModify: false })
    }
    removechecklist(id) {
        return Leads.findByIdAndUpdate(id, { $unset: { checkList: 1 } }, { new: true, useFindAndModify: false })
    }

}

module.exports = leadService