import { Box, HStack, Icon, Text, Spinner, Center } from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { FiDownload } from "react-icons/fi";
import { useExportToDoc } from "html-to-doc-react";
import { useGetContractByServiceOrderIdQuery } from "../../../services/contractApi";
import useAuth from "../../../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";

export default function ContractPage() {
  const { id } = useParams();
  const { auth } = useAuth();

  // Fetch contract data
  const {
    data: contractResponse,
    isLoading,
    error,
  } = useGetContractByServiceOrderIdQuery(id);

  const exportToDoc = useExportToDoc(
    null,
    "contract-template",
    `hop-dong-so-${contractResponse?.data?.contractId}.doc`
  );

  // Handle loading state
  if (isLoading) {
    return (
      <Center h="300px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Handle error state
  if (error || !contractResponse?.data) {
    return <Box p={5}>Error loading contract data</Box>;
  }

  const contract = contractResponse.data;

  // Check authorization
  const isAuthorized =
    auth?.userId === contract?.customer?.userId ||
    auth?.userId === contract?.woodworker?.userId;

  // Redirect if unauthorized
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" />;
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy");
    } catch (e) {
      return "";
    }
  };

  // Get contract sign date parts
  const signDate = contract.signDate ? new Date(contract.signDate) : new Date();
  const day = signDate.getDate();
  const month = signDate.getMonth() + 1;
  const year = signDate.getFullYear();

  return (
    <Box
      bg="white"
      borderRadius="10px"
      p={5}
      boxShadow="md"
      position="relative"
      fontFamily={"Times New Roman, serif!important"}
      fontSize={"16px"}
    >
      <Box
        position="absolute"
        top={2}
        right={2}
        bgColor={appColorTheme.brown_2}
        p={2}
        color="white"
        borderRadius="15px"
        cursor="pointer"
        onClick={exportToDoc}
      >
        <HStack spacing={1}>
          <Icon as={FiDownload} />
          <Text>Tải xuống</Text>
        </HStack>
      </Box>
      <div id="contract-template">
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </p>
        <p
          style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px" }}
        >
          Độc lập - Tự do - Hạnh phúc
        </p>
        <p style={{ textAlign: "center", marginTop: "40px" }}>===o0o===</p>
        <p
          style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px" }}
        >
          HỢP ĐỒNG CUNG ỨNG DỊCH VỤ
        </p>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Số: <b>{contract.contractId}</b>
        </p>
        <p style={{ marginTop: "10px" }}>Bộ luật dân sự 2015;</p>
        <p style={{ marginTop: "10px" }}>Luật thương mại 2005</p>
        <p style={{ marginTop: "10px" }}>
          Căn cứ Luật giao dịch điện tử số 51/2005/QH11 ngày 29/11/2005
        </p>
        <p style={{ marginTop: "10px" }}>
          Hợp Đồng này được ký ngày <b>{day}</b> tháng <b>{month}</b> năm{" "}
          <b>{year}</b> giữa:
        </p>
        <p style={{ fontWeight: "bold", marginTop: "10px" }}>
          Bên Cung Cấp Dịch Vụ: <b>{contract.woodworker?.username || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Điện thoại: <b>{contract.woodworker?.phone || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Email: <b>{contract.woodworker?.email || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Đại diện bởi: <b>{contract.woodworker?.username || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>Sau đây được gọi là "Bên A".</p>
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Bên Thuê Dịch Vụ:{" "}
          <b>{contract.customer?.username || contract.cusFullName || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Điện thoại:{" "}
          <b>{contract.cusPhone || contract.customer?.phone || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Email: <b>{contract.email || contract.customer?.email || ""}</b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Đại diện bởi:{" "}
          <b>{contract.customer?.username || contract.cusFullName || ""}</b>
        </p>

        <p style={{ marginTop: "10px" }}>
          2.1 Bên A cam kết sẽ hoàn thành dịch vụ vào ngày{" "}
          <b>{formatDate(contract.completeDate)}</b> nếu bên B hoàn thành nghĩa
          vụ thanh toán theo từng giai đoạn với tổng số tiền cần phải thanh toán
          là <b>{contract.contractTotalAmount?.toLocaleString("vi-VN")} VNĐ</b>.
        </p>
        <p style={{ marginTop: "10px" }}>
          2.2 Bên A sẽ chịu trách nhiệm bảo hành dịch vụ theo chính sách:
        </p>
        <p style={{ marginTop: "10px" }}>
          <b>{contract.warrantyPolicy || "Không có"}</b>
        </p>
        <div
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p>ĐẠI DIỆN BÊN A</p>
            {contract.woodworkerSignature && (
              <img
                src={contract.woodworkerSignature}
                alt="Chữ ký bên A"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            )}
          </div>
          <div>
            <p>ĐẠI DIỆN BÊN B</p>
            {contract.customerSignature && (
              <img
                src={contract.customerSignature}
                alt="Chữ ký bên B"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}
