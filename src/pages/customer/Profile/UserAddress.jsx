import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Heading,
  IconButton,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useNotify } from "../../../components/Utility/Notify";

export default function UserAddress() {
  const notify = useNotify();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      province: "01",
      district: "001",
      ward: "00001",
      address: "123 Nguyễn Văn Linh",
      isDefault: true,
    },
    {
      id: 2,
      province: "02",
      district: "002",
      ward: "00002",
      address: "456 Lê Lợi",
      isDefault: false,
    },
  ]);
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    ward: "",
    address: "",
    isDefault: false,
  });

  // Get data from Redux store
  const { provinces, districts, wards } = useSelector(
    (state) => state.vnLocation
  );

  // Filter districts and wards based on selected values
  const filteredDistricts = useMemo(() => {
    if (!formData.province) return [];
    return Object.entries(districts).filter(([key]) =>
      key.startsWith(formData.province)
    );
  }, [districts, formData.province]);

  const filteredWards = useMemo(() => {
    if (!formData.district) return [];
    return Object.entries(wards).filter(([key]) =>
      key.startsWith(formData.district)
    );
  }, [wards, formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when parent field changes
      ...(name == "province" && { district: "", ward: "" }),
      ...(name == "district" && { ward: "" }),
    }));
  };

  const validateForm = () => {
    if (!formData.province) {
      notify("Vui lòng chọn tỉnh/thành phố", "", "error");
      return false;
    }
    if (!formData.district) {
      notify("Vui lòng chọn quận/huyện", "", "error");
      return false;
    }
    if (!formData.ward) {
      notify("Vui lòng chọn phường/xã", "", "error");
      return false;
    }
    if (!formData.address.trim()) {
      notify("Vui lòng nhập tên đường/số nhà", "", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditing) {
      handleAddressUpdate(currentAddress.id, formData);
      notify("Địa chỉ đã được cập nhật", "", "success");
    } else {
      if (addresses.length >= 3) {
        notify("Đã đạt giới hạn tối đa 3 địa chỉ", "", "error");
        return;
      }
      handleAddressAdd(formData);
      notify("Địa chỉ đã được thêm", "", "success");
    }
    onClose();
    resetForm();
  };

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setFormData(address);
    setIsEditing(true);
    onOpen();
  };

  const handleAdd = () => {
    setCurrentAddress(null);
    resetForm();
    setIsEditing(false);
    onOpen();
  };

  const resetForm = () => {
    setFormData({
      province: "",
      district: "",
      ward: "",
      address: "",
      isDefault: false,
    });
  };

  const handleAddressUpdate = (addressId, updatedData) => {
    setAddresses((prev) =>
      prev.map((address) =>
        address.id == addressId
          ? { ...address, ...updatedData }
          : updatedData.isDefault
          ? { ...address, isDefault: false }
          : address
      )
    );
  };

  const handleAddressAdd = (newAddress) => {
    const newId = Math.max(...addresses.map((a) => a.id), 0) + 1;
    setAddresses((prev) => [
      ...prev,
      {
        ...newAddress,
        id: newId,
      },
    ]);
  };

  const handleSetDefault = (addressId) => {
    handleAddressUpdate(addressId, { isDefault: true });
    notify("Đã đặt làm địa chỉ mặc định", "", "success");
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading
          fontFamily="Montserrat"
          fontWeight="normal"
          as="h3"
          fontSize="22px"
        >
          Địa chỉ của bạn
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          onClick={handleAdd}
          isDisabled={addresses.length >= 3}
        >
          Thêm địa chỉ
        </Button>
      </HStack>

      <Stack spacing={4}>
        {addresses.map((address) => (
          <Box
            key={address.id}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <HStack justify="space-between" mb={2}>
              <HStack>
                {address.isDefault && (
                  <Text
                    px={2}
                    py={1}
                    bg="green.100"
                    color="green.800"
                    borderRadius="md"
                    fontSize="sm"
                  >
                    Mặc định
                  </Text>
                )}
              </HStack>
              <HStack>
                {!address.isDefault && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                )}
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(address)}
                />
              </HStack>
            </HStack>
            <Text>
              {address.address}, {wards[address.ward]},{" "}
              {districts[address.district]}, {provinces[address.province]}
            </Text>
          </Box>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="Chọn tỉnh/thành phố"
                    bg="white"
                  >
                    {Object.entries(provinces).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Chọn quận/huyện"
                    bg="white"
                    isDisabled={!formData.province}
                  >
                    {filteredDistricts.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    placeholder="Chọn phường/xã"
                    bg="white"
                    isDisabled={!formData.district}
                  >
                    {filteredWards.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tên đường/Số nhà</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nhập tên đường và số nhà"
                    bg="white"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                  {isEditing ? "Cập nhật" : "Thêm mới"}
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
