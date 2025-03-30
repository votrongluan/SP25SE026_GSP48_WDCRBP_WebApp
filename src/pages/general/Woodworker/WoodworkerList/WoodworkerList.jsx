import { Box, Grid, Image, Stack, Text, Center } from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import { Link } from "react-router-dom";

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
                      <Text height="50px" noOfLines={2} fontWeight="bold">
                        {woodworker.brandName}
                      </Text>

                      <Text height="50px" noOfLines={2}>
                        {woodworker.address}
                      </Text>

                      <Text>
                        ⭐{" "}
                        {woodworker.totalReviews
                          ? (
                              woodworker.totalStar / woodworker.totalReviews
                            ).toFixed(1)
                          : "Chưa có đánh giá"}
                        {woodworker.totalReviews
                          ? ` (${woodworker.totalReviews} lượt đánh giá)`
                          : ""}
                      </Text>
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
