import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import socketioServer from "fastify-socket.io";
import gamesRoutes from "./games/routes.js";
import gamesService from "./games/service.js";
import playerRoutes from "./players/routes.js";
import playersService from "./players/service.js";
import { calculateGrossWPM } from "./utils/calculateWPM.js";
import { connectDatabase } from "./utils/db.js";

export const fastify = Fastify({
  logger: false,
});

connectDatabase();

fastify.register(fastifyCors);
fastify.register(socketioServer, {
  cors: {
    origin: process.env.APP_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

fastify.ready((error) => {
  if (error) throw error;

  fastify.io.on("connect", (socket) => {
    // console.info("Socket connected!", socket.id);

    socket.on("gameJoined", (gameId) => {
      socket.join(gameId);
    });

    socket.on("playerJoined", async (gameId) => {
      const updatedGame = await gamesService.get(gameId);

      socket.join(gameId);
      fastify.io.to(gameId).emit("gameUpdated", updatedGame);
    });

    socket.on("gameStarted", async (gameId) => {
      const updatedGame = await gamesService.update(gameId, {
        hasStarted: true,
      });

      fastify.io.to(gameId).emit("gameUpdated", updatedGame);
    });

    socket.on("playerTyped", async ({ gameId, playerId, word }) => {
      let game = await gamesService.get(gameId);

      if (game.hasStarted && !game.isOver) {
        let player = game.players.find((player) => player._id == playerId);
        let playerWord = game.words[player.wordIndex];

        if (word === playerWord) {
          player.wordIndex++;

          if (player.wordIndex !== game.words.length) {
            let endTime = new Date().getTime();
            let { startedAt } = game;

            player.speed = calculateGrossWPM(startedAt, endTime, game, player);
            game = await game.save();

            fastify.io.to(gameId).emit("gameUpdated", game);
          } else {
            let endTime = new Date().getTime();
            let { startedAt } = game;

            player.speed = calculateGrossWPM(startedAt, endTime, game, player);
            game = await game.save();

            // socket.emit("gameFinished");
            fastify.io.to(gameId).emit("gameUpdated", game);
          }

          await playersService.update(player.id, {
            speed: player.speed,
            wordIndex: player.wordIndex,
          });
        }
      }
    });
  });
});

fastify.get("/", (request, reply) => {
  reply.send({ App: "Key Race", By: "Jenesh", Version: "1.0.0" });
});

fastify.register(gamesRoutes, { prefix: "/api/games" });
fastify.register(playerRoutes, { prefix: "/api/players" });

const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT || 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
