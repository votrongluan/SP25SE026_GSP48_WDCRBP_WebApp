import { Box, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import DesignList from "./DesignList.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useState, useMemo } from "react";
import { useGetAllDesignIdeasQuery } from "../../../../services/designIdeaApi";

export default function DesignsPage() {
  const { data: response } = useGetAllDesignIdeasQuery();
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);

  const handleFilterChange = (newFilters) => {
    if (!designs) return;

    let result = designs;

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

      // Lọc theo tỉnh thành
      if (newFilters.province) {
        result = result.filter(
          (design) => design.woodworkerProfile?.cityId == newFilters.province
        );
      }

      // Lọc theo loại xưởng (gói dịch vụ)
      if (newFilters.workshopType) {
        result = result.filter(
          (design) =>
            design.woodworkerProfile?.servicePack?.name ===
            newFilters.workshopType
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
      const data = response.data.filter((design) => {
        const isVisible =
          design?.woodworkerProfile?.servicePackEndDate &&
          Date.now() <=
            new Date(design?.woodworkerProfile?.servicePackEndDate).getTime() &&
          design?.woodworkerProfile?.publicStatus == true;

        return isVisible;
      });

      setDesigns(data);
      setFilteredDesigns(data);
    }
  }, [response?.data]);

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Danh sách thiết kế
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={5}>
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
