const Musician = require('../models/musician.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req,res) => {
        console.log(secret)
        try{
            const potentialMusician = await Musician.findOne({email: req.body.email});
            if(potentialMusician){
                res.status(400).json({message: "That email already exists, please login"});
            }else{
                const newMusician = await Musician.create(req.body);
                console.log(newMusician.id)
                const token = jwt.sign({id: newMusician.id}, secret, {expiresIn: '1d'});
                console.log(token)
                res.json({message: "success", musician: newMusician})
            }
        }
        catch(err){
            res.status(400).json({err})
            console.log(err)
            
        }
    },

    login: async (req, res) => {
        console.log(secret)
        try {
            let musician = await Musician.findOne({email: req.body.email});
            if(musician){
                const passwordMatch = await bcrypt.compare(req.body.password, musician.password)
                if(passwordMatch){
                    const token = jwt.sign({id: musician._id}, secret, {expiresIn: '2h'})
                    console.log(token)
                    res.cookie('token', token, {httpOnly:true}).json({message: "success", musician: musician});
                }
                else{
                    res.status(400).json({message: "Invalid email or password"})
                }
            }
            else{
                res.status(400).json({message: "Invalid email or password"})
            }
        }
        catch(err){
            return res.json({error:err});
        }
    },

    logout: (req,res) => {
        res.clearCookie('token').json({message: "You have succesfully logged out"})
    },


    allMusicians: (req, res) => {
        Musician.find()
            .then(allMusicians => res.json(allMusicians))
            .catch(err => res.json({ message: 'Something went wrong', error: err }))
},

    oneMusician: (req, res) => {
        Musician.findOne({ _id: req.params.id })
            .then(oneMusician => res.json({ musician: oneMusician}))
            .catch(err => res.json({ message: 'Something went wrong', error: err }))
},

    updateMusician: (req, res) => {
        Musician.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(updatedMusician => res.json({ musician: updatedMusician }))
            .catch(err => res.status(400).json(err))
},
        
    deleteMusician: (req, res) => {
        Musician.deleteOne({ _id: req.params.id })
            .then(result => res.json({ result: result }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }))
},

    loggedInMusician: (req, res) => {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
        return res.status(401).json({ message: 'No token found' });
        } try {
            const decodedJWT = jwt.verify(token, secret);
            const musicianId = decodedJWT._id;
            Musician.findById(musicianId)
                .then((musician) => {
            if (!musician) {
            return res.status(404).json({ message: 'Musician not found' });
        }
        res.json({ musician });
        })
        .catch((err) => res.status(500).json({ message: 'Internal server error' }));
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}}
