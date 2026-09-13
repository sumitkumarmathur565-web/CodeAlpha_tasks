const express = require('express');
const authRoute = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')



const app = express();

app.use(cookieParser())

app.use(cors({origin: 'http://localhost:5173', credentials: true}))




app.use(express.json())

app.use('/api/auth' , authRoute )
app.use('/api/products', productRoute)
app.use('/api/cart' , cartRoute )

module.exports = app