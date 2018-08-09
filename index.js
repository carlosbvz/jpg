const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('./core/utils/handlebarsHelpers');
const contentRouter = require('./core/routes/contentRouter');
const playersRouter = require('./core/routes/playersRouter');
const assetsRouter = require('./core/routes/assetsRouter');

mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://localhost:27017/teammeup';

mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log('Mongo connection succesful'))
    .catch((err) => console.error(err));

// Template engine
const handlebarsEngine = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'app', 'layouts'),
    partialsDir: path.join(__dirname, 'app', 'components'),
    helpers: handlebarsHelpers
}).engine;

app.engine('.hbs', handlebarsEngine);
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', '.hbs');

app.use(bodyParser.json());

// Environment configuration
const environment = process.env.NODE_ENV;
if (environment === 'local') {
    require('./webpack.middleware.js').useWebpackMiddleware(app);
}

app.use('/assets', assetsRouter);
app.use('/players', playersRouter);
app.use(contentRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
