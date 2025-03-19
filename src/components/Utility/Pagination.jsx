import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { appColorTheme } from "../../config/appconfig";

export default function Pagination({
  dataList,
  DisplayComponent,
  itemsPerPage = 4,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedItems = dataList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Box>
      <Text mb={4}>Tìm thấy {dataList.length} kết quả</Text>

      <DisplayComponent data={paginatedItems} />

      <Flex justifyContent="center" mt={10}>
        <ReactPaginate
          pageCount={Math.ceil(dataList.length / itemsPerPage)}
          onPageChange={handlePageChange}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
        />
      </Flex>

      <style>
        {`
          .pagination {
            display: flex;
            list-style: none;
            gap: 8px;
          }
          .page-link {
            padding: 8px 12px;
            color: ${appColorTheme.brown_2};
            border: 1px solid ${appColorTheme.brown_2};
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
          }
          .page-link:hover {
            background: ${appColorTheme.brown_0};
          }
          .active .page-link {
            background: ${appColorTheme.brown_2};
            color: white;
          }
        `}
      </style>
    </Box>
  );
}
