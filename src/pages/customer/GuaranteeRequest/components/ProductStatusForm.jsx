import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Text,
} from "@chakra-ui/react";
import ImageUpdateUploader from "../../../../components/Utility/ImageUpdateUploader.jsx";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";

export default function ProductStatusForm({
  currentProductStatus,
  setCurrentProductStatus,
  currentProductImages,
  handleUploadComplete,
}) {
  return (
    <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
      <Heading size="md" mb={4}>
        Tình trạng sản phẩm hiện tại
      </Heading>

      <FormControl isRequired mb={4}>
        <FormLabel>Mô tả tình trạng hiện tại:</FormLabel>
        <Textarea
          value={currentProductStatus}
          onChange={(e) => setCurrentProductStatus(e.target.value)}
          placeholder="Mô tả chi tiết tình trạng sản phẩm và nêu rõ vấn đề bạn gặp phải..."
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Hình ảnh tình trạng hiện tại:</FormLabel>
        <ImageUpdateUploader
          imgUrls=""
          maxFiles={3}
          onUploadComplete={handleUploadComplete}
        />
        {currentProductImages.length > 0 && (
          <Box mt={4}>
            <Text fontWeight="medium" mb={2}>
              Hình ảnh đã tải lên:
            </Text>
            <ImageListSelector imgUrls={currentProductImages} imgH={100} />
          </Box>
        )}
      </FormControl>
    </Box>
  );
}
