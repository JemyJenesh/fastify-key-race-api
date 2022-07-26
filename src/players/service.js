import Player from "./model.js";

const create = async (name) => {
  return await Player.create({ name });
};

const get = async (id) => {
  return await Player.findById(id);
};

const getAll = async () => {
  return await Player.find();
};

const update = async (id, updates) => {
  await Player.findByIdAndUpdate(id, updates);

  return await get(id);
};

const playerService = {
  create,
  get,
  getAll,
  update,
};

export default playerService;
