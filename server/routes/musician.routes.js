const MusicianController = require('../controllers/musician.controller');

module.exports = app => {
    app.get('/api/musicians/list', MusicianController.allMusicians);
    app.post('/api/registerMusician', MusicianController.register)
    app.post('/api/login', MusicianController.login)
    app.post('/api/logout', MusicianController.logout)
    app.get('/api/musicians/oneMusician/:id', MusicianController.oneMusician);
    app.put('/api/musicians/editMusician/:id', MusicianController.updateMusician);
    app.delete('/api/musicians/deleteMusician/:id', MusicianController.deleteMusician);
}