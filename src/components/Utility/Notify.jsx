import { useToast } from "@chakra-ui/react";

export const useNotify = () => {
  const toast = useToast();

  const notify = ({
    title,
    description,
    status = "info",
    duration = 3000,
    isClosable = true,
  }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };

  return notify;
};
