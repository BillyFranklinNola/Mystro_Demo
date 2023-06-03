const Musician = require('../models/musician.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req,res) => {
        try{
            const potentialMusician = await Musician.findOne({email: req.body.email});
            if(potentialMusician){
                res.status(400).json({message: "That email already exists, please login"});
            }else{
                const newMusician = await Musician.create(req.body);
                const musicianToken = jwt.sign({_id: newMusician.id, email: newMusician.email}, secret, {expiresIn: '1d'});
                console.log(musicianToken)
                res.json({message: "success", musician: newMusician})
            }
        }
        catch(err){
            res.status(400).json({err})
            console.log(err)
        }
    },

    login: async (req, res) => {
        try {
            const musician = await Musician.findOne({email: req.body.email});
            if(musician){
                const passwordMatch = await bcrypt.compare(req.body.password, musician.password)
                if(passwordMatch){
                    const musicianToken = jwt.sign({_id: musician.id, email: musician.email}, secret, {expiresIn: '2h'})
                    res.cookie('musicianToken', musicianToken, {httpOnly:true}).json({message: "success", musician: musician});
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
        res.clearCookie('userToken').json({message: "You have succesfully logged out"})
    }
}


module.exports.allMusicians = (req, res) => {
    Musician.find()
        .then(allMusicians => res.json(allMusicians))
        .catch(err => res.json({ message: 'Something went wrong', error: err }))
}

module.exports.createMusician = (req, res) => {
    Musician.create(req.body)
        .then(addNewMusician => res.json({ musician: addNewMusician}))
        .catch((err) => {res.status(400).json(err)})
}

module.exports.oneMusician = (req, res) => {
    Musician.findOne({ _id: req.params.id })
        .then(oneMusician => res.json({ musician: oneMusician}))
        .catch(err => res.json({ message: 'Something went wrong', error: err }))
}

module.exports.updateMusician = (req, res) => {
    Musician.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedMusician => res.json({ musician: updatedMusician }))
        .catch(err => res.status(400).json(err))
}
        
module.exports.deleteMusician = (req, res) => {
    Musician.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }))
        }

