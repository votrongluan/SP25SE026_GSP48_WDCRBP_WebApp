import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { FiUpload, FiX } from "react-icons/fi";
import { useImageUpload } from "../../hooks/useImageUpload";
import { appColorTheme } from "../../config/appconfig";
import { useNotify } from "../Utility/Notify";

export default function ImageUpload({ onUploadComplete, maxFiles = 5 }) {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const { uploadMultipleImages, uploading, error } = useImageUpload();
  const notify = useNotify();

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Kiểm tra số lượng file
      if (files.length + acceptedFiles.length > maxFiles) {
        notify({
          title: "Quá nhiều ảnh",
          description: `Bạn chỉ có thể upload tối đa ${maxFiles} ảnh`,
          status: "error",
        });
        return;
      }

      // Kiểm tra kích thước file (max 5MB)
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > 5 * 1024 * 1024) {
          notify({
            title: "File quá lớn",
            description: "Kích thước file không được vượt quá 5MB",
            status: "error",
          });
          return false;
        }
        return true;
      });

      // Tạo preview
      const newPreviews = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files, maxFiles, notify]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: maxFiles - files.length,
  });

  const removeFile = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      const results = await uploadMultipleImages(files);
      onUploadComplete(results);
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      notify({
        title: "Upload thất bại",
        description: error || "Có lỗi xảy ra khi upload ảnh",
        status: "error",
      });
    }
  };

  return (
    <VStack spacing={4} width="100%">
      <Box
        {...getRootProps()}
        border="2px dashed"
        borderColor={isDragActive ? "blue.500" : "gray.300"}
        borderRadius="md"
        p={6}
        width="100%"
        textAlign="center"
        cursor="pointer"
        _hover={{ borderColor: "blue.500" }}
      >
        <input {...getInputProps()} />
        <FiUpload size={24} style={{ margin: "0 auto 8px" }} />
        <Text>
          {isDragActive
            ? "Thả ảnh vào đây"
            : "Kéo thả ảnh vào đây hoặc click để chọn"}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Hỗ trợ: JPG, JPEG, PNG, GIF (Tối đa 5MB)
        </Text>
      </Box>

      {previews.length > 0 && (
        <Flex wrap="wrap" gap={4} width="100%">
          {previews.map((preview, index) => (
            <Box key={index} position="relative">
              <Image
                src={preview.preview}
                alt={`Preview ${index + 1}`}
                width="100px"
                height="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <Button
                position="absolute"
                top={-2}
                right={-2}
                size="sm"
                colorScheme="red"
                onClick={() => removeFile(index)}
                borderRadius="full"
                p={0}
                minW="24px"
                h="24px"
              >
                <FiX />
              </Button>
            </Box>
          ))}
        </Flex>
      )}

      {files.length > 0 && (
        <Button
          bgColor={appColorTheme.green_0}
          color="white"
          onClick={handleUpload}
          isLoading={uploading}
          leftIcon={<FiUpload />}
        >
          Upload {files.length} ảnh
        </Button>
      )}
    </VStack>
  );
}
