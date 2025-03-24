import { useToast } from "@chakra-ui/react";

export const useNotify = () => {
  const toast = useToast();

  const notify = (title, description, status = "info", duration = 1500) => {
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
