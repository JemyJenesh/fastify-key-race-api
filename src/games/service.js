import Game from "./model.js";
import playersService from "../players/service.js";
import { getData } from "../utils/quotable.js";

const create = async (playerId) => {
  const words = await getData();
  const player = await playersService.get(playerId);

  if (!player) {
    throw "No player found";
  }

  return await Game.create({
    words,
    createdBy: playerId,
    players: [player],
    startedAt: new Date().getTime(),
  });
};

const get = async (id) => {
  return await Game.findById(id);
};

const update = async (id, { hasStarted, isOver, player }) => {
  await Game.findByIdAndUpdate(id, {
    hasStarted,
    isOver,
    $push: {
      players: player,
    },
  });

  return await get(id);
};

const gamesService = {
  create,
  get,
  update,
};

export default gamesService;
