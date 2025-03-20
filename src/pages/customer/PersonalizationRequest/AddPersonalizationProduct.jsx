import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useToast,
  Checkbox,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import AutoResizeTextarea from "../../../components/Input/AutoResizeTextarea.jsx";
import ActionButton from "../../../components/Button/ActionButton.jsx";
import { appColorTheme } from "../../../config/appconfig.js";

export default function AddPersonalizationProduct({
  productData,
  setProductData,
  productList,
  setProductList,
  handleProductInputChange,
  handleAddProduct,
}) {
  const toast = useToast();

  return (
    <Box pl="20px">
      <Box bgColor="white" p="20px" borderRadius="10px">
        <Heading fontWeight="bold" fontSize="20px" mb={4}>
          Thêm sản phẩm
        </Heading>

        <FormControl mt={4} isRequired>
          <FormLabel>Loại sản phẩm</FormLabel>
          <Select>
            <option>Giường</option>
          </Select>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Loại sản phẩm</FormLabel>
          <Select>
            <option>Giường 2 tầng</option>
          </Select>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Kích thước mong muốn (cm)</FormLabel>
          <Flex gap={2}>
            <Input
              placeholder="Dài"
              name="length"
              value={productData.length}
              onChange={handleProductInputChange}
            />
            <Input
              placeholder="Rộng"
              name="width"
              value={productData.width}
              onChange={handleProductInputChange}
            />
            <Input
              placeholder="Cao"
              name="height"
              value={productData.height}
              onChange={handleProductInputChange}
            />
          </Flex>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Loại gỗ mong muốn</FormLabel>
          <Input
            placeholder="Nhập loại gỗ"
            name="woodType"
            value={productData.woodType}
            onChange={handleProductInputChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Hoàn thiện bề mặt</FormLabel>
          <Input
            placeholder="Nhập hoàn thiện bề mặt"
            name="finishType"
            value={productData.finishType}
            onChange={handleProductInputChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Màu sắc mong muốn</FormLabel>
          <Input
            placeholder="Nhập màu sắc"
            name="color"
            value={productData.color}
            onChange={handleProductInputChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Yêu cầu chạm trổ / điêu khắc</FormLabel>
          <AutoResizeTextarea
            placeholder="Mô tả chi tiết"
            name="carvingDetails"
            value={productData.carvingDetails}
            onChange={handleProductInputChange}
            mt={2}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Hình ảnh mô tả</FormLabel>
          <Input
            type="file"
            accept="image/*"
            name="referenceImageFile"
            onChange={(e) =>
              setProductData({
                ...productData,
                referenceImageFile: e.target.files[0],
              })
            }
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Yêu cầu đặc biệt khác (nếu có)</FormLabel>
          <AutoResizeTextarea
            name="specialRequest"
            value={productData.specialRequest}
            onChange={handleProductInputChange}
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Số lượng đặt hàng</FormLabel>
          <Input
            type="number"
            placeholder="Số lượng"
            name="quantity"
            value={productData.quantity}
            onChange={handleProductInputChange}
          />
        </FormControl>

        <Flex>
          <Spacer />
          <ActionButton text={"+ Thêm"} onClickExeFn={handleAddProduct} />
        </Flex>
      </Box>
    </Box>
  );
}
