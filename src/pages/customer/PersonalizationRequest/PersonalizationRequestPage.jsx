import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth.js";
import { useParams, useNavigate } from "react-router-dom";
import AddPersonalizationProduct from "./AddPersonalizationProduct.jsx";
import { appColorTheme } from "../../../config/appconfig.js";
import { useNotify } from "../../../components/Utility/Notify.jsx";
import { useGetAllTechSpecQuery } from "../../../services/techSpecApi";
import { useGetWoodworkerByIdQuery } from "../../../services/woodworkerApi";
import { useGetAvailableServiceByWwIdQuery } from "../../../services/availableServiceApi";
import { useCreatePersonalOrderMutation } from "../../../services/serviceOrderApi";
import PersonalizationProductList from "./PersonalizationProductList.jsx";
import WoodworkerBox from "./WoodworkerBox.jsx";

export default function PersonalizationRequestPage() {
  const { id: woodworkerId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const notify = useNotify();
  const [editIndex, setEditIndex] = useState(-1);

  // Fetch tech specs
  const {
    data: techSpecData,
    isLoading: isTechSpecLoading,
    error: techSpecError,
  } = useGetAllTechSpecQuery();

  // Fetch woodworker data
  const {
    data: woodworkerData,
    isLoading: isWoodworkerLoading,
    error: woodworkerError,
  } = useGetWoodworkerByIdQuery(woodworkerId);

  // Fetch available services
  const {
    data: serviceData,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useGetAvailableServiceByWwIdQuery(woodworkerId);

  // Create order mutation
  const [createPersonalOrder, { isLoading: isCreating }] =
    useCreatePersonalOrderMutation();

  // List of added products
  const [productList, setProductList] = useState([]);

  // Store product being edited or created
  const [productData, setProductData] = useState({});

  // Check service availability
  const woodworker = woodworkerData?.data;
  const availableServices = serviceData?.data || [];

  const personalizationService = availableServices.find(
    (service) => service?.service?.serviceName === "Personalization"
  );

  const isPersonalizationAvailable =
    personalizationService?.operatingStatus !== false;

  const isServicePackValid =
    woodworker?.servicePackEndDate &&
    Date.now() <= new Date(woodworker.servicePackEndDate).getTime() &&
    woodworker?.servicePack?.name === "Gold";

  const isServiceAvailable = isPersonalizationAvailable && isServicePackValid;

  // Initialize product data
  const initializeProductData = () => {
    if (!techSpecData?.data) return;

    const initialData = {};
    techSpecData.data.forEach((spec) => {
      initialData[`techSpec_${spec.techSpecId}`] = "";
    });

    initialData.quantity = 1;
    setProductData(initialData);
    setEditIndex(-1);
  };

  useEffect(() => {
    if (techSpecData?.data) {
      initializeProductData();
    }
  }, [techSpecData]);

  // Handle adding or updating product
  const handleAddProduct = () => {
    // Validation for required fields
    const lengthValue = productData["techSpec_1"];
    const widthValue = productData["techSpec_2"];
    const heightValue = productData["techSpec_3"];

    if (!lengthValue || !widthValue || !heightValue || !productData.quantity) {
      notify(
        "Lỗi!",
        "Vui lòng nhập đầy đủ kích thước và số lượng sản phẩm.",
        "error"
      );
      return;
    }

    // Check total quantity limit
    const currentTotalQuantity = productList.reduce((sum, product, index) => {
      if (editIndex !== -1 && index === editIndex) return sum;
      return sum + parseInt(product.quantity || 0);
    }, 0);

    const newQuantity = parseInt(productData.quantity || 0);
    if (currentTotalQuantity + newQuantity > 4) {
      notify("Lỗi!", "Tổng số lượng sản phẩm không được vượt quá 4.", "error");
      return;
    }

    if (editIndex === -1) {
      setProductList([...productList, productData]);
      notify("Thành công!", "Sản phẩm đã được thêm vào danh sách.", "success");
    } else {
      const updatedList = [...productList];
      updatedList[editIndex] = productData;
      setProductList(updatedList);
      notify("Thành công!", "Sản phẩm đã được cập nhật.", "success");

      // Scroll up to the form area for better UX after editing
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    initializeProductData();
  };

  // Edit a product - scroll to form area and populate with data
  const handleEditProduct = (index) => {
    setProductData({ ...productList[index] });
    setEditIndex(index);

    // Scroll to the form area for better UX
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Submit order
  const handleSubmitOrder = async () => {
    if (productList.length === 0) {
      notify("Lỗi!", "Vui lòng thêm ít nhất một sản phẩm.", "error");
      return;
    }

    try {
      const requestedProducts = productList.map((product) => {
        // Get all tech specs, even empty ones
        const techSpecs =
          techSpecData?.data.map((spec) => {
            const key = `techSpec_${spec.techSpecId}`;
            return {
              techSpecId: spec.techSpecId,
              values: product[key] || "", // Use empty string if not provided
            };
          }) || [];

        return {
          quantity: product.quantity.toString(),
          techSpecs,
        };
      });

      const orderData = {
        availableServiceId: personalizationService?.availableServiceId,
        userId: auth?.userId,
        requestedProducts,
      };

      await createPersonalOrder(orderData).unwrap();
      notify("Thành công!", "Đơn hàng đã được tạo thành công.", "success");
      navigate("/orders");
    } catch (error) {
      notify(
        "Lỗi!",
        error.message || "Có lỗi xảy ra khi tạo đơn hàng.",
        "error"
      );
    }
  };

  // Show loading state
  if (isTechSpecLoading || isWoodworkerLoading || isServiceLoading) {
    return (
      <Center h="400px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Show error state
  if (techSpecError || woodworkerError || serviceError) {
    return (
      <Box textAlign="center" p={10}>
        <Alert status="error">
          <AlertIcon />
          Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại sau.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      {!isServiceAvailable && (
        <Box textAlign="center" p={10}>
          <Alert status="warning">
            <AlertIcon />
            Dịch vụ cá nhân hóa tạm thời không khả dụng cho xưởng mộc này.
          </Alert>
        </Box>
      )}

      {isServiceAvailable && (
        <>
          <Box mb={6}>
            <Heading
              color={appColorTheme.brown_2}
              fontSize="2xl"
              fontFamily="Montserrat"
            >
              Đặt thiết kế và gia công theo yêu cầu (cá nhân hóa)
            </Heading>
          </Box>

          <Box>
            <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={5}>
              <AddPersonalizationProduct
                techSpecs={techSpecData?.data || []}
                productData={productData}
                setProductData={setProductData}
                handleAddProduct={handleAddProduct}
                isEditing={editIndex !== -1}
                onCancelEdit={() => {
                  initializeProductData();
                  setEditIndex(-1);
                }}
              />

              <Box>
                <PersonalizationProductList
                  productList={productList}
                  setProductList={setProductList}
                  handleEditProduct={handleEditProduct}
                  handleRemoveProduct={(index) => {
                    setProductList(productList.filter((_, i) => i !== index));
                    if (editIndex === index) {
                      initializeProductData();
                      setEditIndex(-1);
                    }
                    notify(
                      "Đã xóa",
                      "Sản phẩm đã được xóa khỏi danh sách",
                      "info"
                    );
                  }}
                  techSpecs={techSpecData?.data || []}
                  notify={notify}
                />

                <WoodworkerBox woodworkerProfile={woodworker} />

                <Flex justifyContent="center" mt={6}>
                  <Button
                    onClick={handleSubmitOrder}
                    isLoading={isCreating}
                    isDisabled={productList.length === 0}
                  >
                    Gửi yêu cầu
                  </Button>
                </Flex>
              </Box>
            </SimpleGrid>
          </Box>
        </>
      )}
    </>
  );
}
