const MusicianController = require('../controllers/musician.controller');


module.exports = app => {
    app.get('/api/musicians/list', MusicianController.allMusicians);
    app.post('/api/musicians/register', MusicianController.register)
    app.post('/api/musicians/login', MusicianController.login)
    app.post('/api/musicians/logout', MusicianController.logout)
    app.get('/api/musicians/oneMusician/:id', MusicianController.oneMusician);
    app.put('/api/musicians/editMusician/:id', MusicianController.updateMusician);
    app.delete('/api/musicians/deleteMusician/:id', MusicianController.deleteMusician);
    app.get('/api/musicians/loggedInMusician', MusicianController.loggedInMusician);
}