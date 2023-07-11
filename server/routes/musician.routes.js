const MusicianController = require('../controllers/musician.controller');


module.exports = app => {
    app.get('/api/musicians', MusicianController.allMusicians);
    app.post('/api/musicians/register', MusicianController.register)
    app.post('/api/musicians/login', MusicianController.login)
    app.post('/api/musicians/logout', MusicianController.logout)
    app.get('/api/musicians/:id', MusicianController.oneMusician);
    app.put('/api/musicians/edit/:id', MusicianController.updateMusician);
    app.delete('/api/musicians/delete/:id', MusicianController.deleteMusician);
    app.get('/api/musicians/loggedInMusician', MusicianController.loggedInMusician);
}