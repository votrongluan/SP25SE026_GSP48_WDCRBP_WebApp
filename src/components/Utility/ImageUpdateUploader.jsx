import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FiUpload, FiX } from "react-icons/fi";
import { useImageUpload } from "../../hooks/useImageUpload";
import { appColorTheme } from "../../config/appconfig";
import { useNotify } from "./Notify";

export default function ImageUpdateUploader({
  onUploadComplete,
  maxFiles = 5,
  imgUrls = "",
}) {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const { uploadMultipleImages, uploading, error } = useImageUpload();
  const notify = useNotify();

  // Khởi tạo preview từ imgUrls ban đầu
  useState(() => {
    if (imgUrls) {
      const initialUrls = imgUrls.split(";").filter((url) => url);
      setPreviews(initialUrls.map((url) => ({ url, isNew: false })));
    }
  }, [imgUrls]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Kiểm tra số lượng file
      if (previews.length + acceptedFiles.length > maxFiles) {
        notify(
          "Quá nhiều ảnh",
          `Bạn chỉ có thể upload tối đa ${maxFiles} ảnh`,
          "error"
        );
        return;
      }

      // Kiểm tra kích thước file (max 5MB)
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > 5 * 1024 * 1024) {
          notify(
            "File quá lớn",
            "Kích thước file không được vượt quá 5MB",
            "error"
          );
          return false;
        }
        return true;
      });

      // Tạo preview cho file mới
      const newPreviews = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isNew: true,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      setFiles((prev) => [...prev, ...validFiles]);
    },
    [previews.length, maxFiles, notify]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: maxFiles - previews.length,
  });

  const removeFile = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const results = await uploadMultipleImages(files);
      const newUrls = results.map((result) => result.url);

      // Kết hợp URL mới với URL cũ
      const allUrls = previews
        .filter((preview) => !preview.isNew)
        .map((preview) => preview.url)
        .concat(newUrls);

      onUploadComplete(allUrls.join(";"));
      setIsUploadComplete(true);
      notify("Upload thành công", "Cập nhật ảnh thành công", "success");
    } catch (err) {
      console.error(err);
      notify(
        "Upload thất bại",
        error || "Có lỗi xảy ra khi upload ảnh",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    // Khôi phục lại trạng thái ban đầu
    if (imgUrls) {
      const initialUrls = imgUrls.split(";").filter((url) => url);
      setPreviews(initialUrls.map((url) => ({ url, isNew: false })));
    } else {
      setPreviews([]);
    }
    setFiles([]);
  };

  return (
    <VStack spacing={4} width="100%">
      {previews.length < maxFiles && !isUploadComplete && (
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor={isDragActive ? "blue.500" : "gray.300"}
          borderRadius="md"
          p={5}
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
              : `Kéo thả ảnh vào đây hoặc click để chọn (Tối đa ${maxFiles} ảnh)`}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Hỗ trợ: JPG, JPEG, PNG, GIF (Tối đa 5MB)
          </Text>
        </Box>
      )}

      {previews.length > 0 && (
        <>
          <Flex wrap="wrap" gap={5} width="100%">
            {previews.map((preview, index) => (
              <Box key={index} position="relative">
                <Image
                  src={preview.isNew ? preview.preview : preview.url}
                  alt={`Preview ${index + 1}`}
                  width="100px"
                  height="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
                {!isUploadComplete && (
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
                )}
              </Box>
            ))}
          </Flex>
        </>
      )}

      {!isUploadComplete && (
        <HStack spacing={4}>
          <Button onClick={handleCancel}>Hiện ảnh ban đầu</Button>
          <Button
            bgColor={appColorTheme.green_0}
            color="white"
            onClick={handleUpload}
            isLoading={isUploading}
            leftIcon={<FiUpload />}
            isDisabled={previews.length == 0}
          >
            Cập nhật ảnh
          </Button>
        </HStack>
      )}
    </VStack>
  );
}
