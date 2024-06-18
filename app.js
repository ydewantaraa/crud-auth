const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(authRoutes);
app.use(itemRoutes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
