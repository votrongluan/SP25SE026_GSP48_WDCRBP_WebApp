import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Button,
  Text,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Radio,
  RadioGroup,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetAllCategoryQuery } from "../../services/categoryApi";
import { appColorTheme } from "../../config/appconfig";

const CategorySelector = ({
  setCategoryId,
  initialCategoryId,
  allowLevel1Selection = true,
  title = "Chọn danh mục",
}) => {
  const { data, isLoading, error } = useGetAllCategoryQuery();
  const [selectedParentIndex, setSelectedParentIndex] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategoryId || null
  );

  const categories = data?.data || [];

  // Find initial tab index based on initialCategoryId
  useEffect(() => {
    if (initialCategoryId && categories.length > 0) {
      // Check if initialCategoryId is a level 1 category
      const parentIndex = categories.findIndex(
        (cat) => cat.id === initialCategoryId
      );

      if (parentIndex !== -1) {
        setSelectedParentIndex(parentIndex);
        return;
      }

      // Check if initialCategoryId is a level 2 category
      for (let i = 0; i < categories.length; i++) {
        const childIndex = categories[i].children?.findIndex(
          (child) => child.id === initialCategoryId
        );

        if (childIndex !== -1) {
          setSelectedParentIndex(i);
          break;
        }
      }
    }
  }, [initialCategoryId, categories]);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCategoryId(categoryId);
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

  return (
    <Box borderRadius="md" overflow="hidden" bg="white" boxShadow="sm">
      {title && (
        <Heading size="md" mb={4} p={4} pb={0}>
          {title}
        </Heading>
      )}

      <Tabs
        index={selectedParentIndex}
        onChange={setSelectedParentIndex}
        colorScheme="brown"
        variant="enclosed"
      >
        <TabList overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
          {categories.map((category) => (
            <Tab
              key={category.id}
              _selected={{
                color: appColorTheme.brown_2,
                borderColor: "currentColor",
                borderBottomColor: "transparent",
                fontWeight: "bold",
              }}
            >
              {category.categoryName}
              {category.id === selectedCategoryId && (
                <Badge ml={2} colorScheme="green">
                  ✓
                </Badge>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {categories.map((parentCategory) => (
            <TabPanel key={parentCategory.id}>
              <Box mb={4}>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  {parentCategory.description}
                </Text>

                {allowLevel1Selection && (
                  <RadioGroup
                    onChange={handleCategorySelect}
                    value={selectedCategoryId?.toString()}
                    mb={4}
                  >
                    <Radio
                      value={parentCategory.id.toString()}
                      colorScheme="brown"
                    >
                      <Text
                        fontWeight={
                          selectedCategoryId === parentCategory.id
                            ? "bold"
                            : "normal"
                        }
                      >
                        Chọn tất cả {parentCategory.categoryName}
                      </Text>
                    </Radio>
                  </RadioGroup>
                )}

                {parentCategory.children &&
                  parentCategory.children.length > 0 && (
                    <>
                      <Text fontWeight="medium" mb={2}>
                        {allowLevel1Selection
                          ? "Hoặc chọn danh mục con:"
                          : "Chọn danh mục:"}
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                        {parentCategory.children.map((childCategory) => (
                          <Button
                            key={childCategory.id}
                            size="md"
                            variant={
                              selectedCategoryId === childCategory.id
                                ? "solid"
                                : "outline"
                            }
                            colorScheme="brown"
                            justifyContent="flex-start"
                            onClick={() =>
                              handleCategorySelect(childCategory.id)
                            }
                          >
                            {childCategory.categoryName}
                          </Button>
                        ))}
                      </SimpleGrid>
                    </>
                  )}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CategorySelector;
