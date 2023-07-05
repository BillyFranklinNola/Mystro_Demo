require('dotenv').config({ path: '../.env' });
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');


module.exports = app => {
    const multipleUploads = upload.fields([ 
        { name: 'charts', maxCount: 10 },
        { name: 'timeline', maxCount: 1 }
    ])
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', multipleUploads, async (req, res) => {
        try {
        const { venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, musicians} = req.body;
        console.log(req.body, "gig.routes.js 10");
        const timeline = req.file? req.file.filename : '';
        const charts = req.files? req.files.map(file => file.filename) : [];
        console.log(timeline, "gig.routes.js 13");
        console.log(charts, "gig.routes.js 14");
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

            console.log(newGig, "gig.routes.js 29");
            const createdGig = await GigController.createGig(newGig, res);
            console.log(createdGig, "gig.routes.js 31");
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    app.get('/api/gigs/oneGig/:id', GigController.oneGig);
    app.put('/api/gigs/editGig/:id', GigController.updateGig);
    app.delete('/api/gigs/deleteGig/:id', GigController.deleteGig);    
    }
