import { Box, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import ProductList from "./ProductList.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../../../services/productApi";

export default function ProductsPage() {
  const { data: response, isLoading, error } = useGetAllProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Set initial data when API response changes
  useEffect(() => {
    if (response?.data) {
      setFilteredProducts(response.data);
    }
  }, [response?.data]);

  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    if (!response?.data) return;

    let result = response.data;

    // Chỉ áp dụng filter nếu checkbox được chọn
    if (newFilters?.applyFilters) {
      // Lọc theo danh mục
      if (newFilters.categoryId) {
        result = result.filter(
          (product) =>
            product.categoryId === newFilters.categoryId ||
            // Assuming there might be a parent category relationship
            product.category?.parentId === newFilters.categoryId
        );
      }

      // Lọc theo tỉnh thành
      if (newFilters.province) {
        result = result.filter(
          (product) => product.cityId == newFilters.province
        );
      }

      // Lọc theo loại xưởng (gói dịch vụ)
      if (newFilters.workshopType) {
        result = result.filter(
          (product) => product.packType === newFilters.workshopType
        );
      }

      // Lọc theo giá
      if (newFilters.priceRange && newFilters.priceRange.length === 2) {
        result = result.filter(
          (product) =>
            product.price >= newFilters.priceRange[0] &&
            product.price <= newFilters.priceRange[1]
        );
      }

      // Lọc theo rating
      if (newFilters.ratingRange) {
        result = result.filter((product) => {
          const rating = product.totalReviews
            ? product.totalStar / product.totalReviews
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
      result = result.filter((product) =>
        product.productName.toLowerCase().includes(searchLower)
      );
    }

    // Sắp xếp
    if (newFilters?.sortBy) {
      result = [...result].sort((a, b) => {
        const ratingA = a.totalReviews ? a.totalStar / a.totalReviews : 0;
        const ratingB = b.totalReviews ? b.totalStar / b.totalReviews : 0;

        switch (newFilters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-asc":
            return ratingA - ratingB;
          case "rating-desc":
            return ratingB - ratingA;
          case "name-asc":
            return a.productName.localeCompare(b.productName);
          case "name-desc":
            return b.productName.localeCompare(a.productName);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(result);
  };

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Danh sách sản phẩm
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={5}>
        <Box>
          <FiltersComponent onFilterChange={handleFilterChange} />
        </Box>
        <Box>
          <ProductList
            products={filteredProducts}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </Grid>
    </>
  );
}
