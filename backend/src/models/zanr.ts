import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zanr = new Schema({
    zanr: {
        type: String
    }
})

export default mongoose.model('ZanrModel', Zanr, 'zanr')