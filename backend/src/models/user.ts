import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
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
    type: {
        type: String
    },
    pastBorrowing: {
        type: Array
    },
    borrowing:{
        type: Array
    }
})

export default mongoose.model('UserModel', User, 'users')