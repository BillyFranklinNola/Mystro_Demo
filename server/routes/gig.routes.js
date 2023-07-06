require('dotenv').config({ path: '../.env' });
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');


module.exports = app => {
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', upload.single('timeline'), upload.single('iRealCharts'), upload.single('pdfCharts'), async (req, res) => {
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
            const timeline = req.file? req.file.filename : '';
            const iRealCharts = req.file? req.file.filename : '';
            const pdfCharts = req.file? req.file.filename : '';
            console.log(timeline, "gig.routes.js 19");
            console.log(iRealCharts, "gig.routes.js 20");
            console.log(pdfCharts, "gig.routes.js 20");

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
