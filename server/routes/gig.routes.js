require('dotenv').config({ path: '../.env' });
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');


module.exports = app => {
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', 
    upload.fields([
        {name: 'iRealCharts', maxCount: 1}, 
        {name: 'pdfCharts', maxCount: 1},
        {name: 'timeline', maxCount: 1}
    ]),
    async (req, res) => {
        try {
            const { 
                venue, 
                date, 
                streetAddress, 
                city, 
                state, 
                zipCode, 
                setUpBy, 
                startTime, 
                endTime, 
                musicians
            } = req.body;
            console.log(req.body, "gig.routes.js 11");
            const timeline = req.files.timeline[0].filename;
            const iRealCharts = req.files.iRealCharts[0].filename;
            const pdfCharts = req.files.pdfCharts[0].filename;
            console.log(timeline, "gig.routes.js 19");
            console.log(iRealCharts, "gig.routes.js 20");
            console.log(pdfCharts, "gig.routes.js 21");

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
                iRealCharts,
                pdfCharts,
                timeline,
            };

            console.log(newGig, "gig.routes.js 29");
            const createdGig = await GigController.createGig(newGig, res);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    app.get('/api/gigs/download/:fileName', GigController.downloadGigCharts);
    app.get('/api/gigs/oneGig/:id', GigController.oneGig);
    app.put('/api/gigs/editGig/:id', GigController.updateGig);
    app.delete('/api/gigs/deleteGig/:id', GigController.deleteGig);    
    }
