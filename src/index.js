const app = require('./app')
const port = process.env.PORT

//blocks all requests
// app.use((req, res, next)=>{
//     res.status(503).send('Site is currently donw')
// })

app.listen(port, () => {
    console.log('server is up and running on port ' + port)
})
