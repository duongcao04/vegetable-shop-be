const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors')
const productRoute = require('./Routes/product.route');
const userRoute = require('./Routes/user.route');
const rootRouter = require('./Routes');
require('dotenv').config();
require('./helpers/connection_mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

//Routes
app.use('/api', rootRouter);

//No match route => create error "This route does not exist"
app.all("*",(req, res, next) => {
  next(createError.NotFound("This route does not exist."))
})

//Middleware
app.use((err, req, res, next) => {
  if (!err) return next()
  res.json({
    status: err.status || 500,
    message: err.message
  })
})

app.listen(PORT, () =>
  console.log(`Server is running:::http://localhost:${PORT}`)
);
