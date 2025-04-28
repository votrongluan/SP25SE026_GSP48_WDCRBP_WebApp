import { Box, Heading } from "@chakra-ui/react";
import PersonalizationProductList from "../../../customer/ServiceOrder/ServiceOrderDetail/Tab/PersonalizationProductList";
import CustomizationProductList from "../../../customer/ServiceOrder/ServiceOrderDetail/Tab/CustomizationProductList";
import SaleProductList from "../../../customer/ServiceOrder/ServiceOrderDetail/Tab/SaleProductList";

export default function ProductInfoSection({ orderDetail, serviceName }) {
  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>
        Thông tin sản phẩm
      </Heading>
      {serviceName && (
        <>
          {serviceName === "Personalization" && (
            <PersonalizationProductList
              orderId={orderDetail?.orderId}
              products={orderDetail?.requestedProduct}
              totalAmount={orderDetail?.totalAmount}
            />
          )}

          {serviceName === "Customization" && (
            <CustomizationProductList
              shipFee={orderDetail?.shipFee}
              products={orderDetail?.requestedProduct}
              totalAmount={orderDetail?.totalAmount}
            />
          )}

          {serviceName === "Sale" && (
            <SaleProductList
              shipFee={orderDetail?.shipFee}
              products={orderDetail?.requestedProduct}
              totalAmount={orderDetail?.totalAmount}
            />
          )}
        </>
      )}
    </Box>
  );
}
