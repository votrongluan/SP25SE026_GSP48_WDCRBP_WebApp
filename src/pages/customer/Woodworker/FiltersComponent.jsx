import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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
import { formatPrice } from "../../../utils/utils";
import { appColorTheme } from "../../../data/globalData";

export function FiltersComponent() {
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [ratingRange, setRatingRange] = useState([1, 5]);

  return (
    <Box p={5} boxShadow="md" bgColor="white">
      <Heading fontWeight={500} fontSize="20px" mb={5}>
        Bộ lọc
      </Heading>

      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        {/* Bộ lọc Danh mục */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Danh mục
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Select placeholder="Chọn loại sản phẩm" bgColor="white">
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="rating-asc">Số sao: Tăng dần</option>
              <option value="rating-desc">Số sao: Giảm dần</option>
              <option value="name-asc">Tên: A-Z</option>
              <option value="name-desc">Tên: Z-A</option>
            </Select>
          </AccordionPanel>
        </AccordionItem>

        {/* Bộ lọc Tỉnh thành */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Tỉnh thành
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Select placeholder="Chọn tỉnh, thành" bgColor="white">
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="rating-asc">Số sao: Tăng dần</option>
              <option value="rating-desc">Số sao: Giảm dần</option>
              <option value="name-asc">Tên: A-Z</option>
              <option value="name-desc">Tên: Z-A</option>
            </Select>
          </AccordionPanel>
        </AccordionItem>

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
              defaultValue={[0, 20000000]}
              min={0}
              max={20000000}
              step={1000000}
              onChange={(val) => setPriceRange(val)}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text mt={2}>
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
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
              defaultValue={[1, 5]}
              min={1}
              max={5}
              step={0.1}
              onChange={(val) => setRatingRange(val)}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text mt={2}>
              ⭐ {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Thanh search */}
      <Flex flexDirection="column" mt={4} gap={4}>
        {/* "Sắp xếp theo" select */}
        <Box>
          <Select placeholder="Sắp xếp theo" bgColor="white">
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="rating-asc">Số sao: Tăng dần</option>
            <option value="rating-desc">Số sao: Giảm dần</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </Select>
        </Box>

        <Input placeholder="Từ khóa" />

        <Checkbox defaultChecked value="danang">
          Áp dụng bộ lọc
        </Checkbox>

        <Checkbox defaultChecked value="danang">
          Áp dụng từ khóa
        </Checkbox>

        <Button
          _hover={{ bg: `${appColorTheme.brown_1}` }}
          bg={appColorTheme.brown_2}
          color="white"
        >
          Lọc
        </Button>
      </Flex>
    </Box>
  );
}
