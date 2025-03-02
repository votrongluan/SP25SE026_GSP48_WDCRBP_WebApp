import React, { useEffect, useState } from "react";
import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";

function SearchFilter({
  data,
  methods,
  DisplayData,
  properties,
  searchPlaceholder,
}) {
  const optionStyle = {
    backgroundColor: "#00060F",
    color: "white",
  };

  function sortDates(dateArray) {
    // Custom comparator function to sort dates
    const comparator = (a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-")); // Convert to 'yyyy-mm-dd' format
      const dateB = new Date(b.date.split("/").reverse().join("-")); // Convert to 'yyyy-mm-dd' format

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    };

    // Use the comparator function with the sort method
    dateArray.sort(comparator);

    return dateArray;
  }

  const normalize = (text) => {
    return text
      .normalize("NFKD")
      .replace(/[\u0300-\u036F]/g, "")
      .replace(/đ/g, "d");
  };

  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const sortData = (dataNeedSortedByMethod) => {
    let filtered = [...dataNeedSortedByMethod];

    if (sortMethod == "date") {
      return sortDates(filtered);
    }

    filtered.sort((a, b) => {
      if (sortMethod) {
        if (typeof a[sortMethod] === "number") {
          if (sortOrder === "asc") {
            return a[sortMethod] - b[sortMethod];
          } else {
            return b[sortMethod] - a[sortMethod];
          }
        }

        const valueA = a[sortMethod].toString();
        const valueB = b[sortMethod].toString();

        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }
    });

    return filtered;
  };

  const filtersData = (query) => {
    query = normalize(query.toLowerCase()); // Normalize and convert to lowercase

    return data.filter((el) => {
      return properties.some((property) => {
        if (!el[property]) return false;
        const normalizedPropertyData = normalize(
          el[property].toString().toLowerCase()
        );
        return normalizedPropertyData.includes(query);
      });
    });
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  useEffect(() => {
    const dataAfterFilterBySearch = filtersData(search);
    const sortedData = sortData(dataAfterFilterBySearch);
    setFilteredData(sortedData);
  }, [sortMethod, sortOrder, search, data]);

  return (
    <>
      <InputGroup my={5}>
        <InputLeftElement pointerEvents="none" />
        <Input
          _placeholder={{
            color: "black",
          }}
          color="black"
          type="text"
          placeholder={searchPlaceholder ? searchPlaceholder : "Tìm kiếm"}
          value={search}
          onChange={handleSearchChange}
        />
      </InputGroup>

      <HStack columnGap="20px" mb={10}>
        <Spacer />

        <Flex alignItems="center">
          <Text width="150px" mr="4px">
            Sắp xếp theo
          </Text>
          <Select
            bgColor="white"
            color="black"
            value={sortMethod}
            onChange={(e) => {
              setSortMethod(e.target.value);
            }}
          >
            {methods.map((method) => (
              <option
                style={optionStyle}
                key={method.value}
                value={method.value}
              >
                {method.label}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex alignItems="center">
          <Text width="80px" mr="4px">
            Thứ tự
          </Text>
          <Select
            bgColor="white"
            color="black"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option style={optionStyle} value="asc">
              Tăng dần
            </option>
            <option style={optionStyle} value="desc">
              Giảm dần
            </option>
          </Select>
        </Flex>
      </HStack>

      <Text color="gray.500" mb={5}>
        Tìm thấy {filteredData.length} kết quả
      </Text>

      <DisplayData filteredData={filteredData} />
    </>
  );
}

export default SearchFilter;
