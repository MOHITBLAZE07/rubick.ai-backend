// use at the starting top
// require('./helper.js')
const mongoose = require('mongoose')

const url = "mongodb+srv://mohit:handball07@cluster0.reucn.mongodb.net/product?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>{
    console.log('connected to mongodb')
}).catch(err=>{
    console.log(err);
})

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db')
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose disconnected')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0)
})