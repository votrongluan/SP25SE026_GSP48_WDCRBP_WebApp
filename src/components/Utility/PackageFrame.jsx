import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function PackageFrame({ children, packageType }) {
  const colors = {
    Bronze: {
      displayText: "Xưởng Đồng",
      displayTextColor: "#7B341E",
      displayBgColor: "#FFE8D1 ",
      border: useColorModeValue("#CD7F32", "#CD7F32"),
      glow: useColorModeValue(
        "rgba(205, 127, 50, 0.5)",
        "rgba(205, 127, 50, 0.3)"
      ),
    },
    Silver: {
      displayText: "Xưởng Bạc",
      displayTextColor: "#374151 ",
      displayBgColor: "#fff",
      border: useColorModeValue("#6B7280", "#6B7280"),
      glow: useColorModeValue(
        "rgba(107, 114, 128, 0.5)",
        "rgba(107, 114, 128, 0.3)"
      ),
    },
    Gold: {
      displayText: "Xưởng Vàng",
      displayTextColor: "#78350F",
      displayBgColor: "#FFF9C4",
      border: useColorModeValue("#FFD700", "#FFD700"),
      glow: useColorModeValue(
        "rgba(255, 215, 0, 0.5)",
        "rgba(255, 215, 0, 0.3)"
      ),
    },
  };

  if (!packageType) {
    return <>{children}</>;
  }

  return (
    <Box position="relative" p="2px">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        border="10px solid"
        borderColor={colors[packageType]?.border}
        borderRadius="md"
        boxShadow={`0 0 10px ${colors[packageType]?.glow}`}
      />
      <Box position="relative" borderRadius="md" zIndex={1}>
        {/* <Text
          position="absolute"
          zIndex={2}
          px={1}
          color={colors[packageType]?.displayTextColor}
          bg={colors[packageType]?.displayBgColor}
          borderRadius="sm"
          fontSize="xs"
          fontWeight="bold"
        >
          {colors[packageType]?.displayText}
        </Text> */}
        {children}
      </Box>
    </Box>
  );
}
