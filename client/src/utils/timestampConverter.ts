import moment from "moment";

export function timestampConverter(unixTimestamp: number): string {
  const paddedTimestamp = parseInt(String(unixTimestamp).padEnd(13, "0"));
  const array = moment(paddedTimestamp).toArray(); // [2013, 1, 4, 14, 40, 16, 154];
  const result = moment([
    array[0],
    array[1],
    array[2],
    array[3],
    array[4],
  ]).fromNow();
  return result;
}

export function timestampConverterToGB(unixTimestamp: number): string {
  const paddedTimestamp = parseInt(String(unixTimestamp).padEnd(13, "0"));
  const result = moment(paddedTimestamp).format("DD/MM/yyyy");
  return result;
}
