const calculateTimeTakenInMinutes = (endTime, startTime) => {
  const timeInSeconds = (endTime - startTime) / 1000;
  const timeInMinutes = timeInSeconds / 60;

  return timeInMinutes;
};

export const calculateGrossWPM = (endTime, startTime, player) => {
  const timeTaken = calculateTimeTakenInMinutes(endTime, startTime);
  const speed = Math.floor(player.wordIndex / timeTaken);

  return speed;
};

export const calculateNetWPM = (endTime, startTime, player, errors) => {
  const timeTaken = calculateTimeTakenInMinutes(endTime, startTime);
  const grossSpeed = calculateGrossWPM(endTime, startTime, player);
  const speed = Math.floor(grossSpeed - errors / timeTaken);

  return speed;
};
