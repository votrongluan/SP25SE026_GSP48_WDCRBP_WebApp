import {
  Box,
  Grid,
  Image,
  Stack,
  Text,
  Center,
  Badge,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination.jsx";
import { Link } from "react-router-dom";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import { MdCollections, MdStorefront, MdLocationOn } from "react-icons/md";
import StarRating from "../../../../components/Utility/StarRating.jsx";

export default function DesignList({ designs = [] }) {
  if (!designs.length) {
    return (
      <Center py={10}>
        <Text>Không tìm thấy thiết kế nào</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Pagination
        itemsPerPage={8}
        dataList={designs}
        DisplayComponent={({ data }) => (
          <Grid
            mt={4}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={5}
          >
            {data.map((design) => (
              <Link key={design.designIdeaId} to={`${design.designIdeaId}`}>
                <PackageFrame
                  packageType={
                    design.woodworkerProfile?.servicePack?.name || "Bronze"
                  }
                >
                  <Box overflow="hidden" bgColor="white" borderRadius="md">
                    <Box position="relative">
                      <Image
                        src={
                          design.img_urls ? design.img_urls.split(";")[0] : ""
                        }
                        alt={design.name}
                        objectFit="cover"
                        objectPosition="center"
                        w="100%"
                        h="200px"
                        fallbackSrc="https://via.placeholder.com/200x150?text=No+Image"
                      />
                      {design.img_urls && design.img_urls.includes(";") && (
                        <Badge
                          position="absolute"
                          top="8px"
                          right="8px"
                          colorScheme="teal"
                          display="flex"
                          alignItems="center"
                          px={2}
                          py={1}
                        >
                          <Icon as={MdCollections} mr={1} />
                          {design.img_urls.split(";").length}
                        </Badge>
                      )}
                      {design.category && (
                        <Badge
                          position="absolute"
                          bottom="8px"
                          left="8px"
                          colorScheme="purple"
                        >
                          {design.category.categoryName}
                        </Badge>
                      )}
                    </Box>

                    <Stack gap={2} p={3}>
                      <Text noOfLines={2} fontWeight="bold">
                        {design.name}
                      </Text>

                      {design.description && (
                        <Text fontSize="sm" color="gray.600" noOfLines={2}>
                          {design.description}
                        </Text>
                      )}

                      <Flex alignItems="center">
                        <Icon as={MdStorefront} mr={1} color="gray.600" />
                        <Text noOfLines={2} fontWeight="medium" fontSize="sm">
                          {design.woodworkerProfile?.brandName ||
                            "Không có tên xưởng"}
                        </Text>
                      </Flex>

                      <Flex alignItems="center">
                        <Icon as={MdLocationOn} mr={1} color="gray.500" />
                        <Text noOfLines={2} fontSize="xs" color="gray.500">
                          {design.woodworkerProfile.address}
                        </Text>
                      </Flex>

                      <Flex alignItems="center" mt={1}>
                        <HStack ml="auto" fontSize="sm">
                          {design.totalReviews ? (
                            <StarRating
                              rating={(
                                design.totalStar / design.totalReviews
                              ).toFixed(1)}
                            />
                          ) : (
                            <Text>Chưa có đánh giá</Text>
                          )}
                          {design.totalReviews ? (
                            <Text fontSize="xs" color="gray.500">
                              ({design.totalReviews})
                            </Text>
                          ) : null}
                        </HStack>
                      </Flex>
                    </Stack>
                  </Box>
                </PackageFrame>
              </Link>
            ))}
          </Grid>
        )}
      />
    </Box>
  );
}
