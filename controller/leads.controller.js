const leadService = require('../services/lead.service')
const mongoose = require('mongoose');
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

    async getLeadbyId(req, res, next, id) {
        try {
            const lead = await leadservice.getLeadById(id)
            if (!lead) {
                return res.status(400).json({
                    error: "No lead found"
                })
            }
            req.lead = lead;
            next();
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async getLead(req, res) {
        return res.json(req.lead);
    }

    async editlead(req, res) {
        try {
            const updatedlead = await leadservice.editlead(req.body)
            if (!updatedlead) {
                return res.status(400).json({
                    error: "unable to update"
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

    async getAllLeads(req, res) {
        try {
            const allleads = await leadservice.getAllLeads()
            if (!allleads) {
                return res.json({
                    message: "No leads found"
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

    async removelead(req, res) {
        try {
            const lead = await leadservice.removeLead(req.lead._id)
            if (!lead) {
                return res.status(400).json({
                    error: "lead not found"
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

    async createnotes(req, res) {
        try {
            let id = mongoose.Types.ObjectId().toString();
            req.body.noteId = id;
            const notes = await leadservice.createnotes(req.lead._id, req.body);
            if (!notes) {
                return res.status(400).json({
                    error: "Unable to create the notes"
                })
            }
            res.json(notes);
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async removenotes(req, res) {
        try {
            const note = await leadservice.removenote(req.lead._id, req.body.noteId);
            if (!note) {
                return res.status(400).json({
                    error: "unable to remove the note"
                })
            }
            res.json(note);
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async updatenotes(req, res) {
        try {
            req.lead.notes.map(note => {
                if (note.noteId == req.body.noteId) {
                    note.note = req.body.note;
                }
            });
            console.log(req.lead);
            const notes = await leadservice.updatenote(req.lead);
            if (!notes) {
                return res.status(400).json({
                    error: "unable to update the note"
                })
            }
            res.json(notes);
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async createtask(req, res) {
        try {
            let id = mongoose.Types.ObjectId().toString();
            req.body.taskId = id;
            console.log(req.body);
            const tasks = await leadservice.createtask(req.lead._id, req.body);
            if (!tasks) {
                return res.status(400).json({
                    error: "unable to create task"
                })
            }
            res.json(tasks)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async removetask(req, res) {
        try {
            const task = await leadservice.removetask(req.lead._id, req.body.taskId);
            if (!task) {
                return res.status(400).json({
                    error: "unable to remove the task"
                })
            }
            res.json(task)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async updatetask(req, res) {
        try {
            req.lead.tasks.map(task => {
                if (task.taskId == req.body.taskId) {
                    task.tasktitle = req.body.tasktitle;
                    task.task = req.body.task;
                }
            })
            const task = await leadservice.updatetask(req.lead)
            if (!task) {
                return res.status(400).json({
                    error: "Unable to update the task"
                })
            }
            res.json(task);
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async createchecklist(req, res) {
        try {
            let id = mongoose.Types.ObjectId().toString();
            req.body.listId = id;
            req.body.isdone = false;
            const checklist = await leadservice.creatchecklist(req.lead._id, req.body);
            if (!checklist) {
                return res.status(400).json({
                    error: "Unable to create checklist"
                })
            }
            res.json(checklist)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async checklistisdone(req, res) {
        try {
            req.lead.checkList.map(item => {
                if (item.listId == req.body.listId) {
                    if (item.isdone != true) {
                        item.isdone = true
                    } else {
                        item.isdone = false
                    }
                }
            })
            const checklist = await leadservice.checklistisdone(req.lead);
            if (!checklist) {
                return res.status(400).json({
                    error: "error to update the isdone flag"
                })
            }
            res.json(checklist.checkList);
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }

    async removecompletechecklist(req, res) {
        try {
            const lead = await leadservice.removechecklist(req.lead._id);
            if (!lead) {
                return res.status(400).json({
                    error: "Unbale to remove checklist"
                })
            }
            res.json(lead.checkList)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Server error"
            })
        }
    }


}

module.exports = leadcontroller


{/*reviewModel.aggregate([
    {$match: {productId: id}},
    {$group: {_id: '$rating', count: {$sum: 1}}},
    {$project: {
       rating: '$_id',
       _id: 0,
        count: '$count'
    }}
]).exec();*/}