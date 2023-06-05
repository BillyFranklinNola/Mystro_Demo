const Gig = require('../models/gig.model');

module.exports = {
    
    allGigs: (req, res) => {
        Gig.find()
            .then(allGigs => res.json(allGigs))
            .catch(err => res.json({ message: 'Something went wrong', error: err }))
},

    createGig: (req, res) => {
        Gig.create(req.body)
            .then(addNewGig => res.json({ gig: addNewGig}))
            .catch((err) => {res.status(400).json(err)})
},

    oneGig: (req, res) => {
        Gig.findOne({ _id: req.params.id })
            .then(oneGig => res.json({ gig: oneGig}))
            .catch(err => res.json({ message: 'Something went wrong', error: err }))
},

    updateGig: (req, res) => {
        Gig.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(updatedGig => res.json({ gig: updatedGig }))
            .catch(err => res.status(400).json(err))
},
        
    deleteGig: (req, res) => {
        Gig.deleteOne({ _id: req.params.id })
            .then(result => res.json({ result: result }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }))
            }
}
