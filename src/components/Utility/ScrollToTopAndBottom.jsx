import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Flex } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { FiMessageSquare } from "react-icons/fi"; // Import Facebook Messenger icon

const ScrollToTopAndBottom = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset >= 300) {
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

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <Flex
        direction="column"
        position="fixed"
        bottom="1"
        right="1"
        zIndex="1000"
        gap="2"
      >
        {isVisible && (
          <>
            <IconButton
              icon={<ArrowUpIcon />}
              onClick={scrollToTop}
              bg="black"
              color="white"
              _hover={{ opacity: 0.5 }}
              size="md"
              borderRadius="full"
            />

            <IconButton
              icon={<ArrowDownIcon />}
              onClick={scrollToBottom}
              bg="black"
              color="white"
              _hover={{ opacity: "0.5" }}
              size="md"
              borderRadius="full"
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default ScrollToTopAndBottom;
