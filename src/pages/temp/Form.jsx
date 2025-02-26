import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Checkbox,
  CheckboxGroup,
  Textarea,
} from "@chakra-ui/react";

const OrderForm = () => {
  // Each item represents one set of "NỘI THẤT PHÒNG NGỦ MONG MUỐN" and "THÔNG SỐ KỸ THUẬT"
  const [items, setItems] = useState([{}]);

  const handleAddItem = () => {
    setItems([...items, {}]);
  };

  return (
    <Box p={4}>
      {/* THÔNG TIN KHÁCH HÀNG */}
      <Box mb={8} borderWidth="1px" p={4} borderRadius="md">
        <FormLabel fontSize="xl" mb={4}>
          THÔNG TIN KHÁCH HÀNG
        </FormLabel>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Họ &amp; Tên</FormLabel>
            <Input placeholder="Nhập họ &amp; tên" />
          </FormControl>
          <FormControl>
            <FormLabel>Số điện thoại</FormLabel>
            <Input placeholder="Nhập số điện thoại" />
          </FormControl>
          <FormControl>
            <FormLabel>Email (nếu có)</FormLabel>
            <Input placeholder="Nhập email" />
          </FormControl>
          <FormControl>
            <FormLabel>Địa chỉ nhận hàng</FormLabel>
            <Input placeholder="Nhập địa chỉ nhận hàng" />
          </FormControl>
        </VStack>
      </Box>

      {/* Dynamic Items */}
      {items.map((item, index) => (
        <Box key={index} mb={8} borderWidth="1px" p={4} borderRadius="md">
          <FormLabel fontSize="lg" mb={4}>
            NỘI THẤT PHÒNG NGỦ MONG MUỐN - Mục {index + 1}
          </FormLabel>
          <VStack spacing={6} align="stretch">
            {/* Furniture Options */}
            <Box>
              <FormLabel>Giường</FormLabel>
              <CheckboxGroup>
                <VStack align="start">
                  <Checkbox value="giuong-truyen-thong">
                    Giường truyền thống (bốn chân, có đầu giường)
                  </Checkbox>
                  <Checkbox value="giuong-bet">
                    Giường bệt (giường thấp, phong cách Nhật Bản)
                  </Checkbox>
                  <Checkbox value="giuong-hoc-keo">
                    Giường có hộc kéo (tích hợp ngăn chứa đồ)
                  </Checkbox>
                  <Checkbox value="giuong-phan">
                    Giường phản (dạng tấm gỗ lớn, không có chân)
                  </Checkbox>
                  <Checkbox value="giuong-thong-minh">
                    Giường thông minh (có thể gấp gọn hoặc kết hợp với sofa, tủ
                    sách)
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>

            <Box>
              <FormLabel>Tủ quần áo</FormLabel>
              <CheckboxGroup>
                <VStack align="start">
                  <Checkbox value="tu-am-tuong">Tủ âm tường</Checkbox>
                  <Checkbox value="tu-dung-dap">Tủ đứng độc lập</Checkbox>
                  <Checkbox value="tu-mo">
                    Tủ mở (không có cánh, trưng bày quần áo)
                  </Checkbox>
                  <Checkbox value="tu-ket-hop">
                    Tủ kết hợp kệ trang trí hoặc bàn làm việc
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>

            <Box>
              <FormLabel>Tủ đầu giường</FormLabel>
              <CheckboxGroup>
                <VStack align="start">
                  <Checkbox value="tu-don">Tủ đơn (có 1 - 2 ngăn kéo)</Checkbox>
                  <Checkbox value="tu-doi">Tủ đôi (có 3 - 4 ngăn kéo)</Checkbox>
                  <Checkbox value="tu-mo">Tủ mở (không có ngăn kéo)</Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>

            <Box>
              <FormLabel>Bàn trang điểm</FormLabel>
              <CheckboxGroup>
                <VStack align="start">
                  <Checkbox value="ban-treo-tuong">
                    Bàn trang điểm treo tường
                  </Checkbox>
                  <Checkbox value="ban-co-guong-gap">
                    Bàn trang điểm có gương gập
                  </Checkbox>
                  <Checkbox value="ban-co-hoc-tu">
                    Bàn trang điểm có hộc tủ chứa đồ
                  </Checkbox>
                  <Checkbox value="ban-ket-hop">
                    Bàn trang điểm kết hợp bàn làm việc
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>

            <Box>
              <FormLabel>Ghế</FormLabel>
              <CheckboxGroup>
                <VStack align="start">
                  <Checkbox value="ghe-ban-trang-diem">
                    Ghế ngồi bàn trang điểm
                  </Checkbox>
                  <Checkbox value="ghe-doc-sach">Ghế đọc sách</Checkbox>
                  <Checkbox value="ghe-thu-gian">
                    Ghế thư giãn (ghế bập bênh, ghế lười)
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>

            <Box>
              <FormLabel>Bàn làm việc</FormLabel>
              <CheckboxGroup>
                <VStack align="start">
                  <Checkbox value="ban-don-gian">
                    Bàn làm việc đơn giản
                  </Checkbox>
                  <Checkbox value="ban-co-hoc-tu">
                    Bàn làm việc có hộc tủ kéo
                  </Checkbox>
                  <Checkbox value="ban-ket-hop-ke-sach">
                    Bàn làm việc kết hợp kệ sách
                  </Checkbox>
                  <Checkbox value="ban-giap-gon">Bàn làm việc gấp gọn</Checkbox>
                  <Checkbox value="ban-treo-tuong">
                    Bàn làm việc treo tường
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </Box>

            {/* THÔNG SỐ KỸ THUẬT */}
            <Box pt={4} borderTopWidth="1px">
              <FormLabel fontSize="lg" mb={4}>
                THÔNG SỐ KỸ THUẬT - Mục {index + 1}
              </FormLabel>
              <VStack spacing={4} align="stretch">
                <Box>
                  <FormLabel>Kích thước mong muốn (cm)</FormLabel>
                  <HStack spacing={4}>
                    <Input placeholder="Dài" />
                    <Input placeholder="Rộng" />
                    <Input placeholder="Cao" />
                  </HStack>
                </Box>

                <Box>
                  <FormLabel>Loại gỗ mong muốn</FormLabel>
                  <CheckboxGroup>
                    <VStack align="start">
                      <Checkbox value="go-soi">Gỗ sồi</Checkbox>
                      <Checkbox value="go-oc-cho">Gỗ óc chó</Checkbox>
                      <Checkbox value="go-xoan-dao">Gỗ xoan đào</Checkbox>
                      <Checkbox value="go-go-do">Gỗ gõ đỏ</Checkbox>
                      <Checkbox value="mdf-plywood">MDF/Plywood</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                  <FormControl mt={2}>
                    <FormLabel>Khác</FormLabel>
                    <Input placeholder="Nhập loại gỗ khác" />
                  </FormControl>
                </Box>

                <Box>
                  <FormLabel>Hoàn thiện bề mặt</FormLabel>
                  <CheckboxGroup>
                    <VStack align="start">
                      <Checkbox value="son-pu-bong">Sơn PU bóng</Checkbox>
                      <Checkbox value="son-pu-mo">Sơn PU mờ</Checkbox>
                      <Checkbox value="dau-lau">Dầu lau</Checkbox>
                      <Checkbox value="veneer">Phủ veneer</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                  <FormControl mt={2}>
                    <FormLabel>Khác</FormLabel>
                    <Input placeholder="Nhập hoàn thiện khác" />
                  </FormControl>
                </Box>

                <Box>
                  <FormLabel>Màu sắc mong muốn</FormLabel>
                  <Input placeholder="Nhập màu sắc" />
                </Box>

                <Box>
                  <FormLabel>Có yêu cầu điêu khắc/trạm trổ không?</FormLabel>
                  <CheckboxGroup>
                    <HStack spacing={4}>
                      <Checkbox value="khong">Không</Checkbox>
                      <Checkbox value="co">Có</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                  <FormControl mt={2}>
                    <FormLabel>Nếu có, mô tả chi tiết:</FormLabel>
                    <Input placeholder="Nhập mô tả chi tiết" />
                  </FormControl>
                </Box>

                <Box>
                  <FormLabel>Hình ảnh mẫu (nếu có)</FormLabel>
                  <CheckboxGroup>
                    <HStack spacing={4}>
                      <Checkbox value="co">Có</Checkbox>
                      <Checkbox value="khong">Không</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </Box>

                <Box>
                  <FormLabel>Yêu cầu đặc biệt khác (nếu có)</FormLabel>
                  <Textarea placeholder="Ví dụ: Ngăn kéo, đầu giường bọc nệm, tích hợp đèn LED, v.v." />
                </Box>

                <Box>
                  <FormLabel>Số lượng đặt hàng</FormLabel>
                  <Input placeholder="Nhập số lượng" />
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Box>
      ))}

      <Button colorScheme="blue" onClick={handleAddItem} mb={8}>
        + Thêm Nội Thất Phòng Ngủ
      </Button>

      {/* THÔNG TIN ĐẶT HÀNG */}
      <Box mb={8} borderWidth="1px" p={4} borderRadius="md">
        <FormLabel fontSize="xl" mb={4}>
          THÔNG TIN ĐẶT HÀNG
        </FormLabel>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Mức phí tối đa có thể chi trả (VNĐ)</FormLabel>
            <Input placeholder="Nhập mức phí" />
          </FormControl>
          <FormControl>
            <FormLabel>Thời gian mong muốn nhận hàng</FormLabel>
            <Input placeholder="Nhập ngày nhận hàng" />
          </FormControl>
          <FormControl>
            <FormLabel>Yêu cầu vận chuyển &amp; lắp đặt</FormLabel>
            <CheckboxGroup>
              <HStack spacing={4}>
                <Checkbox value="chi-giao">Chỉ giao hàng</Checkbox>
                <Checkbox value="giao-va-lap-dat">Giao hàng + Lắp đặt</Checkbox>
              </HStack>
            </CheckboxGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Ghi chú khác</FormLabel>
            <Textarea placeholder="Nhập ghi chú" />
          </FormControl>
        </VStack>
      </Box>

      {/* Khách hàng xác nhận */}
      <Box mb={8} borderWidth="1px" p={4} borderRadius="md">
        <FormLabel fontSize="xl" mb={4}>
          Khách hàng xác nhận thông tin
        </FormLabel>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Ký tên</FormLabel>
            <Input placeholder="Nhập chữ ký" />
          </FormControl>
          <FormControl>
            <FormLabel>Ngày gửi</FormLabel>
            <Input placeholder="Nhập ngày gửi" />
          </FormControl>
        </VStack>
      </Box>

      <Button colorScheme="teal" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default OrderForm;
