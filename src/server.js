const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const database = require("./database/db.js");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

const port = process.env.PORT || 5000;

// Run the server!
const start = async () => {
  try {
    await fastify.listen(port, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
    await database.connection();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
