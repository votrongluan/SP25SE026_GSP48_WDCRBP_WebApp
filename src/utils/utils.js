import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import unorm from "unorm";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertDateStringToDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  date.setUTCHours(date.getUTCHours() + 7);
  return date.toISOString();
};

export const convertTimeStampToDateString = (timestamp) => {
  const date = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");

  const dateString = date.format("DD-MM-YYYY");

  return dateString;
};

export const convertTimeStampToDateTimeString = (timestamp) => {
  const dateTime = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");

  return dateTime.format("DD-MM-YYYY hh:mm A"); // e.g., "01-03-2025 08:30 PM"
};

export const getDateNow = () => {
  const currentDate = new Date();
  const vietnamTime = new Date(
    currentDate.getTime() + 7 * 60 * 60 * 1000
  ).toISOString();
  return vietnamTime;
};

export const generateBarcode = (type) => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return type.typeName.toUpperCase() + randomNum;
};
export const convertDateToDateString = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function normalizeVietnamese(text) {
  return unorm
    .nfd(text)
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
