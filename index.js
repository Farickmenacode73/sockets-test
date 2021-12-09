const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
var expressWs = require('express-ws')(app);

app.set('trust proxy', true);
app.set('view engine', true);

const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use(cors());
app.use(limiter);

var i = 0;

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send('respuesta del socket ' + msg);
    });
    setInterval(() => {
        ++i;
        ws.send('respnse' + i)
    }, 1000)

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});