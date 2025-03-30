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

export const formatDateString = (timestamp) => {
  const date = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");

  const dateString = date.format("DD/MM/YYYY");

  return dateString;
};

export const formatDateToVietnamese = (dateString) => {
  if (!dateString) return "Chưa đăng ký";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTimeString = (timestamp) => {
  const dateTime = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");
  return dateTime.format("DD/MM/YYYY HH:mm");
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
