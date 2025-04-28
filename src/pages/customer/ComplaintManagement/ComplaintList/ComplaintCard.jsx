import {
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Flex,
  Divider,
  Grid,
  GridItem,
  Heading,
  Link,
} from "@chakra-ui/react";
import {
  appColorTheme,
  complaintStatusConstants,
} from "../../../../config/appconfig";
import { formatDateTimeToVietnamese } from "../../../../utils/utils";
import ComplaintDetailModal from "../ActionModal/ComplaintDetailModal";

const ComplaintCard = ({ complaint, refetch }) => {
  return (
    <Card
      overflow="hidden"
      variant="outline"
      boxShadow="sm"
      borderColor="gray.200"
      transition="all 0.3s"
      _hover={{ boxShadow: "md", borderColor: appColorTheme.brown_2 }}
      width="100%"
    >
      <CardHeader bg="gray.50" py={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" fontWeight="bold">
            Mã khiếu nại: #{complaint.complaintId}
          </Heading>

          <Badge
            colorScheme={
              complaint.status === complaintStatusConstants.COMPLETED
                ? "green"
                : complaint.status === complaintStatusConstants.IN_PROGRESS
                ? "yellow"
                : complaint.status === complaintStatusConstants.PENDING
                ? "purple"
                : "red"
            }
            px={2}
            py={1}
          >
            {complaint.status}
          </Badge>
        </Flex>
      </CardHeader>

      <CardBody>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {/* Left Column */}
          <GridItem>
            <Flex>
              <Text fontWeight="medium" minWidth="150px">
                Mã đơn hàng:
              </Text>
              <Text>#{complaint.serviceOrderDetail?.orderId || "N/A"}</Text>
            </Flex>

            <Flex mt={1}>
              <Text fontWeight="medium" minWidth="150px">
                Xưởng mộc:
              </Text>
              <Link
                href={`/woodworker/${complaint.serviceOrderDetail?.service?.wwDto?.woodworkerId}`}
                target="_blank"
                color={appColorTheme.brown_2}
              >
                <Text>
                  {complaint.serviceOrderDetail?.service?.wwDto?.brandName ||
                    "N/A"}
                </Text>
              </Link>
            </Flex>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <Flex>
              <Text fontWeight="medium" minWidth="150px">
                Loại khiếu nại:
              </Text>
              <Text>{complaint.complaintType}</Text>
            </Flex>

            <Flex mt={1}>
              <Text fontWeight="medium" minWidth="150px">
                Ngày tạo:
              </Text>
              <Text>{formatDateTimeToVietnamese(complaint.createdAt)}</Text>
            </Flex>
          </GridItem>
        </Grid>
      </CardBody>

      <Divider />

      <CardFooter
        pt={2}
        pb={3}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <ComplaintDetailModal complaint={complaint} />
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
