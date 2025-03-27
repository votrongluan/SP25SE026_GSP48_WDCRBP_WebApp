export const stlModelLookup = {
  ["Humpack Whale - Warhammer 40k"]: "nothing",
};

export function getProductById(id) {
  return products.find((product) => product.id == id);
}

export const categoryMap = {
  [-1]: "Tất cả sản phẩm",
  [0]: "Anime",
  [1]: "Decoration",
  [2]: "Game",
  [3]: "Movie",
};

export const roleMap = {
  [1]: "Customer",
  [2]: "Supplier",
  [3]: "Admin",
};

export const orderStatusMap = {
  [0]: "Đang chờ",
  [1]: "Đã thanh toán",
  [2]: "Đã hoàn thành",
  [3]: "Đã hủy",
};

export const orderStatusColorMap = {
  [0]: "blue",
  [1]: "green",
  [2]: "green",
  [3]: "red",
};

export const printOrderStatusMap = {
  [0]: "Đang chờ",
  [1]: "Chờ xác nhận",
  [2]: "Đã xác nhận",
  [3]: "Đã hoàn thành",
  [4]: "Đã hủy",
};

export const printOrderStatusColorMap = {
  [0]: "blue",
  [1]: "purple",
  [2]: "orange",
  [3]: "green",
  [4]: "red",
};

export const appColorTheme = {
  brown_0: "#F8E1B7",
  brown_1: "#754E1A",
  brown_2: "#D17B49",
  grey_0: "#f9fafb",
  grey_1: "#F4F6F8",
  grey_2: "#EAEAEA",
  black_0: "#00060F",
  white_0: "#ffffff",
  green_0: "#38a169 ",
  blue_0: "#3182ce",
  red_0: "#e53e3e",
};
