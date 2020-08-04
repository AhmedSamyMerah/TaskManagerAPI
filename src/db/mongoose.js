const mmongoose = require('mongoose')

mmongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
