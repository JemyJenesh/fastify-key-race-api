import gamesService from "./service.js";

const create = async (req, reply) => {
  try {
    const { playerId } = req.body;
    const game = await gamesService.create(playerId);

    return reply.send(game);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

const get = async (req, reply) => {
  try {
    const { id } = req.params;
    const game = await gamesService.get(id);

    if (!game) {
      return reply.code(404).send();
    }

    return reply.send(game);
  } catch (error) {
    if (error.name === "CastError") {
      return reply.code(404).send(error);
    }

    return reply.code(500).send(error);
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const game = await gamesService.update(id, req.body);

    return reply.send(game);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

const gamesController = {
  create,
  get,
  update,
};

export default gamesController;
