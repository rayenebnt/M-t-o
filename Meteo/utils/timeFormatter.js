export const formatHour = (hour) => {
  return hour.toString().padStart(2, '0') + ':00';
};
