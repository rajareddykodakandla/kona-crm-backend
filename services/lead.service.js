const Leads = require('../model/leads.model')

class leadService {
    getAllLeads(){
        return Leads.find()
    }
    getLeadById(leadid){
        return Leads.findById(leadid);
    }
    createLeads(leadinfo) {
        const lead = new Leads(leadinfo)
        return lead.save();
    }
    editlead(id){
        return Leads.findByIdAndUpdate(id, { $set: lead }, { new: true, useFindAndModify: false })
    }
    removeLead(id){
        return Leads.findByIdAndRemove(id, { new: true, useFindAndModify: false })
    }
}

module.exports = leadService