export const formatTime = data => {
  const hours = Math.floor(data / 60).toString();
  const minets = (data % 60).toString().padStart(2, 0);

  return `${hours}г ${minets}хв`;
};
