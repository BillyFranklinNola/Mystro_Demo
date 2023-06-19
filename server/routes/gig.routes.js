require('dotenv').config({ path: '../.env' });
const {auth, isAdmin} = require('../middleware/auth');
const GigController = require('../controllers/gig.controller');
const upload = require('../middleware/multer');
const cloudinary = require('../middleware/cloudinary');

module.exports = app => {
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', upload.fields([
        { name: 'charts', maxCount: 2 },
        { name: 'timeline', maxCount: 2 }, 
    ]), async (req, res) => {
        const { venue, date, streetAddress, city, state, zipCode, setUpBy, startTime, endTime, musicians } = req.body;
        const charts = req.files['charts'];
        const timeline = req.files['timeline'];
        console.log(req.files);
        try {
        const uploadedCharts = await cloudinary.uploader.upload(charts.path, {
            upload_preset: 'Nola_Live',
        });

        const uploadedTimeline = await cloudinary.uploader.upload(timeline.path, {
            upload_preset: 'Nola_Live', 
            allowed_formats: ['jpg', 'png', 'jpeg'],
        });
    
        const chartsUrl = uploadedCharts.secure_url;
        const timelineUrl = uploadedTimeline.secure_url;

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
            charts: chartsUrl,
            timeline: timelineUrl,
        };
    
        const createdGig = await GigController.createGig(newGig);
    
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
