import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Flex } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { FaFacebookMessenger } from "react-icons/fa"; // Import Facebook Messenger icon

const ScrollToTopAndBottom = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Show buttons when page is scrolled down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset >= 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const redirectToMessenger = () => {
    window.open("https://m.me/61566307373631", "_blank");
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <Flex
        direction="column"
        position="fixed"
        bottom="4"
        right="4"
        zIndex="1000"
        gap="2"
      >
        <IconButton
          icon={<FaFacebookMessenger />}
          onClick={redirectToMessenger}
          bg="white"
          color="blue.500"
          _hover={{ opacity: "0.5" }}
          size="lg"
          borderRadius="full"
        />
        {isVisible && (
          <>
            <IconButton
              icon={<ArrowUpIcon />}
              onClick={scrollToTop}
              bg="white"
              color="app_white.0"
              _hover={{ opacity: 0.5 }}
              size="lg"
              borderRadius="full"
            />

            <IconButton
              icon={<ArrowDownIcon />}
              onClick={scrollToBottom}
              bg="white"
              color="app_white.0"
              _hover={{ opacity: "0.5" }}
              size="lg"
              borderRadius="full"
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default ScrollToTopAndBottom;
