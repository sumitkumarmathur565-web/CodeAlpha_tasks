const express = require('express');
const cookie = require('cookie-parser')
const authRoute = require('./route/auth.route')
const postRoute = require('./route/post.route')
const cors = require('cors');
const userRoutes = require('./route/user.route')

const app = express();

app.use(cookie())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use("/api/auth" , authRoute)
app.use('/api/posts' , postRoute)
app.use('/api/users', userRoutes);

module.exports = app