import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import { FiFilter } from "react-icons/fi";
import { useGetAllProvinceSelectQuery } from "../../../../../../services/ghnApi.js";
import CategorySearchCombobox from "../../../../../../components/Utility/CategorySearchCombobox.jsx";
import { formatPrice } from "../../../../../../utils/utils.js";

export default function FiltersComponent({ onFilterChange }) {
  const { data: provinces, isLoading: isLoadingProvinces } =
    useGetAllProvinceSelectQuery();

  const [localFilters, setLocalFilters] = useState({
    priceRange: [0, 50000000],
    ratingRange: [0, 5],
    province: "",
    sortBy: "",
    searchTerm: "",
    categoryId: null,
    workshopType: "",
    applyFilters: true,
    applySearch: true,
  });

  const handleLocalFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange?.(localFilters);
  };

  const setCategoryId = (categoryId) => {
    handleLocalFilterChange("categoryId", categoryId);
  };

  return (
    <Box p={5} boxShadow="md" bgColor="white">
      <Heading fontWeight="bold" fontSize="20px" mb={6}>
        Bộ lọc sản phẩm
      </Heading>

      <Box borderTop="1px solid #ccc" mb={2} py={2} px={4}>
        <Text>Danh mục</Text>
        <CategorySearchCombobox setCategoryId={setCategoryId} />
      </Box>

      <Accordion allowMultiple>
        {/* Bộ lọc Giá với RangeSlider 2 đầu */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Lọc theo giá
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <RangeSlider
              aria-label={["Minimum price", "Maximum price"]}
              defaultValue={localFilters.priceRange}
              min={0}
              max={50000000}
              step={1000000}
              onChange={(val) => handleLocalFilterChange("priceRange", val)}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text mt={2}>
              {formatPrice(localFilters.priceRange[0])} -{" "}
              {formatPrice(localFilters.priceRange[1])}
            </Text>
          </AccordionPanel>
        </AccordionItem>

        {/* Bộ lọc Số sao với RangeSlider 2 đầu */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Lọc theo số sao
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <RangeSlider
              aria-label={["Minimum rating", "Maximum rating"]}
              defaultValue={localFilters.ratingRange}
              min={0}
              max={5}
              step={0.1}
              onChange={(val) => handleLocalFilterChange("ratingRange", val)}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text mt={2}>
              ⭐ {localFilters.ratingRange[0].toFixed(1)} -{" "}
              {localFilters.ratingRange[1].toFixed(1)}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Thanh search và sắp xếp */}
      <Flex flexDirection="column" mt={4} gap={5}>
        <Box>
          <Select
            placeholder="Sắp xếp theo"
            bgColor="white"
            value={localFilters.sortBy}
            onChange={(e) => handleLocalFilterChange("sortBy", e.target.value)}
          >
            <option value="rating-desc">Đề xuất</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="rating-asc">Số sao: Tăng dần</option>
            <option value="rating-desc">Số sao: Giảm dần</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </Select>
        </Box>

        <Input
          placeholder="Tên sản phẩm"
          value={localFilters.searchTerm}
          onChange={(e) =>
            handleLocalFilterChange("searchTerm", e.target.value)
          }
        />

        <Checkbox
          isChecked={localFilters.applyFilters}
          onChange={(e) =>
            handleLocalFilterChange("applyFilters", e.target.checked)
          }
        >
          Áp dụng bộ lọc
        </Checkbox>

        <Checkbox
          isChecked={localFilters.applySearch}
          onChange={(e) =>
            handleLocalFilterChange("applySearch", e.target.checked)
          }
        >
          Áp dụng từ khóa
        </Checkbox>

        <Button
          _hover={{ bg: `${appColorTheme.brown_1}` }}
          bg={appColorTheme.brown_2}
          color="white"
          leftIcon={<FiFilter />}
          onClick={handleApplyFilters}
        >
          Lọc
        </Button>
      </Flex>
    </Box>
  );
}
