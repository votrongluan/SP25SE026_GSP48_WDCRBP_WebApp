import React, { useEffect, useRef, useState } from "react";
import { Box, keyframes } from "@chakra-ui/react";

const FadeWrapper = ({ children, speed = "1s", ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const fadeKeyframes = keyframes`
    0% { opacity: 0; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  `;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Adjust this threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Box
      ref={ref}
      animation={isVisible ? `${fadeKeyframes} ${speed} ease-in-out` : ""}
      opacity={isVisible ? 1 : 0}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeWrapper;
