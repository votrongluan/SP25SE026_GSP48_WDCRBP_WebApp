import { useToast } from "@chakra-ui/react";

export const useNotify = () => {
  const toast = useToast();

  const notify = (title, description, status = "info", duration = 3000) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: "top",
    });
  };

  return notify;
};
