import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import unorm from "unorm";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateString = (timestamp) => {
  const date = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");

  const dateString = date.format("DD/MM/YYYY");

  return dateString;
};

export const formatDateTimeString = (timestamp) => {
  const dateTime = dayjs(timestamp).tz("Asia/Ho_Chi_Minh");
  return dateTime.format("DD/MM/YYYY HH:mm");
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

export const formatDateTimeToVietnamese = (dateString) => {
  if (!dateString) return "Không có";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
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

// Format date for datetime-local input (YYYY-MM-DD format)
export const formatDateForInput = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
