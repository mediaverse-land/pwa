export const convertSecondsForTimer = (number: number) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;
  return `${minutes <= 60 && minutes >= 10 ? "" : "0"}${
    minutes < 60 ? minutes : ""
  }:${seconds < 10 ? "0" : ""}${seconds}`;
};
