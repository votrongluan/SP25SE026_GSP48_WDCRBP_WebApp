import { Box, IconButton, useToast } from "@chakra-ui/react";
import { Attachment, FacebookSharp, LinkedIn, X } from "@mui/icons-material";

export default function ShareBar() {
  const toast = useToast();

  const shareToFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToTwitter = () => {
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    const url = window.location.href;
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Đã sao chép vào bộ nhớ tạm",
        status: "success",
        colorScheme: "blue",
        duration: 660,
      });
    });
  };

  return (
    <>
      <Box
        borderTop="1px solid"
        borderTopColor="black"
        borderBottom="1px solid"
        borderBottomColor="black"
        opacity=".5"
        mt="40px"
        display="flex"
        justifyContent="space-around"
      >
        <IconButton
          px={7}
          py={7}
          color="black"
          aria-label="Share on Facebook"
          icon={
            <FacebookSharp
              sx={{
                fontSize: "30px",
              }}
            />
          }
          onClick={shareToFacebook}
          bg="transparent"
          _hover={{ color: "app_brown.0" }}
        />
        <IconButton
          px={7}
          py={7}
          color="black"
          aria-label="Share on Twitter"
          icon={
            <X
              sx={{
                fontSize: "30px",
              }}
            />
          }
          onClick={shareToTwitter}
          bg="transparent"
          _hover={{ color: "app_brown.0" }}
        />
        <IconButton
          px={7}
          py={7}
          color="black"
          aria-label="Share on LinkedIn"
          icon={
            <LinkedIn
              sx={{
                fontSize: "30px",
              }}
            />
          }
          onClick={shareToLinkedIn}
          bg="transparent"
          _hover={{ color: "app_brown.0" }}
        />
        <IconButton
          px={7}
          py={7}
          color="black"
          aria-label="Copy URL"
          icon={
            <Attachment
              sx={{
                fontSize: "30px",
              }}
            />
          }
          onClick={copyToClipboard}
          bg="transparent"
          _hover={{ color: "app_brown.0" }}
        />
      </Box>
    </>
  );
}
