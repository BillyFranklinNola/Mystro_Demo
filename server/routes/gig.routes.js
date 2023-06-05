const GigController = require('../controllers/gig.controller');

module.exports = app => {
    app.get('/api/gigs/gigList', GigController.allGigs);
    app.post('/api/gigs/createGig', GigController.createGig)
    app.get('/api/gigs/oneGig/:id', GigController.oneGig);
    app.put('/api/gigs/editGig/:id', GigController.updateGig);
    app.delete('/api/gigs/deleteGig/:id', GigController.deleteGig);
}