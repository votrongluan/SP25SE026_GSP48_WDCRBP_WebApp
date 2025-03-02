import React from "react";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  data, // current page's data from backend
  totalPages, // total number of pages provided by backend
  currentPage, // current page number
  onPageChange, // callback when page changes
  DisplayData, // component to render the data
}) => {
  const pageRange = 5; // Number of page buttons to show around the current page
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo(0, 0);
  };

  const handleFirstPage = () => {
    onPageChange(1);
    window.scrollTo(0, 0);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
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
      {/* Render the current page's data */}
      <DisplayData data={data} />

      {/* Pagination Buttons */}
      <Flex alignItems="center" direction="row" mt={5} justify="center">
        <HStack spacing={2}>
          {currentPage > 1 && (
            <>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleFirstPage}
              >
                Trang đầu
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handlePrevPage}
              >
                <FaChevronLeft />
              </Button>
            </>
          )}
          {renderPageButtons()}
          {currentPage < totalPages && (
            <>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleNextPage}
              >
                <FaChevronRight />
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleLastPage}
              >
                Trang cuối
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </>
  );
};

export default Pagination;
