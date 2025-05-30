import { HStack } from "@chakra-ui/react";
import { guaranteeOrderStatusConstants } from "../../../../../../config/appconfig.js";
import FeedbackModal from "../FeedbackModal/FeedbackModal.jsx";
import CancelModal from "../FeedbackModal/CancelModal.jsx";
import AppointmentConfirmModal from "../FeedbackModal/AppointmentConfirmModal.jsx";
import PaymentModal from "../FeedbackModal/PaymentModal.jsx";
import useAuth from "../../../../../../hooks/useAuth.js";
import ReviewModal from "../FeedbackModal/ReviewModal.jsx";
import QuotationConfirmModal from "../FeedbackModal/QuotationConfirmModal.jsx";
import { useTrackOrderByCodeMutation } from "../../../../../../services/ghnApi.js";
import { useGetShipmentsByGuaranteeOrderIdQuery } from "../../../../../../services/shipmentApi.js";
import { useEffect, useState } from "react";

export default function ActionBar({
  status,
  feedback,
  order,
  refetch,
  refetchDeposit,
  deposits,
}) {
  const { auth } = useAuth();

  const [trackingData, setTrackingData] = useState({});

  const { data: shipmentResponse } = useGetShipmentsByGuaranteeOrderIdQuery(
    order?.guaranteeOrderId
  );

  const shipmentOrderCode = shipmentResponse?.data?.[1]?.orderCode;

  const [trackOrderByCode] = useTrackOrderByCodeMutation();

  // Fetch tracking information when shipment data is available
  useEffect(() => {
    const fetchTrackingData = async () => {
      if (shipmentResponse?.data && !order?.install) {
        for (const shipment of shipmentResponse.data) {
          if (shipment.orderCode && shipment.orderCode !== "string") {
            try {
              const response = await trackOrderByCode({
                order_code: shipment.orderCode,
              }).unwrap();

              setTrackingData((prev) => ({
                ...prev,
                [shipment.orderCode]: response.data.data,
              }));
            } catch (error) {
              console.error("Error fetching tracking data:", error);
            }
          }
        }
      }
    };

    if (shipmentResponse?.data) {
      fetchTrackingData();
    }
  }, [shipmentResponse, trackOrderByCode]);

  const renderActionButtons = () => {
    let showFeedbackButton = false;
    let showPaymentButton = false;
    let showAppointmentButton = false;
    let showCancelButton = false;
    let showQuotationButton = false;
    let showReviewRatingButton = false;
    let confirmButtonText = "Xác nhận";
    let paymentButtonText = "";

    let depositNumber = -1;
    const unpaidDeposit =
      deposits?.length > 0
        ? [...deposits]
            .sort((a, b) => a.depositNumber - b.depositNumber)
            .find((d) => {
              if (d.status != true) {
                depositNumber = d.depositNumber;
              }

              return d.status !== true;
            })
        : null;

    const isWithinReviewWindow = () => {
      if (!order?.updatedAt) return false;
      const updatedDate = new Date(order.updatedAt);
      const currentDate = new Date();
      const differenceMs = currentDate - updatedDate;
      const differenceDays = differenceMs / 86400000;
      return differenceDays <= 14;
    };
    if (
      !order?.review &&
      status == guaranteeOrderStatusConstants.DA_HOAN_TAT &&
      isWithinReviewWindow()
    ) {
      showReviewRatingButton = true;
    }

    showCancelButton = [
      guaranteeOrderStatusConstants.DANG_CHO_THO_MOC_XAC_NHAN,
      guaranteeOrderStatusConstants.DANG_CHO_KHACH_DUYET_LICH_HEN,
      guaranteeOrderStatusConstants.DA_DUYET_LICH_HEN,
      guaranteeOrderStatusConstants.DANG_CHO_KHACH_DUYET_BAO_GIA,
      guaranteeOrderStatusConstants.DA_DUYET_BAO_GIA,
    ].includes(status);

    if (order && order.role === "Customer") {
      switch (status) {
        case guaranteeOrderStatusConstants.DANG_CHO_KHACH_DUYET_LICH_HEN:
          if (!feedback || feedback.trim() === "") {
            showAppointmentButton = true;
            showFeedbackButton = true;
            confirmButtonText = "Xác nhận lịch hẹn";
          }

          break;

        case guaranteeOrderStatusConstants.DANG_CHO_KHACH_DUYET_BAO_GIA:
          if (!feedback || feedback.trim() === "") {
            showQuotationButton = true;
            showFeedbackButton = true;
            confirmButtonText = "Xác nhận báo giá";
          }

          break;

        case guaranteeOrderStatusConstants.DA_DUYET_BAO_GIA:
          if ((!feedback || feedback.trim() === "") && unpaidDeposit) {
            showPaymentButton = true;
          }

          break;

        case guaranteeOrderStatusConstants.DANG_GIAO_HANG_LAP_DAT:
          if (unpaidDeposit) {
            if (
              !order?.install &&
              shipmentOrderCode &&
              trackingData[shipmentOrderCode] &&
              trackingData[shipmentOrderCode]?.status == "delivered"
            ) {
              showPaymentButton = true;
              paymentButtonText = "Thanh toán và xác nhận đơn hàng";
            } else if (order?.install) {
              showPaymentButton = true;
              paymentButtonText = "Thanh toán và xác nhận đơn hàng";
            }
          }

          break;

        default:
          break;
      }
    }

    showCancelButton = false;

    return (
      <HStack spacing={4} justify="flex-end">
        {showFeedbackButton && (
          <FeedbackModal
            serviceOrderId={order?.guaranteeOrderId}
            refetch={refetch}
          />
        )}

        {showAppointmentButton && (
          <AppointmentConfirmModal
            serviceOrderId={order?.guaranteeOrderId}
            appointment={order?.consultantAppointment}
            buttonText={confirmButtonText}
            refetch={refetch}
          />
        )}

        {showQuotationButton && (
          <QuotationConfirmModal
            refetchDeposit={refetchDeposit}
            order={order}
            refetch={refetch}
          />
        )}

        {showPaymentButton && unpaidDeposit && (
          <PaymentModal
            deposit={unpaidDeposit}
            order={order}
            refetch={refetch}
            buttonText={paymentButtonText}
          />
        )}

        {showCancelButton && (
          <CancelModal
            serviceOrderId={order?.guaranteeOrderId}
            refetch={refetch}
          />
        )}

        {showReviewRatingButton && (
          <ReviewModal
            guaranteeOrderId={order?.guaranteeOrderId}
            refetch={refetch}
            userId={auth?.userId}
            orderUpdatedAt={order?.updatedAt}
          />
        )}
      </HStack>
    );
  };

  return renderActionButtons();
}
