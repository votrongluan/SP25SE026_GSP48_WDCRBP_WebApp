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
} from "@chakra-ui/react";
import { useState } from "react";
import AutoResizeTextarea from "../../../components/Inputs/AutoResizeTextarea.jsx";
import ActionButton from "../../../components/Buttons/ActionButton.jsx";

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
    <Box p="40px">
      <Heading fontSize="20px" mb={4}>
        Thêm sản phẩm
      </Heading>

      <FormControl isRequired>
        <FormLabel>Kích thước mong muốn (cm)</FormLabel>
        <Flex gap={2}>
          <Input
            borderColor="app_black.0"
            placeholder="Dài"
            name="length"
            value={productData.length}
            onChange={handleProductInputChange}
          />
          <Input
            borderColor="app_black.0"
            placeholder="Rộng"
            name="width"
            value={productData.width}
            onChange={handleProductInputChange}
          />
          <Input
            borderColor="app_black.0"
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
          borderColor="app_black.0"
          placeholder="Nhập loại gỗ"
          name="woodType"
          value={productData.woodType}
          onChange={handleProductInputChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Hoàn thiện bề mặt</FormLabel>
        <Input
          borderColor="app_black.0"
          placeholder="Nhập hoàn thiện bề mặt"
          name="finishType"
          value={productData.finishType}
          onChange={handleProductInputChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Màu sắc mong muốn</FormLabel>
        <Input
          borderColor="app_black.0"
          placeholder="Nhập màu sắc"
          name="color"
          value={productData.color}
          onChange={handleProductInputChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <Checkbox
          name="carving"
          isChecked={productData.carving}
          onChange={(e) =>
            setProductData({ ...productData, carving: e.target.checked })
          }
        >
          Yêu cầu điêu khắc/trạm trổ?
        </Checkbox>
        {productData.carving && (
          <AutoResizeTextarea
            placeholder="Mô tả chi tiết"
            name="carvingDetails"
            value={productData.carvingDetails}
            onChange={handleProductInputChange}
            mt={2}
          />
        )}
      </FormControl>

      <FormControl mt={4}>
        <Checkbox
          name="referenceImage"
          isChecked={productData.referenceImage}
          onChange={(e) =>
            setProductData({ ...productData, referenceImage: e.target.checked })
          }
        >
          Có hình ảnh mẫu không?
        </Checkbox>
        {productData.referenceImage && (
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
            mt={2}
            p={2}
            borderRadius="md"
            bg="white"
          />
        )}
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
          borderColor="app_black.0"
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
  );
}
