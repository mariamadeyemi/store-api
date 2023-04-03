const mongoose = require ("mongoose")
const uri = process.env.DATABASE_URL

const conn = async ()=>{
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
          });
console.log("Database connected");
    } catch (error) {
        console.log(error.message);
    }

}


module.exports = conn;






// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: '',
//     database: 'beatshill_store'
// })

// connection.connect((err)=>console.log(err || 'Database Connected'))

// module.exports = connection.promise()