const express = () => {
  const express = require("express");
  const cors = require("cors")({ origin: true });
  const morgan = require("morgan");
  const helmet = require("helmet");

  const app = express();

  //   app.use(helmet());
  //   app.use(helmet.noCache());
  app.use(cors);
  app.use(morgan("combined"));

  return app;
};

module.exports = express;
