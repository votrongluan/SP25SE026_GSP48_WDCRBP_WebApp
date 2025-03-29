import { useState, useEffect } from "react";
import { Stack, Checkbox, Text, Box } from "@chakra-ui/react";

export default function CheckboxList({ items, setButtonDisabled }) {
  const [checkedItems, setCheckedItems] = useState(items.map(() => false));

  useEffect(() => {
    const allRequiredChecked = items.every(
      (item, index) => item.isOptional || checkedItems[index]
    );

    setButtonDisabled(!allRequiredChecked);
  }, [checkedItems, items, setButtonDisabled]);

  const handleCheck = (index) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  return (
    <Stack spacing={3}>
      {items.map((item, index) => (
        <Box key={index}>
          <Checkbox
            isChecked={checkedItems[index]}
            onChange={() => handleCheck(index)}
          >
            <Text as="span" color={item.isOptional ? "gray.500" : "black"}>
              {item.description}
              {item.isOptional && (
                <Text as="span" color="gray.500" ml={1}>
                  (Tùy chọn)
                </Text>
              )}
            </Text>
          </Checkbox>
        </Box>
      ))}
    </Stack>
  );
}
