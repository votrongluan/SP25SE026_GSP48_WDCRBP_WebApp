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
import { appColorTheme } from "../../../../config/appconfig.js";
import { FiFilter } from "react-icons/fi";

export default function FiltersComponent() {
  const [ratingRange, setRatingRange] = useState([1, 5]);

  return (
    <Box p={5} boxShadow="md" bgColor="white">
      <Heading fontWeight="bold" fontSize="20px" mb={5}>
        Bộ lọc
      </Heading>

      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
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
            <option value="rating-asc">Đề xuất</option>
            <option value="rating-asc">Số sao: Tăng dần</option>
            <option value="rating-desc">Số sao: Giảm dần</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </Select>
        </Box>

        <Input placeholder="Tên xưởng" />

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
          leftIcon={<FiFilter />}
        >
          Lọc
        </Button>
      </Flex>
    </Box>
  );
}
