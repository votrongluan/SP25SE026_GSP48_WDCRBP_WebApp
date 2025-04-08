import {
  Box,
  SimpleGrid,
  Button,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  Flex,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetAllNestedCategoryQuery } from "../../services/categoryApi";
import { appColorTheme } from "../../config/appconfig";

const CategorySelector = ({
  setCategoryId,
  setCategoryName,
  initialCategoryId,
  allowLevel1Selection = true,
}) => {
  const { data, isLoading, error } = useGetAllNestedCategoryQuery();
  const [selectedCategoryPath, setSelectedCategoryPath] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategoryId || null
  );

  const categories = data?.data || [];

  // Find initial category path based on initialCategoryId
  useEffect(() => {
    if (initialCategoryId && categories.length > 0) {
      // Check if initialCategoryId is a level 1 category
      const topLevelCategory = categories.find(
        (cat) => cat.id === initialCategoryId
      );
      if (topLevelCategory) {
        setSelectedCategoryPath([topLevelCategory]);
        return;
      }

      // Check in nested categories
      const findCategoryPath = (cats, targetId, currentPath = []) => {
        for (const cat of cats) {
          // Check if this is the target
          if (cat.id === targetId) {
            return [...currentPath, cat];
          }

          // Check children if they exist
          if (cat.children && cat.children.length > 0) {
            const foundPath = findCategoryPath(cat.children, targetId, [
              ...currentPath,
              cat,
            ]);
            if (foundPath) return foundPath;
          }
        }
        return null;
      };

      const path = findCategoryPath(categories, initialCategoryId);
      if (path) {
        setSelectedCategoryPath(path);
      }
    }
  }, [initialCategoryId, categories]);

  // Handle category selection
  const handleCategorySelect = (category, level) => {
    // Trim path to the selected level and add the new category
    const newPath = [...selectedCategoryPath.slice(0, level), category];
    setSelectedCategoryPath(newPath);

    // If it's a leaf category or allowLevel1Selection is true, update the selected ID
    const isLeaf = !category.children || category.children.length === 0;
    if (isLeaf || (level === 0 && allowLevel1Selection)) {
      setSelectedCategoryId(category.id);
      setCategoryId(category.id);
      setCategoryName ? setCategoryName(category.categoryName) : null;
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner color={appColorTheme.brown_2} size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Không thể tải danh mục. Vui lòng thử lại sau.
      </Alert>
    );
  }

  // Render a level of categories
  const renderCategoryLevel = (cats, level) => {
    return (
      <VStack align="start" spacing={2} width="100%">
        {cats.map((category) => (
          <Button
            key={category.id}
            size="md"
            variant="outline"
            colorScheme={selectedCategoryId === category.id ? "green" : "gray"}
            justifyContent="flex-start"
            onClick={() => handleCategorySelect(category, level)}
            position="relative"
            width="fit-content"
          >
            {category.categoryName}
            {selectedCategoryId === category.id && (
              <Badge
                size={"sm"}
                position="absolute"
                right={0}
                top={0}
                colorScheme="blue"
              >
                ✓
              </Badge>
            )}
          </Button>
        ))}
      </VStack>
    );
  };

  return (
    <Box borderRadius="md" overflow="hidden" bg="white" boxShadow="sm" p={4}>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        {/* Level 1 categories (always visible) */}
        <Box width={{ base: "100%", md: "30%" }}>
          <Text fontWeight="bold" mb={2}>
            Danh mục chính
          </Text>
          {renderCategoryLevel(categories, 0)}
        </Box>

        {/* Divider */}
        <Divider
          orientation="vertical"
          display={{ base: "none", md: "block" }}
        />

        {/* Subcategories (if a parent is selected) */}
        <Box width={{ base: "100%", md: "65%" }}>
          {selectedCategoryPath.length > 0 &&
            selectedCategoryPath[0]?.children?.length > 0 && (
              <>
                <Text mb={2}>Loại sản phẩm cụ thể</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {renderCategoryLevel(
                    selectedCategoryPath[0]?.children || [],
                    1
                  )}
                </SimpleGrid>
              </>
            )}

          {/* Message when no subcategories or nothing selected */}
          {(!selectedCategoryPath.length ||
            !selectedCategoryPath[0]?.children?.length) && (
            <Text color="gray.500" textAlign="center" py={4}>
              {selectedCategoryPath.length
                ? "Danh mục này không có danh mục con"
                : "Vui lòng chọn một danh mục từ bên trái"}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CategorySelector;
