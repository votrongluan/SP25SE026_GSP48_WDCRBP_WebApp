import { Box, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import DesignList from "./DesignList.jsx";
import { useState, useMemo } from "react";
import { useGetAllDesignIdeasByWoodworkerQuery } from "../../../../../../services/designIdeaApi.js";
import { useParams } from "react-router-dom";

export default function WoodworkerDesignsTab() {
  const { id } = useParams();
  const { data: response } = useGetAllDesignIdeasByWoodworkerQuery(id);
  const [filteredDesigns, setFilteredDesigns] = useState([]);

  const handleFilterChange = (newFilters) => {
    if (!response?.data) return;

    let result = response.data;

    // Chỉ áp dụng filter nếu checkbox được chọn
    if (newFilters?.applyFilters) {
      // Lọc theo danh mục
      if (newFilters.categoryId) {
        result = result.filter(
          (design) =>
            design.category?.categoryId === newFilters.categoryId ||
            design.category?.parentId === newFilters.categoryId
        );
      }

      // Lọc theo rating
      if (newFilters.ratingRange) {
        result = result.filter((design) => {
          const rating = design.totalReviews
            ? design.totalStar / design.totalReviews
            : 0;
          return (
            rating >= newFilters.ratingRange[0] &&
            rating <= newFilters.ratingRange[1]
          );
        });
      }
    }

    // Lọc theo từ khóa tìm kiếm
    if (newFilters?.applySearch && newFilters.searchTerm) {
      const searchLower = newFilters.searchTerm.toLowerCase();
      result = result.filter((design) =>
        design.name.toLowerCase().includes(searchLower)
      );
    }

    // Sắp xếp
    if (newFilters?.sortBy) {
      result = [...result].sort((a, b) => {
        const ratingA = a.totalReviews ? a.totalStar / a.totalReviews : 0;
        const ratingB = b.totalReviews ? b.totalStar / b.totalReviews : 0;

        switch (newFilters.sortBy) {
          case "rating-asc":
            return ratingA - ratingB;
          case "rating-desc":
            return ratingB - ratingA;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    setFilteredDesigns(result);
  };

  // Set initial data
  useMemo(() => {
    if (response?.data) {
      setFilteredDesigns(response.data);
    }
  }, [response?.data]);

  return (
    <>
      <Grid mt={6} templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={5}>
        <Box>
          <FiltersComponent onFilterChange={handleFilterChange} />
        </Box>
        <Box>
          <DesignList designs={filteredDesigns} />
        </Box>
      </Grid>
    </>
  );
}
