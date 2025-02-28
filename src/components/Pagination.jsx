import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const Pagination = ({ data, DisplayData }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);
  const [customPage, setCustomPage] = useState(""); // State for the custom page input

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const pageRange = 5; // Number of page buttons to show around the current page
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log(startIndex, endIndex);

  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo(0, 0);
  };

  const handleCustomPageChange = (e) => {
    setCustomPage(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    if (+e.target.value < 1) {
      setItemsPerPage(1);
      setCustomPage(1);
    } else {
      setItemsPerPage(+e.target.value);
      setCustomPage(1);
    }
  };

  const goToCustomPage = () => {
    const parsedPage = parseInt(customPage, 10);
    if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
      setCurrentPage(parsedPage);
      setCustomPage("");
      window.scrollTo(0, 0);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          variant="solid"
          colorScheme={currentPage === page ? "blue" : "gray"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      <DisplayData currentData={currentData} />

      <Flex
        alignItems="center"
        direction="row"
        mt="80px"
        justify="space-between"
      >
        <Box>
          <Flex columnGap="20px" alignItems="center">
            <Text>Số lượng hàng mỗi trang</Text>
            <NumberInput defaultValue={itemsPerPage} step={1} min={1}>
              <NumberInputField
                bgColor="app_white.0"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                w="100px"
              />
            </NumberInput>
          </Flex>
        </Box>

        <Box>
          <HStack ml="100px">
            {currentPage > 1 && (
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleFirstPage}
              >
                Trang đầu: {1}
              </Button>
            )}
            {renderPageButtons()}
            {currentPage < totalPages && (
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleLastPage}
              >
                Trang cuối: {Math.ceil(data.length / itemsPerPage)}
              </Button>
            )}
          </HStack>
        </Box>

        <Stack direction="row" spacing={2} justify="center">
          <Input
            bgColor="app_white.0"
            value={customPage}
            onChange={handleCustomPageChange}
            placeholder="Nhập số trang"
          />
          <Button variant="solid" colorScheme="blue" onClick={goToCustomPage}>
            Đi
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default Pagination;
