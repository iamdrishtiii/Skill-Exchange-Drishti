const mongoose = require('mongoose');
const dbConnection = async ()=> {
       try {
              mongoose.connect(process.env.MONGO_URI);
              const database = mongoose.connection;
              database.on('err',() => {
                     console.log(err)
              })

              database.once('connected',()=>{
                     console.log("DB connected successfully")
              })
            } catch(err){
           console.log("not connected",err)
       }
}

module.exports = dbConnection