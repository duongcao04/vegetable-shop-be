const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./ultils/mongodb');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');

dotenv.config();
const app = express();
const port = process.env.PORT;

//Connect database
connectDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors());
app.use(morgan('common'));

//Routes
app.use('/api', productRoute);
app.use('/api', authRoute);

app.listen(port, () =>
  console.log(`Your server is running on http://localhost:${port}`)
);
