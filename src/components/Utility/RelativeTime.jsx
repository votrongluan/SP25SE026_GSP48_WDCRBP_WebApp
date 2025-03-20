import { Text, Tooltip } from "@chakra-ui/react";
import { convertTimeStampToDateTimeString } from "../../utils/utils";

const getRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const diffInSeconds = diff / 1000;
  const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears >= 1) return `${diffInYears} năm trước`;
  if (diffInMonths >= 1) return `${diffInMonths} tháng trước`;
  if (diffInDays >= 1)
    return diffInDays === 1 ? "1 ngày trước" : `${diffInDays} ngày trước`;
  return "hôm nay";
};

const RelativeTime = ({ dateString }) => {
  return (
    <Tooltip
      label={convertTimeStampToDateTimeString(new Date(dateString))}
      hasArrow
    >
      <Text color="gray.500">Đăng vào: {getRelativeTime(dateString)}</Text>
    </Tooltip>
  );
};

export default RelativeTime;
