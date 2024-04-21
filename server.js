const express = require('express');
const connectDB = require('./ultils/mongodb');
const cors = require('cors');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoute = require("./routes/productRoute");

dotenv.config();
const app = express();
const port = process.env.PORT;

//Connect database
connectDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

//Routes
app.use("/api", productRoute);

app.listen(port, () =>
console.log(`Your server is running on http://localhost:${port}`))