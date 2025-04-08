import AppointmentUpdateModal from "../Appointment/AppointmentUpdateModal.jsx";
import ContractUpdateModal from "../Contract/ContractUpdateModal.jsx";
import { serviceOrderStatusConstants } from "../../../../../../config/appconfig.js";

export default function ActionBar({ status, feedback, order, refetch }) {
  const renderActionButtons = () => {
    const serviceName = order?.service?.service?.serviceName;

    // Default: no actions
    let showAppointmentModal = false;
    let showCancelModal = false;
    let showContractModal = false;
    let showDesignModal = false;
    let showCompleteModal = false;

    switch (status) {
      // For appointment scheduling
      case serviceOrderStatusConstants.DANG_CHO_THO_DUYET:
        showAppointmentModal = true;
        break;
      case serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_LICH_HEN:
        // Show appointment modal if feedback exists
        if (feedback && feedback.trim() !== "") {
          showAppointmentModal = true;
        }
        break;

      // For contract creation/update
      case serviceOrderStatusConstants.DA_DUYET_LICH_HEN:
        showContractModal = true;
        break;
      case serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_HOP_DONG:
        // Show contract modal if feedback exists
        if (feedback && feedback.trim() !== "") {
          showContractModal = true;
        }
        break;
      case serviceOrderStatusConstants.DA_DUYET_HOP_DONG:
        if (serviceName == "Personalization") {
          showDesignModal = true;
        }

        break;
      case serviceOrderStatusConstants.DANG_CHO_KHACH_DUYET_THIET_KE:
        // Show design modal if feedback exists
        if (feedback && feedback.trim() !== "") {
          showDesignModal = true;
        }
        break;
      case serviceOrderStatusConstants.DANG_GIA_CONG:
        showCompleteModal = true;
        break;
      default:
        // No actions for other statuses
        break;
    }

    return (
      <>
        {showAppointmentModal && (
          <AppointmentUpdateModal refetch={refetch} order={order} />
        )}
        {showContractModal && (
          <ContractUpdateModal refetch={refetch} order={order} />
        )}
      </>
    );
  };

  return renderActionButtons();
}
