import { Box, Grid, GridItem, Heading, Link, Text } from "@chakra-ui/react";
import {
  appColorTheme,
  getServiceTypeLabel,
} from "../../../../config/appconfig";
import { formatDateString, formatPrice } from "../../../../utils/utils";

export default function ServiceInfoSection({ orderDetail, serviceName }) {
  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>
        Thông tin dịch vụ
      </Heading>
      <Grid templateColumns="150px 1fr" gap={3}>
        <GridItem>
          <Text fontWeight="bold">Mã đơn hàng:</Text>
        </GridItem>
        <GridItem>
          <Text>#{orderDetail?.orderId}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">Loại dịch vụ:</Text>
        </GridItem>
        <GridItem>
          <Text>{getServiceTypeLabel(serviceName)}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">Ngày cam kết hoàn thành:</Text>
        </GridItem>
        <GridItem>
          <Text>
            {orderDetail?.completeDate
              ? formatDateString(orderDetail?.completeDate)
              : "Chưa cập nhật"}
          </Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">Tổng tiền đã thanh toán:</Text>
        </GridItem>
        <GridItem>
          <Text color={appColorTheme.brown_2}>
            {formatPrice(orderDetail?.amountPaid)}
          </Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">Khách hàng:</Text>
        </GridItem>
        <GridItem>
          <Text>{orderDetail?.user?.username || "N/A"}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">SĐT Khách hàng:</Text>
        </GridItem>
        <GridItem>
          <Text>{orderDetail?.user?.phone || "N/A"}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">Xưởng mộc:</Text>
        </GridItem>
        <GridItem>
          <Link
            color={appColorTheme.brown_2}
            isExternal
            href={`/woodworker/${orderDetail?.service?.wwDto?.woodworkerId}`}
          >
            <Text>{orderDetail?.service?.wwDto?.brandName}</Text>
          </Link>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">SĐT xưởng mộc:</Text>
        </GridItem>
        <GridItem>
          <Text>{orderDetail?.service?.wwDto?.phone || "N/A"}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
