const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('./auth/passport');
const logger = require('./middleware/logger');
const PORT = process.env.PORT || 8080;

app.use(express.static('views'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware
app.use(morgan('dev'));
app.use(logger.notFound);
app.use(logger.errorHandler);

app.use(passport.initialize())
app.use(passport.session())




//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
