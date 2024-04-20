export const getTimeZone = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone;
};

//lấy múi giờ utc hiện tại
export const getUtcOffset = () => {
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() / -60;
  return utcOffset;
};

///convert utc time "dd/mm/yyyy HH:mm:ss" to local time
export const convertUtcToLocalTime = (dateTimeString) => {
  const utcOffset = getUtcOffset();

  const [dateStr, timeStr] = dateTimeString.split(" ");
  const [day, month, year] = dateStr.split("/");
  const [hoursStr, minutesStr, secondsStr] = timeStr.split(":");

  const date = new Date(
    `${month}/${day}/${year} ${hoursStr}:${minutesStr}:${secondsStr}`
  );

  date.setHours(date.getHours() + utcOffset);
  return date;
};

///convert utc time "yyyy/mm/dd HH:mm:ss" to local time
export const convertUtcToLocalTimeV2 = (dateTimeString) => {
  const utcOffset = getUtcOffset();

  const [dateStr, timeStr] = dateTimeString.split(" ");
  const [year, month, day] = dateStr.split("/");
  const [hoursStr, minutesStr, secondsStr] = timeStr.split(":");

  const date = new Date(
    `${month}/${day}/${year} ${hoursStr}:${minutesStr}:${secondsStr}`
  );

  date.setHours(date.getHours() + utcOffset);
  return date;
};

//format to "DD/MM/YYYY HH:mm"
export const formatDateV1 = (date) => {
  const dayString = String(date.getDate()).padStart(2, "0");
  const monthString = String(date.getMonth() + 1).padStart(2, "0");
  const yearString = date.getFullYear();
  const hoursString = String(date.getHours()).padStart(2, "0");
  const minuteString = String(date.getMinutes()).padStart(2, "0");
  //   const secondString = String(date.getSeconds()).padStart(2, "0");

  const result = `${dayString}/${monthString}/${yearString} ${hoursString}:${minuteString}`;
  return result;
};

//format day "yyyy/MM/dd" to "dd/MM/yyyy"
export const formatDayV1 = (inputDate) => {
  if (!inputDate) return "";
  var parts = inputDate.split("/");
  var year = parts[0];
  var month = parts[1];
  var day = parts[2];

  return day + "/" + month + "/" + year;
};

export const formatTimeV1 = (input) => {
  if (!input) return "";
  var parts = input.split(":");
  var hour = parts[0];
  var minute = parts[1];
  var second = parts[2];

  return hour + ":" + minute;
};
