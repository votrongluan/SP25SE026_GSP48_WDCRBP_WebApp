import React, { useEffect, useRef, useState } from "react";
import { Box, keyframes } from "@chakra-ui/react";

const SlideWrapper = ({
  children,
  direction = "left",
  speed = "1s",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const slideKeyframes = {
    left: keyframes`
      0% { transform: translateX(-200px); opacity: 0; }
      50% { opacity: 0.5; }
      100% { transform: translateX(0); opacity: 1; }
    `,
    right: keyframes`
      0% { transform: translateX(200px); opacity: 0; }
      50% { opacity: 0.5; }
      100% { transform: translateX(0); opacity: 1; }
    `,
    top: keyframes`
      0% { transform: translateY(-50px); opacity: 0; }
      50% { opacity: 0.5; }
      100% { transform: translateY(0); opacity: 1; }
    `,
    bottom: keyframes`
      0% { transform: translateY(50px); opacity: 0; }
      50% { opacity: 0.5; }
      100% { transform: translateY(0); opacity: 1; }
    `,
  };

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
      animation={
        isVisible ? `${slideKeyframes[direction]} ${speed} ease-in-out` : ""
      }
      opacity={isVisible ? 1 : 0}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SlideWrapper;
