const leadService = require('../services/lead.service')
const leadservice = new leadService();

class leadcontroller {
    async createlead(req, res) {
        try {
            const lead = await leadservice.createLeads(req.body)
            if (!lead) {
                return res.status(400).json({
                    error: "Unable to create the lead"
                })
            }
            res.json(lead)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async editlead(req, res){
        try{
            const updatedlead = await leadservice.editlead(req.body)
            if(!updatedlead){
                return res.status(400).json({
                    error:"unable to update"
                })
            }
            res.json(updatedlead)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async getAllLeads(req, res){
        try{
            const allleads = await leadservice.getAllLeads()
            if(!allleads){
                return res.json({
                    message:"No leads found"
                })
            }
            res.json(allleads)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async removelead(req, res){
        try{
            const lead = await leadservice.removeLead(req.body._id)
            if(!lead){
                return res.status(400).json({
                    error:"lead not found"
                })
            }
            res.json(lead)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }
}

module.exports = leadcontroller