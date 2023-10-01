const mongoose = require('mongoose')
const mongoURI = "";
const secret = "";

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("mongodb connected done")
    }).catch(err => console.log(err));
}
module.exports = {
    connectToMongo,
    secret
};
// v2BPTsY!i#.7EvX