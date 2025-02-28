import { Button } from "@chakra-ui/react";

export default function ActionButton({
  text,
  onClickExeFn,
  bgColor = "app_brown.0",
  textColor = "app_black.0",
  hoverBgColor = "app_brown.1",
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
      onClick={onClickExeFn}
      my="20px"
    >
      {text}
    </Button>
  );
}
