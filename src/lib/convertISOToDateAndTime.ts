export function convertISOToDateAndTime(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Months are 0 based, so we add 1
  const day = ("0" + date.getUTCDate()).slice(-2);
  const hours = ("0" + date.getUTCHours()).slice(-2);
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
