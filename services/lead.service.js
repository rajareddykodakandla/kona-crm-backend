const Leads = require('../model/leads.model')

class leadService {
    getAllLeads(){
        return Leads.find()
    }
    createLeads(leadinfo) {
        const lead = new Leads(leadinfo)
        return lead.save();
    }
    editlead(lead){
        return Leads.findByIdAndUpdate(lead._id, { $set: lead }, { new: true, useFindAndModify: false })
    }
    removeLead(id){
        return Leads.findByIdAndRemove(id, { new: true, useFindAndModify: false })
    }
}

module.exports = leadService