import Fastify from "fastify";
import { connectDatabase } from "./utils/db.js";
import gamesRoutes from "./games/routes.js";
import playerRoutes from "./players/routes.js";
import socketioServer from "fastify-socket.io";

export const fastify = Fastify({
  logger: true,
});

connectDatabase();

fastify.register(socketioServer);

fastify.get("/", (request, reply) => {
  reply.send({ App: "Key Race", By: "Jenesh", Version: "1.0.0" });
});

fastify.register(gamesRoutes, { prefix: "/api/games" });
fastify.register(playerRoutes, { prefix: "/api/players" });

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
