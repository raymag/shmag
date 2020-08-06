const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes');
require('./database').connect();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});