import {
  Box,
  Grid,
  Image,
  Stack,
  Text,
  Center,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import StarRating from "../../../../components/Utility/StarRating.jsx";

export default function WoodworkerList({ woodworkers = [] }) {
  if (!woodworkers.length) {
    return (
      <Center py={10}>
        <Text>Không tìm thấy xưởng mộc nào</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Pagination
        itemsPerPage={10}
        dataList={woodworkers}
        DisplayComponent={({ data }) => (
          <Grid
            mt={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={5}
          >
            {data.map((woodworker) => (
              <Link
                to={`${woodworker.woodworkerId}`}
                key={woodworker.woodworkerId}
              >
                <PackageFrame
                  packageType={woodworker.servicePack?.name || "Bronze"}
                >
                  <Box overflow="hidden" bgColor="white">
                    <Image
                      src={woodworker.imgUrl}
                      alt={woodworker.brandName}
                      objectFit="cover"
                      objectPosition="center"
                      w="100%"
                      h="200px"
                      fallbackSrc="https://via.placeholder.com/200x150?text=No+Image"
                    />

                    <Stack p={2} gap={2}>
                      <Text noOfLines={2} fontWeight="bold">
                        {woodworker.brandName}
                      </Text>

                      <Flex alignItems="center">
                        <Icon as={MdLocationOn} mr={1} color="gray.500" />
                        <Text noOfLines={2} fontSize="xs" color="gray.500">
                          {woodworker.address}
                        </Text>
                      </Flex>

                      <Flex alignItems="center" mt={1}>
                        <HStack ml="auto" fontSize="sm">
                          {woodworker.totalReviews ? (
                            <StarRating
                              rating={(
                                woodworker.totalStar / woodworker.totalReviews
                              ).toFixed(1)}
                            />
                          ) : (
                            <Text>Chưa có đánh giá</Text>
                          )}
                          {woodworker.totalReviews ? (
                            <Text fontSize="xs" color="gray.500">
                              ({woodworker.totalReviews})
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
