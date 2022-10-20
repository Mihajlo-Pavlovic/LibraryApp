import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Registration = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },

})

export default mongoose.model('RegistrationModel', Registration, 'registration')