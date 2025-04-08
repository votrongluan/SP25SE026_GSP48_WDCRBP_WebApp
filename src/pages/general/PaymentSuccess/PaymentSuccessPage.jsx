import { useSearchParams } from "react-router-dom";
import RequireAuth from "../../../components/Utility/RequireAuth";
import TopUpWalletSuccessPage from "./TopUpWalletSuccessPage";
import BuyPackSuccessPage from "./BuyPackSuccessPage";
import OrderPaymentSuccessPage from "./OrderPaymentSuccessPage";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();

  // Service Pack-specific parameters (uppercase)
  const encryptedWoodworkerId = searchParams.get("WoodworkerId");
  const encryptedServicePackId = searchParams.get("ServicePackId");

  // Order Payment-specific parameters (lowercase)
  const encryptedOrderDepositId = searchParams.get("orderDepositId");
  const encryptedTransactionId = searchParams.get("transactionId");

  // Determine transaction type based on parameters
  const isServicePackTransaction =
    !!encryptedWoodworkerId && !!encryptedServicePackId;
  const isOrderPaymentTransaction =
    !!encryptedOrderDepositId && !!encryptedTransactionId;

  return (
    <RequireAuth allowedRoles={["Customer", "Woodworker"]}>
      {isServicePackTransaction ? (
        <BuyPackSuccessPage />
      ) : isOrderPaymentTransaction ? (
        <OrderPaymentSuccessPage />
      ) : (
        <TopUpWalletSuccessPage />
      )}
    </RequireAuth>
  );
}
