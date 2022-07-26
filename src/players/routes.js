import playerController from "./controller.js";

const { create, get, getAll, update } = playerController;

const routes = async (fastify, options) => {
  fastify.get("/", getAll);

  fastify.get("/:id", get);

  fastify.post("/", create);

  fastify.put("/:id", update);
};

export default routes;
