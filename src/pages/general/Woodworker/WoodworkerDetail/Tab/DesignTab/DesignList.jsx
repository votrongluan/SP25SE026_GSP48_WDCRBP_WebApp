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
  Spacer,
} from "@chakra-ui/react";
import Pagination from "../../../../../../components/Utility/Pagination.jsx";
import { Link } from "react-router-dom";
import PackageFrame from "../../../../../../components/Utility/PackageFrame.jsx";
import { MdCollections } from "react-icons/md";
import StarReview from "../../../../../../components/Utility/StarReview.jsx";

export default function DesignList({ designs = [] }) {
  if (!designs.length) {
    return (
      <Center py={10}>
        <Text>Đang tải danh sách thiết kế</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Pagination
        itemsPerPage={16}
        dataList={designs}
        DisplayComponent={({ data }) => (
          <Grid
            mt={4}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={5}
          >
            {data.map((design) => (
              <Link
                key={design.designIdeaId}
                to={`/design/${design.designIdeaId}`}
              >
                <PackageFrame
                  packageType={design.woodworkerProfile?.servicePack?.name}
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
                          bottom="0"
                          right="0"
                          colorScheme="purple"
                        >
                          {design.category.categoryName}
                        </Badge>
                      )}
                    </Box>

                    <Stack height="110px" gap={1} p={1}>
                      <Box>
                        <Text noOfLines={1} fontWeight="bold">
                          {design.name}
                        </Text>

                        {design.description && (
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {design.description}
                          </Text>
                        )}
                      </Box>

                      <Spacer />

                      <Flex alignItems="center" mt={1}>
                        <HStack ml="auto" fontSize="sm">
                          <StarReview
                            totalStar={design.totalStar}
                            totalReviews={design.totalReviews}
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
