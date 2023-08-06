const Gig = require('../models/gig.model');

module.exports = {
    
    allGigs: (req, res) => {
        Gig.find()
            .then(allGigs => res.json(allGigs))
            .catch(err => res.json({ message: 'Could not retrieve All Gigs', error: err }))
    },

    createGig: async (req, res) => {
        Gig.create(req.body)
        .then(newGig => res.status(201).json(newGig))
        .catch(err => res.status(400).json({ message: 'Could not create Gig', error: err }));
    },

    createGigCharts: async (req, res) => {
        Gig.findOneAndUpdate({ _id: req.gigId }, req, { new: true, runValidators: true })
            .then(updatedGig => res.json({ gig: updatedGig }))
            .catch(err => res.status(400).json(err))
    },

    oneGig: (req, res) => {
        Gig.findOne({ _id: req.params.id })
            .then(oneGig => res.json({ gig: oneGig}))
            .catch(err => res.json({ message: 'Could not retrieve Gig', error: err }))
    },

    updateGig: (req, res) => {
        Gig.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(updatedGig => res.json({ gig: updatedGig }))
            .catch(err => res.status(400).json(err))
    },

    deleteGig: (req, res) => {
        Gig.deleteOne({ _id: req.params.id })
            .then(result => res.json({ result: result }))
            .catch(err => res.json({ message: 'Could not delete Gig', error: err}))
    },

    downloadGigCharts: (req, res) => {
        console.log(req.params, "gig.controller.js  40");
        console.log(req.params.fileName, "gig.controller.js  41");
        const fileName = req.params.fileName;
        console.log(fileName);
        const file = `../server/public/uploads/${fileName}`;
        console.log(file);
        res.download(file);
    }
}
