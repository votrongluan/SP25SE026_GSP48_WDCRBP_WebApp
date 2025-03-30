import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Spinner,
  Input,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  useGetAllProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useGetWardByDistrictIdQuery,
} from "../../services/ghnApi";
import { useState, useEffect } from "react";

export default function AddressInput({ value, onChange }) {
  const [address, setAddress] = useState({
    street: value?.street || "",
    cityId: value?.cityId || "",
    districtId: value?.districtId || "",
    wardCode: value?.wardCode || "",
    cityName: value?.cityName || "",
    districtName: value?.districtName || "",
    wardName: value?.wardName || "",
  });

  const { data: provincesResponse, isLoading: isLoadingProvinces } =
    useGetAllProvinceQuery();
  const { data: districtsResponse, isLoading: isLoadingDistricts } =
    useGetDistrictByProvinceIdQuery(address.cityId, {
      skip: !address.cityId,
    });
  const { data: wardsResponse, isLoading: isLoadingWards } =
    useGetWardByDistrictIdQuery(address.districtId, {
      skip: !address.districtId,
    });

  useEffect(() => {
    onChange(address);
  }, [address, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lấy tên tương ứng với ID được chọn
    let newAddress = { ...address, [name]: value };

    if (name === "cityId") {
      const selectedProvince = provincesResponse?.data?.data?.find(
        (p) => p.ProvinceID === parseInt(value)
      );
      newAddress.cityName = selectedProvince?.ProvinceName || "";
      // Reset district và ward khi đổi tỉnh
      newAddress.districtId = "";
      newAddress.districtName = "";
      newAddress.wardCode = "";
      newAddress.wardName = "";
    } else if (name === "districtId") {
      const selectedDistrict = districtsResponse?.data?.data?.find(
        (d) => d.DistrictID === parseInt(value)
      );
      newAddress.districtName = selectedDistrict?.DistrictName || "";
      // Reset ward khi đổi quận
      newAddress.wardCode = "";
      newAddress.wardName = "";
    } else if (name === "wardCode") {
      const selectedWard = wardsResponse?.data?.data?.find(
        (w) => w.WardCode === value
      );
      newAddress.wardName = selectedWard?.WardName || "";
    }

    setAddress(newAddress);
  };

  return (
    <Box>
      <Text mb={2}>Địa chỉ</Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={10}>
          <FormControl isRequired>
            <FormLabel>Tỉnh/Thành phố</FormLabel>
            <Select
              name="cityId"
              value={address.cityId}
              onChange={handleChange}
              placeholder="Chọn tỉnh/thành phố"
              bg="white"
              isDisabled={isLoadingProvinces}
            >
              {provincesResponse?.data?.data?.map((province) => (
                <option key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </option>
              ))}
            </Select>
            {isLoadingProvinces && <Spinner size="sm" mt={2} />}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Quận/Huyện</FormLabel>
            <Select
              name="districtId"
              value={address.districtId}
              onChange={handleChange}
              placeholder="Chọn quận/huyện"
              bg="white"
              isDisabled={!address.cityId || isLoadingDistricts}
            >
              {districtsResponse?.data?.data?.map((district) => (
                <option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </option>
              ))}
            </Select>
            {isLoadingDistricts && <Spinner size="sm" mt={2} />}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phường/Xã</FormLabel>
            <Select
              name="wardCode"
              value={address.wardCode}
              onChange={handleChange}
              placeholder="Chọn phường/xã"
              bg="white"
              isDisabled={!address.districtId || isLoadingWards}
            >
              {wardsResponse?.data?.data?.map((ward) => (
                <option key={ward.WardCode} value={ward.WardCode}>
                  {ward.WardName}
                </option>
              ))}
            </Select>
            {isLoadingWards && <Spinner size="sm" mt={2} />}
          </FormControl>
        </Stack>

        <FormControl isRequired>
          <FormLabel>Số nhà, tên đường</FormLabel>
          <Input
            placeholder="Nhập tên đường, số nhà"
            name="street"
            value={address.street}
            onChange={handleChange}
            bg="white"
          />
        </FormControl>
      </SimpleGrid>
    </Box>
  );
}
