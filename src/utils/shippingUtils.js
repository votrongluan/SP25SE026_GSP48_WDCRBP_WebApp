/**
 * Extract dimensions from variant config (length x width x height)
 * @param {Object} config - The design variant config object
 * @returns {Object} Dimensions object with length, width, and height
 */
export const extractDimensionsFromConfig = (config) => {
  try {
    const dimensionStr = config.designVariantValues[0].value;

    const dimensions = dimensionStr
      .split("x")
      .map((dim) => parseFloat(dim.trim()));

    if (dimensions.length === 3) {
      return {
        length: dimensions[0] || 20,
        width: dimensions[1] || 20,
        height: dimensions[2] || 20,
      };
    }

    return { length: 20, width: 20, height: 20 };
  } catch (error) {
    return { length: 20, width: 20, height: 20 };
  }
};

/**
 * Extract dimensions from product object (handles different product types)
 * @param {Object} product - The product object
 * @returns {Object} Dimensions object with length, width, and height
 */
export const extractDimensionsFromProduct = (product) => {
  try {
    if (product.designIdeaVariantDetail?.designIdeaVariantConfig) {
      const config = product.designIdeaVariantDetail.designIdeaVariantConfig[0];
      return extractDimensionsFromConfig(config);
    } else if (product.personalProductDetail) {
      return {
        length:
          product.personalProductDetail.techSpecList.find(
            (item) => item.name === "Chiều dài"
          )?.value || 20,
        width:
          product.personalProductDetail.techSpecList.find(
            (item) => item.name === "Chiều rộng"
          )?.value || 20,
        height:
          product.personalProductDetail.techSpecList.find(
            (item) => item.name === "Chiều cao"
          )?.value || 20,
      };
    }

    return { length: 20, width: 20, height: 20 };
  } catch (error) {
    return { length: 20, width: 20, height: 20 };
  }
};

/**
 * Calculate the cheapest shipping option based on product dimensions, addresses and installation requirements
 * @param {Object} params The parameters needed for shipping calculation
 * @returns {Promise<Object>} Object containing cheapest service and fee
 */
export const calculateCheapestShipping = async ({
  fromDistrictId,
  fromWardCode,
  toDistrictId,
  toWardCode,
  items,
  isInstall,
  getAvailableServices,
  calculateShippingFee,
}) => {
  try {
    // Step 1: Fetch available services
    const servicesData = {
      from_district: fromDistrictId,
      to_district: toDistrictId,
      shop_id: 0,
    };

    const servicesResponse = await getAvailableServices(servicesData).unwrap();
    const services = servicesResponse.data.data || [];

    if (!services.length) {
      return { selectedService: null, shippingFee: 0 };
    }

    // Step 2: Calculate shipping fee for each service
    let cheapestService = null;
    let cheapestFee = Infinity;

    for (const service of services) {
      try {
        const shippingData = {
          from_district_id: fromDistrictId,
          from_ward_code: fromWardCode,
          to_district_id: toDistrictId,
          to_ward_code: toWardCode,
          service_id: service.service_id,
          service_type_id: service.service_type_id,
          insurance_value: 0,
          cod_failed_amount: 0,
          coupon: "",
          height: 0,
          length: 0,
          width: 0,
          weight: 0,
          items: items,
        };

        const response = await calculateShippingFee(shippingData).unwrap();
        const fee = response.data.data.total || 0;

        if (fee < cheapestFee) {
          cheapestFee = fee;
          cheapestService = { ...service, fee };
        }
      } catch (error) {
        console.error(
          `Error calculating fee for service ${service.service_id}:`,
          error
        );
      }
    }

    // Step 3: Return the selected service and fee
    if (cheapestService) {
      // For non-install orders, double the fee (round trip)
      const finalFee = isInstall
        ? cheapestService.fee
        : cheapestService.fee * 2;
      return {
        selectedService: cheapestService,
        shippingFee: finalFee,
      };
    }

    return { selectedService: null, shippingFee: 0 };
  } catch (error) {
    console.error("Error in shipping calculation:", error);
    return { selectedService: null, shippingFee: 0 };
  }
};
