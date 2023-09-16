const express = require('express');
const app = express();
const port = 8000;
const {connectMongoose} = require("./config/mongoose");
connectMongoose();

//user routes
const user_routes = require("./routes/userRoutes");
app.use('/api', user_routes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))