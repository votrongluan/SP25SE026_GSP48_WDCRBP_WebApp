import {
  Box,
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  AspectRatio,
} from "@chakra-ui/react";

export const STL3DEditorGuide = () => {
  return (
    <Box p={5} bg="app_white.0" color="app_black.0">
      <Heading
        fontSize="26px"
        fontFamily="Montserrat"
        textAlign={"center"}
        as="h2"
        mb={4}
        fontWeight={"normal"}
      >
        Hướng dẫn chỉnh sửa và tạo file STL 3D Object
      </Heading>

      <Text mt="60px" mb={4}>
        Định dạng STL là một trong những định dạng phổ biến nhất để lưu trữ mô
        hình 3D, đặc biệt dùng trong in 3D. Các công cụ sau sẽ giúp bạn dễ dàng
        chỉnh sửa và tạo các file STL. Bài viết này sẽ cung cấp chi tiết từng
        bước và các tài liệu hướng dẫn để bạn có thể bắt đầu ngay hôm nay. (Bạn
        có thể đọc bài viết này nếu như chưa từng biết đến công nghệ in 3D hoặc
        chỉ mới nghe qua{" "}
        <Link
          href="https://vietmachine.com.vn/cong-nghe-in-3d.html"
          isExternal
          color="teal.300"
        >
          6 điều cần biết về công nghệ in 3D
        </Link>
        )
      </Text>

      <Heading fontSize="24px" fontFamily="Montserrat" as="h2" size="lg" mb={3}>
        1. Blender - Công cụ mạnh mẽ cho thiết kế và chỉnh sửa 3D
      </Heading>

      <Text mb={4}>
        <Link href="https://www.blender.org/" isExternal color="teal.300">
          Blender
        </Link>{" "}
        là một phần mềm mã nguồn mở phổ biến cho thiết kế và chỉnh sửa 3D, bao
        gồm cả việc xử lý file STL. Đây là công cụ mạnh mẽ, nhưng cũng đòi hỏi
        một chút thời gian học tập. Dưới đây là các bước cơ bản và các tài liệu
        hướng dẫn chi tiết để giúp bạn bắt đầu:
      </Text>

      <UnorderedList mb={4}>
        <ListItem>Tải và cài đặt Blender từ trang web chính thức.</ListItem>
        <ListItem>
          Import file STL: Vào menu File {">"} Import {">"} STL để bắt đầu chỉnh
          sửa mô hình 3D của bạn.
        </ListItem>
        <ListItem>
          Dùng các công cụ như Extrude, Scale, và Rotate để chỉnh sửa mô hình.
        </ListItem>
        <ListItem>
          Khi hoàn tất, bạn có thể export lại dưới dạng STL: Vào menu File {">"}{" "}
          Export {">"} STL.
        </ListItem>
      </UnorderedList>

      <Text mb={4}>
        Xem hướng dẫn sử dụng Blender:{" "}
        <Link
          href="https://docs.blender.org/manual/en/latest/"
          isExternal
          color="teal.300"
        >
          Tài liệu chính thức của Blender
        </Link>{" "}
        hoặc video chi tiết trên YouTube:
      </Text>

      <AspectRatio maxW="560px" ratio={16 / 9} mb={4}>
        <iframe
          src="https://www.youtube.com/embed/TPrnSACiTJ4"
          title="Blender 2.8 Beginner Tutorial - Part 1"
          allowFullScreen
        />
      </AspectRatio>

      <Text mb={4}>
        Video này hướng dẫn cơ bản về Blender, rất phù hợp cho những ai mới bắt
        đầu:{" "}
        <Link
          href="https://www.youtube.com/watch?v=TPrnSACiTJ4"
          isExternal
          color="teal.300"
        >
          Blender 2.8 Beginner Tutorial
        </Link>
      </Text>

      <Heading
        mt="40px"
        fontSize="24px"
        fontFamily="Montserrat"
        as="h2"
        size="lg"
        mb={3}
      >
        2. Spline - Công cụ thiết kế 3D trực tuyến dễ sử dụng
      </Heading>

      <Text mb={4}>
        <Link href="https://spline.design/" isExternal color="teal.300">
          Spline
        </Link>{" "}
        là một công cụ trực tuyến cho phép bạn tạo mô hình 3D tương tác dễ dàng.
        Với giao diện trực quan, Spline rất phù hợp cho các dự án nhỏ hoặc những
        người mới bắt đầu. Dưới đây là cách sử dụng Spline:
      </Text>

      <UnorderedList mb={4}>
        <ListItem>
          Truy cập trang web Spline và đăng ký tài khoản miễn phí.
        </ListItem>
        <ListItem>
          Sử dụng giao diện kéo thả để tạo hoặc chỉnh sửa các hình 3D đơn giản.
        </ListItem>
        <ListItem>
          Export file STL: Chọn mô hình của bạn, sau đó xuất dưới định dạng STL
          từ menu Export.
        </ListItem>
      </UnorderedList>

      <Text mb={4}>
        Học cách sử dụng Spline qua các bài hướng dẫn tại:{" "}
        <Link href="https://docs.spline.design/" isExternal color="teal.300">
          Tài liệu của Spline
        </Link>{" "}
        hoặc xem video dưới đây để biết cách tạo các hình ảnh 3D cơ bản với
        Spline:
      </Text>

      <AspectRatio maxW="560px" ratio={16 / 9} mb={4}>
        <iframe
          src="https://www.youtube.com/embed/cdru3Ibj8Eg"
          title="Spline Design Tutorial"
          allowFullScreen
        />
      </AspectRatio>

      <Text mb={4}>
        Video này hướng dẫn tạo các hình ảnh và mô hình 3D cơ bản:{" "}
        <Link
          href="https://www.youtube.com/watch?v=cdru3Ibj8Eg&list=PLwgd2h1X_NbsbKfS0t23VHWhhbPZrJlD_"
          isExternal
          color="teal.300"
        >
          Spline 3D Design Tutorial
        </Link>
      </Text>

      <Heading
        mt="40px"
        fontSize="24px"
        fontFamily="Montserrat"
        as="h2"
        size="lg"
        mb={3}
      >
        3. Các công cụ khác hỗ trợ chỉnh sửa file STL
      </Heading>

      <Text mb={4}>
        Ngoài Blender và Spline, bạn còn có thể sử dụng nhiều công cụ khác để
        chỉnh sửa file STL. Dưới đây là một vài công cụ nổi bật:
      </Text>

      <UnorderedList mb={4}>
        <ListItem>
          <Link href="https://www.tinkercad.com/" isExternal color="teal.300">
            Tinkercad
          </Link>{" "}
          - Công cụ thiết kế 3D đơn giản, lý tưởng cho người mới bắt đầu.{" "}
          <Link
            href="https://www.youtube.com/watch?v=gykpjR8tmIY"
            isExternal
            color="teal.300"
          >
            Video hướng dẫn sử dụng Tinkercad
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.meshmixer.com/" isExternal color="teal.300">
            Meshmixer
          </Link>{" "}
          - Phần mềm chỉnh sửa STL mạnh mẽ của Autodesk.{" "}
          <Link
            href="https://www.youtube.com/watch?v=wP_4oKQsmis"
            isExternal
            color="teal.300"
          >
            Video hướng dẫn sử dụng Meshmixer
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://3dslash.net/" isExternal color="teal.300">
            3D Slash
          </Link>{" "}
          - Công cụ trực tuyến với giao diện đơn giản và dễ dùng.{" "}
          <Link
            href="https://www.youtube.com/watch?v=VYZcTSP2z7s"
            isExternal
            color="teal.300"
          >
            Video hướng dẫn sử dụng 3D Slash
          </Link>
        </ListItem>
      </UnorderedList>

      <Text mb={4}>
        Mỗi công cụ đều có ưu điểm riêng, và tùy thuộc vào nhu cầu của bạn, bạn
        có thể lựa chọn công cụ phù hợp để chỉnh sửa và tạo file STL theo ý
        muốn.
      </Text>

      <Heading
        mt="40px"
        fontSize="24px"
        fontFamily="Montserrat"
        as="h2"
        size="lg"
        mb={3}
      >
        4. Các trang web cung cấp file STL 3D miễn phí và trả phí
      </Heading>

      <Text mb={4}>
        Nếu bạn không muốn tự tạo file 3D từ đầu, hoặc bạn cần các mô hình có
        sẵn để sử dụng ngay, dưới đây là một số trang web nổi tiếng nơi bạn có
        thể tải file STL miễn phí hoặc trả phí.
      </Text>

      <UnorderedList mb={4}>
        <ListItem>
          <Link href="https://www.thingiverse.com/" isExternal color="teal.300">
            Thingiverse
          </Link>{" "}
          - Một trong những kho lưu trữ file STL lớn nhất và miễn phí cho mọi
          người. Thingiverse cung cấp hàng ngàn mô hình 3D có sẵn mà bạn có thể
          tải về và in 3D.
        </ListItem>
        <ListItem>
          <Link href="https://www.cgtrader.com/" isExternal color="teal.300">
            CGTrader
          </Link>{" "}
          - Trang web thương mại nơi bạn có thể mua các file 3D chất lượng cao,
          ngoài ra còn có cả các file STL miễn phí.
        </ListItem>
        <ListItem>
          <Link
            href="https://www.myminifactory.com/"
            isExternal
            color="teal.300"
          >
            MyMiniFactory
          </Link>{" "}
          - Một trang web tập trung vào các mô hình cho in 3D với hàng ngàn file
          STL miễn phí và trả phí từ các nhà thiết kế chuyên nghiệp.
        </ListItem>
        <ListItem>
          <Link href="https://www.turbosquid.com/" isExternal color="teal.300">
            TurboSquid
          </Link>{" "}
          - Cung cấp file 3D chất lượng cao, bao gồm cả file STL. Đây là nơi lý
          tưởng cho những ai cần các mô hình chi tiết cho dự án của mình.
        </ListItem>
        <ListItem>
          <Link href="https://cults3d.com/en" isExternal color="teal.300">
            Cults3D
          </Link>{" "}
          - Một nền tảng chia sẻ file STL với nhiều mô hình đẹp, dễ dàng tìm
          kiếm và tải về cho các mục đích cá nhân hoặc thương mại.
        </ListItem>
      </UnorderedList>

      <Text mb={4}>
        Các trang web này cung cấp nhiều mô hình khác nhau, từ đơn giản đến phức
        tạp, và rất nhiều trong số chúng hoàn toàn miễn phí. Đây là nguồn tài
        nguyên tuyệt vời nếu bạn muốn nhanh chóng có file STL để sử dụng hoặc in
        3D.
      </Text>

      <Heading
        mt="40px"
        fontSize="24px"
        fontFamily="Montserrat"
        as="h2"
        size="lg"
        mb={3}
      >
        5. Spline tại trang web của chúng tôi
      </Heading>

      <Text mb={4}>
        Bạn có thể sử dụng Spline trực tiếp tại trang web của chúng tôi nhờ vào
        tính năng nhúng tuyệt vời của Spline
      </Text>
    </Box>
  );
};
