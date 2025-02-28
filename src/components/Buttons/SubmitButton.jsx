import { Button } from "@chakra-ui/react";

export default function SubmitButton({
  text,
  bgColor = "app_brown.0",
  textColor = "app_black.0",
  hoverBgColor = "app_black.0",
  hoverTextColor = "app_white.0",
}) {
  return (
    <Button
      _hover={{
        backgroundColor: hoverBgColor,
        color: hoverTextColor,
      }}
      px="40px"
      py="25px"
      bgColor={bgColor}
      color={textColor}
      borderRadius="40px"
      mt="40px"
      zIndex="1"
      type="submit"
      my="20px"
    >
      {text}
    </Button>
  );
}
