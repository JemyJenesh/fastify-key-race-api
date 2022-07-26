import playersService from "./service.js";

const create = async (req, reply) => {
  try {
    const { name } = req.body;
    const player = await playersService.create(name);

    return reply.send(player);
  } catch (error) {
    return reply.code(500).send();
  }
};

const get = async (req, reply) => {
  try {
    const { id } = req.params;
    const player = await playersService.get(id);

    if (!player) {
      return reply.code(404).send();
    }

    return reply.send(player);
  } catch (error) {
    if (error.name === "CastError") {
      return reply.code(404).send(error);
    }

    return reply.code(500).send(error);
  }
};

const getAll = async (req, reply) => {
  try {
    const players = await playersService.getAll();

    return reply.send(players);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;

    const player = await playersService.update(id, req.body);

    return reply.send(player);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

const playerController = {
  create,
  get,
  getAll,
  update,
};

export default playerController;
