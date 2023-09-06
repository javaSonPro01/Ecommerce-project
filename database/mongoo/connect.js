const mongoose = require("mongoose")
//

class MongoDB {
    static connect() {
        mongoose.connect('mongodb://127.0.0.1:27017/nodejs-course')
            .then(() => {
                console.log("MongoDB Connected")
            })
            .catch(err => console(err));

        const conn = mongoose.connection
        conn.once("open", () => {
            this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'uploads'
            })
        })
    }
}

module.exports = MongoDB