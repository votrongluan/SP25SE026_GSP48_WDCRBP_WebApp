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
