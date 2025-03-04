import React, { useState, useEffect, useRef } from "react";
import { Box, Input, Text, CloseButton } from "@chakra-ui/react";
import { normalizeVietnamese } from "../../utils/utils";

export default function SingleSearchSelect({
  options,
  placeholder,
  selectedValue,
  onChange,
}) {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef();

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine the selected option (if any)
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Filter options using the normalizeVietnamese function
  const filteredOptions = options.filter((option) =>
    normalizeVietnamese(option.label).includes(normalizeVietnamese(search))
  );

  const handleSelect = (value) => {
    onChange(value);
    setSearch("");
    setIsDropdownOpen(false);
  };

  const handleClearSelection = () => {
    onChange(null);
    setSearch("");
  };

  return (
    <Box position="relative" ref={containerRef}>
      {selectedValue ? (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>{selectedOption?.label}</Text>
          <CloseButton onClick={handleClearSelection} />
        </Box>
      ) : (
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          bgColor="white"
        />
      )}
      {isDropdownOpen && !selectedValue && (
        <Box
          mt={2}
          borderWidth="1px"
          borderRadius="md"
          bgColor="white"
          maxH="200px"
          overflowY="auto"
          p={2}
          zIndex={10}
          position="absolute"
          width="100%"
        >
          {filteredOptions.map((option) => (
            <Box
              key={option.value}
              p={2}
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </Box>
          ))}
          {filteredOptions.length === 0 && (
            <Text p={2} color="gray.500">
              Không có kết quả
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
