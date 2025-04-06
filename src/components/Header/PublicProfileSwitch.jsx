import { Switch, Text, HStack, Tooltip, Spinner } from "@chakra-ui/react";
import { useUpdateWoodworkerPublicStatusMutation } from "../../services/woodworkerApi";
import { useNotify } from "../../components/Utility/Notify";
import useAuth from "../../hooks/useAuth.js";

export default function PublicProfileSwitch() {
  const { auth, setAuth } = useAuth();
  const notify = useNotify();
  const [updatePublicStatus, { isLoading }] =
    useUpdateWoodworkerPublicStatusMutation();

  const profilePublicStatus = auth?.woodworker?.publicStatus || false;
  const userId = auth?.userId;

  const handleToggle = async () => {
    try {
      const newStatus = !profilePublicStatus;

      await updatePublicStatus({
        userId: userId,
        publicStatus: newStatus,
        reasons: "ChangeStatus",
      }).unwrap();

      // Update auth context directly
      setAuth({
        ...auth,
        woodworker: {
          ...auth.woodworker,
          publicStatus: newStatus,
        },
      });

      notify(
        "Cập nhật thành công",
        newStatus
          ? "Xưởng của bạn đã được công khai"
          : "Xưởng của bạn đã được ẩn",
        "success"
      );
    } catch (error) {
      notify("Lỗi cập nhật", "Không thể cập nhật trạng thái xưởng", "error");
    }
  };

  return (
    <HStack spacing={2}>
      <Tooltip
        label="Khi bật, xưởng của bạn sẽ hiển thị công khai và khách hàng có thể tìm thấy bạn"
        placement="bottom"
        hasArrow
      >
        <Text>Công khai xưởng</Text>
      </Tooltip>
      {isLoading ? (
        <Spinner size="sm" color="yellow.500" />
      ) : (
        <Switch
          size="sm"
          colorScheme="yellow"
          isChecked={profilePublicStatus}
          onChange={handleToggle}
          isDisabled={isLoading}
        />
      )}
    </HStack>
  );
}
