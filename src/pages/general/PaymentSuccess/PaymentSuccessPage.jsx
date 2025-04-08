import { useSearchParams } from "react-router-dom";
import RequireAuth from "../../../components/Utility/RequireAuth";
import TopUpWalletSuccessPage from "./TopUpWalletSuccessPage";
import BuyPackSuccessPage from "./BuyPackSuccessPage";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();

  // Service Pack-specific parameters
  const encryptedWoodworkerId = searchParams.get("WoodworkerId");
  const encryptedServicePackId = searchParams.get("ServicePackId");

  // Determine transaction type based on parameters
  const isServicePackTransaction =
    !!encryptedWoodworkerId && !!encryptedServicePackId;

  return (
    <RequireAuth allowedRoles={["Customer", "Woodworker"]}>
      {isServicePackTransaction ? (
        <BuyPackSuccessPage />
      ) : (
        <TopUpWalletSuccessPage />
      )}
    </RequireAuth>
  );
}
