export function convertMsToTimeStamp(date: number) {
  return new Date(date);
}

export function convertTimeStampToMs(date: Date) {
  return date.getTime();
}
