const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database');

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    this.paths = {
      comments: '/api/comments',
      createComments: '/api/create-comment',
    };

    this.middlewares();
    this.dbConnect();
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.comments, require('../routes/comments'));
    this.app.use(this.paths.createComments, require('../routes/comments'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server run in', this.port);
    });
  }
}

module.exports = Server;
