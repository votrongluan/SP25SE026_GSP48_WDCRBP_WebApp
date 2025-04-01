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
  purple_0: "#9f7aea",
  orange_0: "#f6ad55",
  yellow_0: "#f6e05e",
  pink_0: "#f687b3",
  teal_0: "#4fd1c5",
  cyan_0: "#0dcaf0",
  lime_0: "#a6f4c5",
  fuchsia_0: "#d946ef",
  rose_0: "#f43f5e",
};

export const transactionTypeConstants = {
  NAP_VI: "Nạp ví",
  RUT_VI: "Rút ví",
  THANH_TOAN_BANG_VI: "Thanh toán bằng ví",
  THANH_TOAN_QUA_CONG: "Thanh bằng VNPay",
  NHAN_TIEN: "Nhận tiền",
};

export const transactionTypeColorMap = {
  [transactionTypeConstants.NAP_VI]: "#38a169",
  [transactionTypeConstants.RUT_VI]: "#9f7aea",
  [transactionTypeConstants.THANH_TOAN_BANG_VI]: "#9f7aea",
  [transactionTypeConstants.THANH_TOAN_QUA_CONG]: "#9f7aea",
  [transactionTypeConstants.NHAN_TIEN]: "#38a169",
};

export const service = {
  ["Personalization"]: {
    serviceName: "Dịch vụ thiết kế và gia công theo ý tưởng khách hàng",
    serviceType: "Personalization",
    description:
      "Dịch vụ thiết kế và gia công theo ý tưởng khách hàng, giúp bạn biến ý tưởng thành hiện thực.",
    path: "personalization",
    buttonText: "Đặt dịch vụ",
    action: "navigate",
  },
  ["Customization"]: {
    serviceName: "Dịch vụ gia công theo ý tưởng thiết kế của xưởng",
    serviceType: "Customization",
    description:
      "Dịch vụ gia công theo ý tưởng thiết kế của xưởng, đảm bảo chất lượng và độ chính xác.",
    path: "design",
    buttonText: "Xem thiết kế",
    action: "changeTab",
    tabIndex: 2,
  },
  ["Guarantee"]: {
    serviceName: "Dịch vụ sửa chữa và bảo hành sản phẩm của xưởng",
    serviceType: "Guarantee",
    description:
      "Dịch vụ sửa chữa và bảo hành sản phẩm của xưởng, đảm bảo sự hài lòng của khách hàng.",
    path: "guarantee",
    buttonText: "Đặt dịch vụ",
    action: "navigate",
  },
  ["Sale"]: {
    serviceName: "Dịch vụ bán sản phẩm có sẵn",
    serviceType: "Sale",
    description:
      "Dịch vụ bán sản phẩm có sẵn, giúp bạn dễ dàng lựa chọn sản phẩm phù hợp.",
    path: "products",
    buttonText: "Xem sản phẩm",
    action: "changeTab",
    tabIndex: 3,
  },
};
