import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Heading,
  useToast,
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
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import {
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetWardsQuery,
} from "../../../services/VNLocationApi";

export default function UserAddress() {
  const toast = useToast();
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

  // Fetch all data
  const { data: provinces, isLoading: isLoadingProvinces } =
    useGetProvincesQuery();
  const { data: allDistricts, isLoading: isLoadingDistricts } =
    useGetDistrictsQuery();
  const { data: allWards, isLoading: isLoadingWards } = useGetWardsQuery();

  // Filter districts and wards based on selected values
  const districts = useMemo(() => {
    if (!allDistricts || !formData.province) return [];
    return allDistricts.filter(
      (district) => district.province_code == formData.province
    );
  }, [allDistricts, formData.province]);

  const wards = useMemo(() => {
    if (!allWards || !formData.district) return [];
    return allWards.filter((ward) => ward.district_code == formData.district);
  }, [allWards, formData.district]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleAddressUpdate(currentAddress.id, formData);
      toast({
        title: "Địa chỉ đã được cập nhật",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (addresses.length >= 3) {
        toast({
          title: "Đã đạt giới hạn tối đa 3 địa chỉ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      handleAddressAdd(formData);
      toast({
        title: "Địa chỉ đã được thêm",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
        address.id === addressId
          ? { ...address, ...updatedData }
          : updatedData.isDefault
          ? { ...address, isDefault: false }
          : address
      )
    );
  };

  const handleAddressDelete = (addressId) => {
    setAddresses((prev) => prev.filter((address) => address.id !== addressId));
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
    toast({
      title: "Đã đặt làm địa chỉ mặc định",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
            p={4}
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
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleAddressDelete(address.id)}
                />
              </HStack>
            </HStack>
            <Text>
              {address.address}, {address.ward}, {address.district},{" "}
              {address.province}
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
                <FormControl>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="Chọn tỉnh/thành phố"
                    bg="white"
                    disabled={isLoadingProvinces}
                  >
                    {isLoadingProvinces ? (
                      <option>Đang tải...</option>
                    ) : (
                      provinces?.map((province) => (
                        <option key={province.value} value={province.value}>
                          {province.label}
                        </option>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Chọn quận/huyện"
                    bg="white"
                    isDisabled={!formData.province || isLoadingDistricts}
                  >
                    {isLoadingDistricts ? (
                      <option>Đang tải...</option>
                    ) : (
                      districts.map((district) => (
                        <option key={district.value} value={district.value}>
                          {district.label}
                        </option>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    placeholder="Chọn phường/xã"
                    bg="white"
                    isDisabled={!formData.district || isLoadingWards}
                  >
                    {isLoadingWards ? (
                      <option>Đang tải...</option>
                    ) : (
                      wards.map((ward) => (
                        <option key={ward.value} value={ward.value}>
                          {ward.label}
                        </option>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl>
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
