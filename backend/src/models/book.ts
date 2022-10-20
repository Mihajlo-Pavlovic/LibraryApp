import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    authors: {
        type: Array
    },
    category: {
        type: Array
    },
    publisher: {
        type: String
    },
    year: {
        type: Number
    },
    language: {
        type: String
    },
    image: {
        type: String
    },
    count: {
        type: Number
    },
    comments:{
        type: Array
    },
    grades:{
        type: Array
    }

})

export default mongoose.model('BookModel', Book, 'books')