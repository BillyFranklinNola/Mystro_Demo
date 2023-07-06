require('dotenv').config({ path: '../.env' });
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');


module.exports = app => {
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', upload.array('charts'), upload.single('timeline'), async (req, res) => {
        try {
            const { venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, musicians} = req.body;
            console.log(req.body, "gig.routes.js 15");
            console.log(req.files, "gig.routes.js 16");
            console.log(req.file, "gig.routes.js 17");
            const timeline = req.file? req.file.filename : '';
            const charts = req.files? req.files.filename : '';
            console.log(timeline, "gig.routes.js 19");
            console.log(charts, "gig.routes.js 20");
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
