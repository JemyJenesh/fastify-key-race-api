import Game from "./model.js";
import playersService from "../players/service.js";
import { getData } from "../utils/quotable.js";

const create = async (playerId) => {
  const words = await getData();
  const player = await playersService.get(playerId);

  if (!player) {
    throw "No player found";
  }

  await playersService.update(player._id, {
    accuracy: 0,
    errorCount: 0,
    speed: 0,
    wordIndex: 0,
  });

  await destoryByPlayerId(player._id);

  return await Game.create({
    words,
    createdBy: playerId,
    players: [player],
    startedAt: new Date().getTime(),
  });
};

const destoryByPlayerId = async (createdBy) => {
  return await Game.deleteOne({ createdBy });
};

const get = async (id) => {
  return await Game.findById(id);
};

const update = async (id, { hasStarted, isOver, player }) => {
  const game = await get(id);

  if (!game) {
    throw "No game found";
  }

  let existingPlayer;
  if (player) {
    existingPlayer = await playersService.get(player._id);

    existingPlayer.accuracy = 0;
    existingPlayer.errorCount = 0;
    existingPlayer.speed = 0;
    existingPlayer.wordIndex = 0;
    await existingPlayer.save();

    player.accuracy = existingPlayer.accuracy;
    player.errorCount = existingPlayer.errorCount;
    player.speed = existingPlayer.speed;
    player.wordIndex = existingPlayer.wordIndex;

    if (!existingPlayer) {
      throw "No player found";
    }
  }

  if (game.hasStarted || game.isOver) {
    throw "Game closed for new players!";
  }

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
