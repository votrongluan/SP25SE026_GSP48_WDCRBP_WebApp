export const validateRegister = (data) => {
  const errors = [];

  // Validate username
  if (!data.username) {
    errors.push("Tên người dùng là bắt buộc");
  } else if (data.username.length < 3) {
    errors.push("Tên người dùng phải có ít nhất 3 ký tự");
  }

  // Validate email
  if (!data.email) {
    errors.push("Email là bắt buộc");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email không hợp lệ");
  }

  // Validate password
  if (!data.password) {
    errors.push("Mật khẩu là bắt buộc");
  } else if (data.password.length < 4) {
    errors.push("Mật khẩu phải có ít nhất 4 ký tự");
  }

  // Validate rePassword
  if (!data.rePassword) {
    errors.push("Vui lòng nhập lại mật khẩu");
  } else if (data.password !== data.rePassword) {
    errors.push("Mật khẩu không trùng nhau");
  }

  // Validate phone
  if (!data.phone) {
    errors.push("Số điện thoại là bắt buộc");
  } else if (!/^0[0-9]{9}$/.test(data.phone)) {
    errors.push("Số điện thoại không hợp lệ");
  }

  return errors;
};

export const validateWoodworkerRegister = (data) => {
  const errors = [];

  // Validate fullName
  if (!data.fullName) {
    errors.push("Họ và tên là bắt buộc");
  } else if (data.fullName.length < 3) {
    errors.push("Họ và tên phải có ít nhất 3 ký tự");
  }

  // Validate email
  if (!data.email) {
    errors.push("Email là bắt buộc");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email không hợp lệ");
  }

  // Validate phone
  if (!data.phone) {
    errors.push("Số điện thoại là bắt buộc");
  } else if (!/^0[0-9]{9}$/.test(data.phone)) {
    errors.push("Số điện thoại không hợp lệ");
  }

  // Validate brandName
  if (!data.brandName) {
    errors.push("Tên xưởng mộc là bắt buộc");
  } else if (data.brandName.length < 3) {
    errors.push("Tên xưởng mộc phải có ít nhất 3 ký tự");
  }

  // Validate businessType
  if (!data.businessType) {
    errors.push("Loại hình kinh doanh là bắt buộc");
  }

  // Validate address
  if (!data.address) {
    errors.push("Địa chỉ xưởng là bắt buộc");
  }

  // Validate wardCode, districtId, cityId
  if (!data.wardCode || !data.districtId || !data.cityId) {
    errors.push("Vui lòng chọn đầy đủ thông tin địa chỉ");
  }

  // Validate taxCode
  if (!data.taxCode) {
    errors.push("Mã số thuế là bắt buộc");
  } else if (!/^[0-9]{10}$/.test(data.taxCode)) {
    errors.push("Mã số thuế phải có 10 chữ số");
  }

  // Validate bio
  if (!data.bio) {
    errors.push("Giới thiệu là bắt buộc");
  }

  // Validate imgUrl
  if (!data.imgUrl) {
    errors.push("Ảnh đại diện là bắt buộc");
  }

  return errors;
};
