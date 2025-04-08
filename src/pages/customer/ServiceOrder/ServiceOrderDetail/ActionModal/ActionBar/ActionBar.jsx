import { HStack } from "@chakra-ui/react";
import { serviceOrderStatusConstants } from "../../../../../../config/appconfig.js";
import FeedbackModal from "../FeedbackModal/FeedbackModal.jsx";
import CancelModal from "../FeedbackModal/CancelModal.jsx";
import AppointmentConfirmModal from "../FeedbackModal/AppointmentConfirmModal.jsx";
import ContractConfirmModal from "../FeedbackModal/ContractConfirmModal.jsx";
import PaymentModal from "../FeedbackModal/PaymentModal.jsx";

export default function ActionBar({
  status,
  feedback,
  order,
  refetch,
  refetchDeposit,
  deposits,
}) {
  const renderActionButtons = () => {
    // Default: no actions
    let showFeedbackButton = false;
    let showPaymentButton = false;
    let showAppointmentButton = false;
    let showCancelButton = false;
    let showContractButton = false;
    let showDesignButton = false;
    let confirmButtonText = "Xác nhận";

    // Find the first unpaid deposit (with lowest depositNumber)
    // Create a copy of deposits before sorting to avoid modifying the original array
    const unpaidDeposit =
      deposits?.length > 0
        ? [...deposits]
            .sort((a, b) => a.depositNumber - b.depositNumber)
            .find((d) => d.status !== true)
        : null;

    showCancelButton = [
      serviceOrderStatusConstants.DANG_CHO_THO_DUYET,
      serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_LICH_HEN,
      serviceOrderStatusConstants.DA_DUYET_LICH_HEN,
      serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_HOP_DONG,
      serviceOrderStatusConstants.DA_DUYET_HOP_DONG,
      serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_THIET_KE,
      serviceOrderStatusConstants.DA_DUYET_THIET_KE,
      serviceOrderStatusConstants.DANG_GIA_CONG,
    ].includes(status);

    // Only show actions if the role is Customer
    if (order && order.role === "Customer") {
      // Show cancel button for most statuses before completion

      switch (status) {
        case serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_LICH_HEN:
          if (!feedback || feedback.trim() === "") {
            // If there's NO feedback, show BOTH confirmation and feedback buttons
            showAppointmentButton = true;
            showFeedbackButton = true;
            confirmButtonText = "Xác nhận lịch hẹn";
          }
          break;

        case serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_HOP_DONG:
          if (!feedback || feedback.trim() === "") {
            // If there's NO feedback, show BOTH confirmation and feedback buttons
            showContractButton = true;
            showFeedbackButton = true;
            confirmButtonText = "Xác nhận hợp đồng";
          }
          break;

        case serviceOrderStatusConstants.DA_DUYET_HOP_DONG:
          if ((!feedback || feedback.trim() === "") && unpaidDeposit) {
            showPaymentButton = true;
          }
          break;

        case serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_THIET_KE:
          if (!feedback || feedback.trim() === "") {
            // If there's NO feedback, show BOTH confirmation and feedback buttons
            showDesignButton = true;
            showFeedbackButton = true;
            confirmButtonText = "Xác nhận thiết kế";
          }
          break;

        default:
          // No specific actions for other statuses except Cancel
          break;
      }
    }

    return (
      <HStack spacing={4} justify="flex-end">
        {showFeedbackButton && (
          <FeedbackModal serviceOrderId={order?.orderId} refetch={refetch} />
        )}

        {showAppointmentButton && (
          <AppointmentConfirmModal
            serviceOrderId={order?.orderId}
            appointment={order?.consultantAppointment}
            buttonText={confirmButtonText}
            refetch={refetch}
          />
        )}

        {showContractButton && (
          <ContractConfirmModal
            serviceOrderId={order?.orderId}
            buttonText={confirmButtonText}
            refetch={refetch}
            refetchDeposit={refetchDeposit}
          />
        )}

        {showPaymentButton && unpaidDeposit && (
          <PaymentModal
            deposit={unpaidDeposit}
            order={order}
            refetch={refetch}
          />
        )}

        {showCancelButton && (
          <CancelModal serviceOrderId={order?.orderId} refetch={refetch} />
        )}
      </HStack>
    );
  };

  return renderActionButtons();
}
