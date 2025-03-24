import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  HStack,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { FiDownload, FiUpload, FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import * as XLSX from "xlsx";
import { useNotify } from "../../../../../components/Utility/Notify";

const MIN_PRICE = 1000;
const MAX_PRICE = 50000000;
const PRICE_STEP = 1000;

export default function PriceDetailSection({
  productId,
  priceDetails,
  onPriceDetailsChange,
}) {
  const notify = useNotify();
  const [isEditing, setIsEditing] = useState(false);
  const [editingDetails, setEditingDetails] = useState(priceDetails || []);

  const validatePriceDetails = (details) => {
    const errors = [];
    const isValid = details.every((detail, index) => {
      if (detail.type.trim() === "") {
        errors.push(`Dòng ${index + 1}: Loại chi phí không được để trống`);
        return false;
      }
      if (detail.quantity.trim() === "") {
        errors.push(`Dòng ${index + 1}: Số lượng không được để trống`);
        return false;
      }
      if (detail.price < MIN_PRICE || detail.price > MAX_PRICE) {
        errors.push(
          `Dòng ${
            index + 1
          }: Giá phải từ ${MIN_PRICE.toLocaleString()}đ đến ${MAX_PRICE.toLocaleString()}đ`
        );
        return false;
      }
      if (detail.price % PRICE_STEP !== 0) {
        errors.push(
          `Dòng ${
            index + 1
          }: Giá phải là bội số của ${PRICE_STEP.toLocaleString()}đ`
        );
        return false;
      }
      return true;
    });

    return { isValid, errors };
  };

  const handleStartEdit = () => {
    setEditingDetails(priceDetails || []);
    setIsEditing(true);
  };

  const handleSave = () => {
    const { isValid, errors } = validatePriceDetails(editingDetails);
    if (!isValid) {
      notify("Dữ liệu không hợp lệ", errors.join("\\n"), "error");
      return;
    }

    onPriceDetailsChange(productId, editingDetails);
    setIsEditing(false);
    notify("Lưu thành công", "Đã cập nhật chi tiết giá", "success");
  };

  const handleCancel = () => {
    setEditingDetails(priceDetails || []);
    setIsEditing(false);
  };

  const handleAddPriceDetail = () => {
    setEditingDetails([
      ...editingDetails,
      {
        id: Date.now(),
        type: "",
        quantity: "",
        price: MIN_PRICE,
      },
    ]);
  };

  const handlePriceDetailChange = (detailId, field, value) => {
    setEditingDetails(
      editingDetails.map((detail) =>
        detail.id === detailId
          ? {
              ...detail,
              [field]: field === "price" ? Number(value) : value,
            }
          : detail
      )
    );
  };

  const handleRemovePriceDetail = (detailId) => {
    setEditingDetails(
      editingDetails.filter((detail) => detail.id !== detailId)
    );
  };

  const calculateTotalPrice = (details) => {
    return details?.reduce((total, detail) => total + detail.price, 0) || 0;
  };

  const handleExportExcel = () => {
    if (!priceDetails?.length) {
      notify("Không có dữ liệu", "Không có chi tiết giá để xuất", "warning");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(
      priceDetails.map((detail, index) => ({
        "Số thứ tự": index + 1,
        "Loại chi phí": detail.type,
        "Số lượng cần dùng": detail.quantity,
        "Chi phí": detail.price,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Chi tiết giá");
    XLSX.writeFile(wb, `chi-tiet-gia.xlsx`);
  };

  const handleImportExcel = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((row, index) => ({
        id: Date.now() + index,
        type: row["Loại chi phí"] || "",
        quantity: row["Số lượng cần dùng"] || "",
        price: Number(row["Chi phí"]) || MIN_PRICE,
      }));

      setEditingDetails(formattedData);
      setIsEditing(true);
      notify(
        "Nhập dữ liệu thành công",
        "Vui lòng kiểm tra và lưu lại thông tin",
        "success"
      );
    } catch (error) {
      notify("Lỗi nhập dữ liệu", "Có lỗi xảy ra khi đọc file Excel", "error");
    }
  };

  const displayDetails = isEditing ? editingDetails : priceDetails;

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="bold">Báo giá chi tiết</Text>
        <HStack>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImportExcel}
            style={{ display: "none" }}
            id={`excel-upload-${productId}`}
          />
          <label htmlFor={`excel-upload-${productId}`}>
            <Button
              as="span"
              size="sm"
              leftIcon={<FiDownload />}
              colorScheme="blue"
              cursor="pointer"
              isDisabled={isEditing}
            >
              Nhập file excel
            </Button>
          </label>
          <Button
            size="sm"
            leftIcon={<FiUpload />}
            onClick={handleExportExcel}
            colorScheme="green"
            isDisabled={isEditing}
          >
            Xuất file excel
          </Button>
          {!isEditing ? (
            <IconButton
              icon={<FiEdit />}
              onClick={handleStartEdit}
              colorScheme="teal"
              size="sm"
            />
          ) : (
            <IconButton
              icon={<FiPlus />}
              onClick={handleAddPriceDetail}
              colorScheme="teal"
              size="sm"
            />
          )}
        </HStack>
      </HStack>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Số thứ tự</Th>
            <Th>Loại chi phí</Th>
            <Th>Số lượng cần dùng</Th>
            <Th>Chi phí</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayDetails?.map((detail, index) => (
            <Tr key={detail.id}>
              <Td>{index + 1}</Td>
              <Td>
                {isEditing ? (
                  <Input
                    size="sm"
                    value={detail.type}
                    onChange={(e) =>
                      handlePriceDetailChange(detail.id, "type", e.target.value)
                    }
                  />
                ) : (
                  detail.type
                )}
              </Td>
              <Td>
                {isEditing ? (
                  <Input
                    size="sm"
                    value={detail.quantity}
                    onChange={(e) =>
                      handlePriceDetailChange(
                        detail.id,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  detail.quantity
                )}
              </Td>
              <Td>
                {isEditing ? (
                  <Input
                    size="sm"
                    type="number"
                    value={detail.price}
                    onChange={(e) =>
                      handlePriceDetailChange(
                        detail.id,
                        "price",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  detail.price.toLocaleString() + "đ"
                )}
              </Td>
              <Td>
                {isEditing && (
                  <IconButton
                    icon={<FiTrash2 />}
                    onClick={() => handleRemovePriceDetail(detail.id)}
                    colorScheme="red"
                    size="sm"
                  />
                )}
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td colSpan={3} textAlign="right" fontWeight="bold">
              Tổng chi phí:
            </Td>
            <Td fontWeight="bold">
              {calculateTotalPrice(displayDetails).toLocaleString()}đ
            </Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>

      {isEditing && (
        <ButtonGroup spacing={2} mt={4} width="100%" justifyContent="flex-end">
          <Button onClick={handleCancel} variant="outline">
            Hủy
          </Button>
          <Button onClick={handleSave} colorScheme="blue">
            Lưu
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
}

PriceDetailSection.propTypes = {
  productId: PropTypes.number.isRequired,
  priceDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
  onPriceDetailsChange: PropTypes.func.isRequired,
};
