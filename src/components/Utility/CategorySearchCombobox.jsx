import React, { useState, useRef, useEffect } from "react";
import { useGetAllCategoryQuery } from "../../services/categoryApi";
import {
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Box,
  Text,
  List,
  ListItem,
  InputGroup,
  InputRightElement,
  Flex,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";

const CategorySearchCombobox = ({ setCategoryId, defaultCategoryId }) => {
  const { data: response, isLoading, isError } = useGetAllCategoryQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const inputRef = useRef(null);

  const categories = response?.data || [];
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set default selected category if defaultCategoryId is provided
  useEffect(() => {
    if (defaultCategoryId && categories.length > 0) {
      const defaultCategory = categories.find(
        (cat) => cat.categoryId === defaultCategoryId
      );
      if (defaultCategory) {
        setSelectedCategory(defaultCategory);
        setSearchTerm(defaultCategory.categoryName);
      }
    }
  }, [defaultCategoryId, categories]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category.categoryName);
    setCategoryId(category.categoryId);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    if (!e.target.value) {
      setSelectedCategory(null);
      setCategoryId(null);
    }
  };

  const handleClearSelection = (e) => {
    e.stopPropagation();
    setSelectedCategory(null);
    setSearchTerm("");
    setCategoryId(null);
    setIsOpen(false);
    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <Flex align="center" gap="2">
        <Spinner size="sm" />
        <Text>Đang tải danh mục...</Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Text color="red.500">Lỗi khi tải danh mục. Vui lòng thử lại sau.</Text>
    );
  }

  return (
    <Box zIndex={"2"} position="relative" ref={inputRef}>
      <FormControl>
        <InputGroup>
          <Input
            placeholder="Chọn danh mục"
            value={searchTerm}
            onChange={handleInputChange}
            onClick={() => !selectedCategory && setIsOpen(true)}
            isReadOnly={!!selectedCategory}
            ref={inputRef}
          />
          <InputRightElement width={selectedCategory ? "4.5rem" : "2.5rem"}>
            {selectedCategory ? (
              <HStack spacing={1}>
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={handleClearSelection}
                  aria-label="Clear selection"
                />
                <IconButton
                  icon={<ChevronDownIcon />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle dropdown"
                />
              </HStack>
            ) : (
              <IconButton
                icon={<ChevronDownIcon />}
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle dropdown"
              />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {isOpen && !selectedCategory && (
        <List
          position="absolute"
          bg="white"
          width="100%"
          boxShadow="md"
          borderRadius="md"
          maxH="200px"
          overflow="auto"
          zIndex={1}
          mt={1}
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <ListItem
                key={category.categoryId}
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                onClick={() => handleSelectCategory(category)}
              >
                {category.categoryName}
              </ListItem>
            ))
          ) : (
            <ListItem px={4} py={2}>
              Không tìm thấy danh mục nào
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default CategorySearchCombobox;
