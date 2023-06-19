const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const MusicianSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true, "First name is required"],
        minLength:[3, "First name must be 3 or more characters"],
        maxLength:[50, "First name cannot be more than 50 characters"]
    },
    lastName: {
        type: String,
        required:[true, "Last name is required"],
        minLength:[3, "Last name must be 3 or more characters"],
        maxLength:[50, "Last name cannot be more than 50 characters"]
    },
    email: {
        type: String,
        required:[true, "Email is required"],
        unique: [true, "Email already exists"],
        validate:[isEmail, "Invalid email"]
    },
    instrument: {
        type: String,
        required:[true, "Instrument is required"],
        minLength:[3, "Last name must be 3 or more characters"],
        maxLength:[50, "Last name cannot be more than 50 characters"]
    },
    password: {
        type: String,
        required:[true, "Password is required"],
        minLength:[8, "Password must be 8 or more characters"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

MusicianSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

MusicianSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', "Passwords don't match")
    }
    next();
})

MusicianSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
    });
});

const Musician = mongoose.model('Musician', MusicianSchema);

module.exports = Musician;