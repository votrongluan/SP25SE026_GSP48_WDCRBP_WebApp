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
  Spacer,
} from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import StarReview from "../../../../components/Utility/StarReview.jsx";

export default function WoodworkerList({ woodworkers = [] }) {
  if (!woodworkers.length) {
    return (
      <Center py={10}>
        <Text>Đang tải danh sách xưởng mộc</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Pagination
        itemsPerPage={16}
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
                <PackageFrame packageType={woodworker.servicePack?.name}>
                  <Box borderRadius={"md"} overflow="hidden" bgColor="white">
                    <Image
                      src={woodworker.imgUrl}
                      alt={woodworker.brandName}
                      objectFit="cover"
                      objectPosition="center"
                      w="100%"
                      h="200px"
                    />

                    <Stack height="100px" p={1} gap={1}>
                      <Box>
                        <Text noOfLines={1} fontWeight="bold">
                          {woodworker.brandName}
                        </Text>

                        <Flex alignItems="center">
                          <Icon as={MdLocationOn} mr={1} color="gray.500" />
                          <Text noOfLines={2} fontSize="xs" color="gray.500">
                            {woodworker.address}
                          </Text>
                        </Flex>
                      </Box>

                      <Spacer />

                      <Flex alignItems="center" mt={1}>
                        <HStack ml="auto" fontSize="sm">
                          <StarReview
                            totalStar={woodworker.totalStar}
                            totalReviews={woodworker.totalReviews}
                          />
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
