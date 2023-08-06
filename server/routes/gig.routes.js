require('dotenv').config({ path: '../.env' });
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');


module.exports = app => {
    app.get('/api/gigs', GigController.allGigs);
    app.post('/api/gigs/create', GigController.createGig);
    app.get('/api/gigs/:id', GigController.oneGig);
    app.get('/api/gigs/download/:fileName', GigController.downloadGigCharts);
    app.delete('/api/gigs/delete/:id', GigController.deleteGig);    
    app.put('/api/gigs/edit/:id', GigController.updateGig);
        upload.fields([
            {name: 'iRealCharts', maxCount: 1}, 
            {name: 'pdfCharts', maxCount: 1},
            {name: 'timeline', maxCount: 1}
        ]),
        async (req, res) => {
            try {
                const gigId = req.params.id;
                const timeline = req.files.timeline? req.files.timeline[0].filename : '';
                const iRealCharts = req.files.iRealCharts? req.files.iRealCharts[0].filename: '';
                const pdfCharts = req.files.pdfCharts? req.files.pdfCharts[0].filename: '';
                console.log(timeline, "gig.routes.js 71");
                console.log(iRealCharts, "gig.routes.js 72");
                console.log(pdfCharts, "gig.routes.js 73");
                const gigCharts = {
                    iRealCharts,
                    pdfCharts,
                    timeline,
                    gigId
                };
                console.log(gigCharts, "gig.routes.js 29");
                GigController.createGigCharts(gigCharts, res);
            } catch (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        };

    app.put('/api/gigs/uploadCharts/:id',
        upload.fields([
            {name: 'iRealCharts', maxCount: 1}, 
            {name: 'pdfCharts', maxCount: 1},
            {name: 'timeline', maxCount: 1}
        ]),
        async (req, res) => {
            try {
            const gigId = req.params.id;
            let timeline = '';
            let iRealCharts = '';
            let pdfCharts = '';

            console.log(req.files)

            if (req.files) {
                if (req.files.timeline) {
                    timeline = req.files.timeline[0].filename;
                }
                if (req.files.iRealCharts) {
                    iRealCharts = req.files.iRealCharts[0].filename;
                }
                if (req.files.pdfCharts) {
                    pdfCharts = req.files.pdfCharts[0].filename;
                }
            }
                console.log(timeline, "gig.routes.js 71");
                console.log(iRealCharts, "gig.routes.js 72");
                console.log(pdfCharts, "gig.routes.js 73");
                const gigCharts = {
                    iRealCharts,
                    pdfCharts,
                    timeline,
                    gigId
                };

                GigController.createGigCharts(gigCharts, res);
            } catch (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });    
    }

