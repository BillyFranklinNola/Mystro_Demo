require('dotenv').config({ path: '../.env' });
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');


module.exports = app => {
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', upload.single('timeline'),  async (req, res) => {
        const { venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, musicians, charts} = req.body;
        console.log(req.body.timeline);
        const timeline = req.file ? req.file.filename : null
        console.log(timeline);
        try {
            const newGig = {
                venue,
                date,
                streetAddress,
                city,
                state,
                zipCode,
                setUpBy,
                startTime,
                endTime,
                musicians,
                charts,
                timeline,
            };
        
            const createdGig = GigController.createGig(newGig);
            res.status(201).json(createdGig);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    app.get('/api/gigs/oneGig/:id', GigController.oneGig);
    app.put('/api/gigs/editGig/:id', GigController.updateGig);
    app.delete('/api/gigs/deleteGig/:id', GigController.deleteGig);    
    }
