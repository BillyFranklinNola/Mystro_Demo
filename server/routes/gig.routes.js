require('dotenv').config({ path: '../.env' });
const { S3 } = require('aws-sdk');
const GigController = require('../controllers/gig.controller');
const {upload} = require('../middleware/fileUpload');
const {s3upload} = require('../middleware/AWS-s3');


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

            if (req.files) {
                if (req.files.timeline) {
                    // timeline = req.files.timeline[0].filename;
                    timeline = await s3upload(req.files.timeline[0]);
                }
                if (req.files.iRealCharts) {
                    // iRealCharts = req.files.iRealCharts[0].filename;
                    iRealCharts = await s3upload(req.files.iRealCharts[0]);
                }
                if (req.files.pdfCharts) {
                    // pdfCharts = req.files.pdfCharts[0].filename;
                    pdfCharts = await s3upload(req.files.pdfCharts[0]);
                }
            }
                console.log('timeline:', timeline);
                console.log('iRealCharts:', iRealCharts);
                console.log('pdfCharts:', pdfCharts);
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

