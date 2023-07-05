const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    venue: {
        type: String,
        required:[true, "Venue name is required"],
        minLength:[3, "First name must be 3 or more characters"],
        maxLength:[50, "First name cannot be more than 50 characters"]
    },
    date: {
        type: String,
        required:[true, "Date of gig is required"],
    },
    streetAddress: {
        type: String,
        required:[true, "Address is required"],
        minLength:[3, "Address must be 3 or more characters"],
        maxLength:[50, "Address cannot be more than 50 characters"]
    },
    city: {
        type: String,
        required:[true, "City is required"],
        minLength:[3, "City must be 3 or more characters"],
        maxLength:[50, "City cannot be more than 50 characters"]
    },
    state: {
        type: String,
        required:[true, "State is required"],
    },
    zipCode: {
        type: String,
        required:[true, "Zip Code is required"],
        minLength:[5, "Zip Code must be 5 characters"],
        maxLength:[5, "Zip Code must be 5 characters"]
    },
    setUpBy: {
        type: String,
        required:[true, "Set up by time is required"],
    },
    startTime: {
        type: String,
        required:[true, "Start time is required"],
    },
    endTime: {
        type: String,
        required:[true, "End time is required"],
    },
    musicians: {
        type: Array,
        required:[true, "You must select at least one musician"],
    },
    charts:  {
        type: Array,
    },
    timeline:  {
        type: String,
    }
}, {timestamps: true});


const Gig = mongoose.model('Gig', GigSchema);

module.exports = Gig;