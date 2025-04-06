import { Box, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import WoodworkerList from "./WoodworkerList.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useState, useMemo } from "react";
import { useListWoodworkersQuery } from "../../../../services/woodworkerApi";

export default function WoodworkersPage() {
  const { data: response } = useListWoodworkersQuery();
  const [wws, setWws] = useState([]);
  const [filteredWoodworkers, setFilteredWoodworkers] = useState([]);

  const handleFilterChange = (newFilters) => {
    if (!wws) return;

    let result = wws;

    // Chỉ áp dụng filter nếu checkbox được chọn
    if (newFilters?.applyFilters) {
      // Lọc theo tỉnh thành
      if (newFilters.province) {
        result = result.filter((ww) => {
          return ww?.cityId == newFilters.province;
        });
      }

      // Lọc theo loại xưởng (gói dịch vụ)
      if (newFilters.workshopType) {
        result = result.filter((ww) => {
          return ww.servicePack?.name === newFilters.workshopType;
        });
      }

      // Lọc theo rating
      if (newFilters.ratingRange) {
        result = result.filter((ww) => {
          const rating = ww.totalReviews ? ww.totalStar / ww.totalReviews : 0;

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
      result = result.filter((ww) =>
        ww.brandName.toLowerCase().includes(searchLower)
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
            return a.brandName.localeCompare(b.brandName);
          case "name-desc":
            return b.brandName.localeCompare(a.brandName);
          default:
            return 0;
        }
      });
    }

    setFilteredWoodworkers(result);
  };

  // Set initial data
  useMemo(() => {
    if (response?.data) {
      const data = response.data.filter((item) => {
        const publicStatus = item?.publicStatus;

        return publicStatus;
      });

      setWws(data);
      setFilteredWoodworkers(data);
    }
  }, [response?.data]);

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          as="h2"
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Danh sách xưởng mộc
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={5}>
        <Box>
          <FiltersComponent onFilterChange={handleFilterChange} />
        </Box>
        <Box>
          <WoodworkerList woodworkers={filteredWoodworkers} />
        </Box>
      </Grid>
    </>
  );
}
