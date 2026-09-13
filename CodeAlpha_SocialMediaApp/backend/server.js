const app = require('./src/app')
const connectDb = require('./src/db/db')
require('dotenv').config()

const port = process.env.PORT || 3000

connectDb()
app.listen(port , () => {
    console.log(`server is running on ${port}`)
})

