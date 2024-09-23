
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/router');
const dbConnect = require('./config/config');

class Server {
    constructor(port = 3000) {
        this.port = port;
        this.app = express();
        this.config();
        this.routing();
        this.db();
    }

    db() {
        dbConnect()
    }

    config() {
        this.app.use(express.json());
        this.app.set('view engine', 'ejs');
       
    }

    routing() {
        this.app.use('/', router);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server started on port ' + this.port);
        });
    }
}

new Server().start();