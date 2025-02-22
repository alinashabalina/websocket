const express = require('express');
const rateRoutes = require('./routes/rates')

const app = express();
app.use(rateRoutes)
app.listen(8000);