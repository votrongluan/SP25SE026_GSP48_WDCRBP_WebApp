import { FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function AddressInput({ formData, onChange }) {
  // Get data from Redux store
  const { provinces, districts, wards } = useSelector(
    (state) => state.vnLocation
  );

  // Filter districts and wards based on selected values
  const filteredDistricts = useMemo(() => {
    if (!formData.cityId) return [];
    return Object.entries(districts).filter(([key]) =>
      key.startsWith(formData.cityId)
    );
  }, [districts, formData.cityId]);

  const filteredWards = useMemo(() => {
    if (!formData.districtId) return [];
    return Object.entries(wards).filter(([key]) =>
      key.startsWith(formData.districtId)
    );
  }, [wards, formData.districtId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel>Tỉnh/Thành phố</FormLabel>
        <Select
          name="cityId"
          value={formData.cityId}
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
          name="districtId"
          value={formData.districtId}
          onChange={handleChange}
          placeholder="Chọn quận/huyện"
          bg="white"
          isDisabled={!formData.cityId}
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
          name="wardCode"
          value={formData.wardCode}
          onChange={handleChange}
          placeholder="Chọn phường/xã"
          bg="white"
          isDisabled={!formData.districtId}
        >
          {filteredWards.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
