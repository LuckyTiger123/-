import { formatDate } from "../../../../utils/formatDate"

export const generateDates = (startTime, interval) => {
  let date = new Date(startTime);
  const dates = [];
  dates.push(formatDate(date, "yyyy-MM-dd"))
  for (let i = 1; i < interval; ++i) {
    date.setDate(date.getDate() + 1);
    dates.push(formatDate(date, "yyyy-MM-dd"));
  }
  return dates;
}
