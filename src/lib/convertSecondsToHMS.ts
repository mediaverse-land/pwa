export const secondsToHMS = (seconds: number) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // Convert each value to string and pad with zeros if necessary
  let hoursString = String(hours).padStart(2, "0");
  let minutesString = String(minutes).padStart(2, "0");
  let secondsString = String(remainingSeconds).padStart(2, "0");

  // Concatenate with colons
  let timeString = `${hoursString}:${minutesString}:${secondsString}`;

  return timeString;
};
