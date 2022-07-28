const calculateTimeTakenInMinutes = (startTime, endTime) => {
  const timeInSeconds = (endTime - startTime) / 1000;
  const timeInMinutes = timeInSeconds / 60;

  return timeInMinutes;
};

const calculateCharacterLength = (words, index) => {
  return words.slice(0, index).join(" ").length;
};

export const calculateGrossWPM = (startTime, endTime, game, player) => {
  const timeTaken = calculateTimeTakenInMinutes(startTime, endTime);
  const speed = Math.floor(
    calculateCharacterLength(game.words, player.wordIndex) / 5 / timeTaken
  );

  return speed;
};

export const calculateNetWPM = (startTime, endTime, game, player) => {
  const timeTaken = calculateTimeTakenInMinutes(endTime, startTime);
  const grossSpeed = calculateGrossWPM(endTime, startTime, game, player);
  const speed = Math.floor(grossSpeed - player.errorCount / timeTaken);

  return speed;
};

export const calculateAccuracy = (game, player) => {
  const characterLength = game.words.join(" ").length;
  const accuracy = Math.floor(
    ((characterLength - player.errorCount) / characterLength) * 100
  );

  return accuracy;
};
