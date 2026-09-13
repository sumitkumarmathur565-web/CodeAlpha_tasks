const app = require('./src/app')
require('dotenv').config();
const connectDb = require('./src/db/db')


const port = process.env.PORT || 3000


connectDb();

app.listen( port , () => {
  console.log(`server is running on`,  port)
})