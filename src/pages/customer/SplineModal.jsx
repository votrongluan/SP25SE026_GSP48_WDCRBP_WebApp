import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function SplineModal({ splineIsOpen, splineOnClose }) {
  const [iframeElement, setIframeElement] = useState(null);

  useEffect(() => {
    if (!iframeElement) {
      setIframeElement(
        <iframe
          style={{
            display: "block",
            position: "relative",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src="https://app.spline.design"
          frameBorder="0"
          width={window.innerWidth}
          height={window.innerHeight}
        ></iframe>
      );
    }
  }, [iframeElement]);

  return (
    <>
      <Modal
        isOpen={splineIsOpen}
        onClose={splineOnClose}
        size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton zIndex="1" color="white" />
          <Box>{iframeElement}</Box>
        </ModalContent>
      </Modal>
    </>
  );
}
