import { Box, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination";
import PackageFrame from "../../../../components/Utility/PackageFrame";
import { Link } from "react-router-dom";

export default function WoodworkerList() {
  const woodworkers = [
    {
      id: 1,
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      name: "Xưởng mộc Hòa Bình",
      rating: 4,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Bronze",
    },
    {
      id: 2,
      name: "Xưởng mộc Sài Gòn",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 5,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Gold",
    },
    {
      id: 3,
      name: "Xưởng gỗ Hà Nội",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 3.5,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Silver",
    },
    {
      id: 4,
      name: "Xưởng đồ gỗ Đà Nẵng",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 4.5,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Silver",
    },
    {
      id: 5,
      name: "Xưởng mộc Cần Thơ",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 4,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Silver",
    },
    {
      id: 6,
      name: "Xưởng gỗ Biên Hòa",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 4.2,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Gold",
    },
    {
      id: 7,
      name: "Xưởng gỗ Bình Dương",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 4.7,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Gold",
    },
    {
      id: 8,
      name: "Xưởng đồ gỗ Nam Định",
      address: "1775 Lê Văn Lương, ấp 3, Nhơn Đức, Nhà Bè, TP.HCM",
      rating: 3.8,
      image: "https://www.noithatmocdat.com/Pictures/xuong%20moc.jpg",
      package: "Gold",
    },
  ];

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
            {data.map((product) => (
              <Link to="1" key={product.id}>
                <PackageFrame packageType={product.package}>
                  <Box overflow="hidden" bgColor="white">
                    <Image src={product.image} alt={product.name} />

                    <Stack p={2} gap={2}>
                      <Text height="50px" noOfLines={2} fontWeight="bold">
                        {product.name}
                      </Text>

                      <Text height="50px" noOfLines={2}>
                        {product.address}
                      </Text>

                      <Text>
                        ⭐ {product.rating.toFixed(1)} (10 lượt đánh giá)
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
