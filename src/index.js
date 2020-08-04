const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

//blocks all requests
// app.use((req, res, next)=>{
//     res.status(503).send('Site is currently donw')
// })

app.use(express.json())
app.use(userRouter, taskRouter)

app.listen(port, () => {
    console.log('server is up and running on port ' + port)
})
