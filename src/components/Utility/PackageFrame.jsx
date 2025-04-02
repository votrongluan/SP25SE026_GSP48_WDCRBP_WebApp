import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function PackageFrame({ children, packageType }) {
  const colors = {
    Bronze: {
      displayText: "Xưởng Đồng",
      displayTextColor: "#CD7F32",
      border: useColorModeValue("#CD7F32", "#CD7F32"),
      glow: useColorModeValue(
        "rgba(205, 127, 50, 0.5)",
        "rgba(205, 127, 50, 0.3)"
      ),
    },
    Silver: {
      displayText: "Xưởng Bạc",
      displayTextColor: "#C0C0C0",
      border: useColorModeValue("#6B7280", "#6B7280"),
      glow: useColorModeValue(
        "rgba(107, 114, 128, 0.5)",
        "rgba(107, 114, 128, 0.3)"
      ),
    },
    Gold: {
      displayText: "Xưởng Vàng",
      displayTextColor: "#FFD700",
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
    <Box position="relative" p={1}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        border="2px solid"
        borderColor={colors[packageType]?.border}
        borderRadius="md"
        boxShadow={`0 0 10px ${colors[packageType]?.glow}`}
      />
      <Box
        position="relative"
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="md"
        zIndex={1}
      >
        <Text
          position="absolute"
          zIndex={2}
          top={-2}
          left={-2}
          borderRadius={"full"}
          px={2}
          bg={"black"}
          color={colors[packageType]?.displayTextColor}
          fontWeight="bold"
          fontSize="sm"
        >
          {colors[packageType]?.displayText}
        </Text>
        {children}
      </Box>
    </Box>
  );
}
