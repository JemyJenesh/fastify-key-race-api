import gamesController from "./controller.js";

const { create, get, update } = gamesController;

const routes = async (fastify, options) => {
  fastify.get("/:id", get);

  fastify.post("/", create);

  fastify.put("/:id", update);
};

export default routes;
