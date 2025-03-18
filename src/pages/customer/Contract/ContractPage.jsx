import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { FiDownload } from "react-icons/fi";
import { useExportToDoc } from "html-to-doc-react";

export default function ContractPage() {
  const exportToDoc = useExportToDoc(
    null,
    "contract-template",
    "hop-dong-mau.doc"
  );

  return (
    <Box
      bg="white"
      borderRadius="10px"
      p={5}
      boxShadow="md"
      position="relative"
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
      <div
        id="contract-template"
        style={{ fontFamily: "Times New Roman, serif", fontSize: "20px" }}
      >
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
        <p style={{ textAlign: "center", marginTop: "10px" }}>Số: […]</p>
        <p style={{ marginTop: "10px" }}>Bộ luật dân sự 2015;</p>
        <p style={{ marginTop: "10px" }}>Luật thương mại 2005</p>
        <p style={{ marginTop: "10px" }}>
          Căn cứ Luật giao dịch điện tử số 51/2005/QH11 ngày 29/11/2005
        </p>
        <p style={{ marginTop: "10px" }}>
          Hợp Đồng này được ký ngày […] tháng […] năm […] giữa:
        </p>
        <p style={{ fontWeight: "bold", marginTop: "10px" }}>
          Bên Cung Cấp Dịch Vụ: [...]
        </p>
        <p style={{ marginTop: "10px" }}>Địa chỉ: […]</p>
        <p style={{ marginTop: "10px" }}>Điện thoại: […]</p>
        <p style={{ marginTop: "10px" }}>Đại diện bởi: […]</p>
        <p style={{ marginTop: "10px" }}>Sau đây được gọi là “Bên A”.</p>
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Bên Thuê Dịch Vụ: [...]
        </p>
        <p style={{ marginTop: "10px" }}>Địa chỉ: […]</p>
        <p style={{ marginTop: "10px" }}>Điện thoại: […]</p>
        <p style={{ marginTop: "10px" }}>Đại diện bởi: […]</p>
        <p style={{ marginTop: "10px" }}>Sau đây được gọi là “Bên B”.</p>
        <p style={{ marginTop: "10px" }}>
          Bên A và Bên B (sau đây gọi riêng là “Bên” và gọi chung là “Các Bên”)
          đồng ý ký kết Hợp đồng dịch vụ (“Hợp Đồng”) với những điều khoản như
          sau:
        </p>
        <p style={{ marginTop: "10px" }}>Điều 1. Đối tượng của Hợp Đồng</p>
        <p style={{ marginTop: "10px" }}>
          Bên A cung cấp các Dịch vụ sau (“Dịch vụ”) cho Bên B theo những điều
          khoản và điều kiện của Hợp Đồng này.
        </p>
        <p style={{ marginTop: "10px" }}>
          [Ghi rõ phạm vi của Dịch vụ với những mục sau:
        </p>
        <p style={{ marginTop: "10px" }}>- Tên của Dịch vụ : […]</p>
        <p style={{ marginTop: "10px" }}>
          - Nơi thực hiện : Bên A cung cấp Dịch vụ trực tiếp tại nơi làm việc
        </p>
        <p style={{ marginTop: "10px" }}>
          - Nhiệm vụ : nhiệm vụ của Bên A là theo dõi tiến độ và kịp thời cung
          cấp phản hồi cho bên B.
        </p>
        <p style={{ marginTop: "10px" }}>
          - Lịch trình, chi tiết và phí Dịch vụ được quy định trong Phụ Lục.]
        </p>
        <p style={{ marginTop: "10px" }}>Điều 2. Cam kết của bên A</p>
        <p style={{ marginTop: "10px" }}>
          2.1 Bên A cam kết sẽ hoàn thành dịch vụ vào ngày […] nếu bên B hoàn
          thành nghĩa vụ thanh toán theo từng giai đoạn với tổng số tiền cần
          phải thanh toán là […].
        </p>
        <p style={{ marginTop: "10px" }}>
          2.2 Bên A sẽ chịu trách nhiệm bảo hành dịch vụ theo chính sách:
        </p>
        <p style={{ marginTop: "10px" }}>[…]</p>
        <p style={{ marginTop: "10px" }}>
          Điều 3. Thông tin và tài liệu cung cấp cho việc thực hiện Dịch vụ.
        </p>
        <p style={{ marginTop: "10px" }}>
          3.1 Bên B cung cấp cho Bên A thông tin, tài liệu cần thiết cho việc
          thực hiện Dịch vụ.
        </p>
        <p style={{ marginTop: "10px" }}>
          3.2 Bên A lưu giữ những tài liệu được cung cấp trong suốt thời hạn của
          Hợp đồng này và hoàn lại cho Bên B những tài liệu này sau khi hoàn
          thành Dịch vụ hoặc theo yêu cầu của Bên B.
        </p>
        <p style={{ marginTop: "10px" }}>Điều 4. Đăng ký Dịch vụ</p>
        <p style={{ marginTop: "10px" }}>
          Bên A đăng ký Dịch vụ với cơ quan nhà nước có thẩm quyền bằng chi phí
          của Bên A nếu như Dịch vụ phải đăng ký theo quy định của pháp luật
          trước khi thực hiện.
        </p>
        <p style={{ marginTop: "10px" }}>
          Điều 5. Trách nhiệm do vi phạm Hợp Đồng
        </p>
        <p style={{ marginTop: "10px" }}>
          Nếu một Bên vi phạm Hợp đồng này, Bên bị vi phạm sẽ gửi văn bản yêu
          cầu Bên vi phạm khắc phục. Nếu Bên vi phạm không khắc phục hoặc không
          thể khắc phục vi phạm đó trong thời theo yêu cầu của Bên bị vi phạm kể
          từ ngày nhận được thông báo của Bên bị vi phạm, Bên vi phạm phải chịu
          phạt 8% giá trị phần nghĩa vụ Hợp Đồng bị vi phạm và chịu trách nhiệm
          bồi thường cho Bên bị vi phạm những thiệt hại thực tế, trực tiếp phát
          sinh do hành vi của Bên vi phạm.
        </p>
        <p style={{ marginTop: "10px" }}>Điều 6. Quyền sở hữu trí tuệ</p>
        <p style={{ marginTop: "10px" }}>
          [Lựa chọn 1: Trong trường hợp quyền sở hữu trí tuệ liên quan đến Dịch
          vụ không thuộc về Bên B]
        </p>
        <p style={{ marginTop: "10px" }}>
          6.1 Bên A bảo vệ, cam kết bồi thường và đảm bảo cho Bên B trước bất kỳ
          khiếu nại nào từ bên thứ ba vì lý do Dịch vụ vi phạm bằng sáng chế,
          nhãn hiệu, bản quyền hoặc bất kỳ quyền sở hữu trí tuệ nào của bên thứ
          ba đó.
        </p>
        <p style={{ marginTop: "10px" }}>
          6.2 Điều khoản này vẫn có hiệu lực kể cả sau khi Hợp Đồng này hết hạn
          hoặc chấm dứt.
        </p>
        <p style={{ marginTop: "10px" }}>
          [Lựa chọn 2: Trong trường hợp quyền sở hữu trí tuệ liên quan đến Dịch
          vụ thuộc về Bên B]
        </p>
        <p style={{ marginTop: "10px" }}>
          6.1 Quyền sở hữu trí tuệ liên quan đến Dịch vụ thuộc quyền sở hữu/sử
          dụng hợp pháp của Bên B.
        </p>
        <p style={{ marginTop: "10px" }}>
          6.2 Bên A chỉ sử dụng quyền sở hữu trí tuệ thuộc quyền sở hữu/ sử dụng
          hợp pháp của Bên B cho mục đích thực hiện Dịch vụ của Hợp Đồng này và
          chịu trách nhiệm với bất kỳ vi phạm nào liên quan.
        </p>
        <p style={{ marginTop: "10px" }}>
          6.3 Điều khoản này vẫn có hiệu lực kể cả sau khi Hợp Đồng này hết hạn
          hoặc chấm dứt.
        </p>
        <p style={{ marginTop: "10px" }}>Điều 7. Bảo mật</p>
        <p style={{ marginTop: "10px" }}>
          Mỗi Bên sẽ không tiết lộ bất cứ thông tin nào liên quan đến Hợp Đồng
          này hoặc của Bên còn lại cho bất cứ bên thứ ba nào mà không có sự đồng
          ý trước bằng văn bản của Bên còn lại, trừ trường hợp pháp luật có quy
          định khác. Mỗi Bên cam kết có biện pháp phù hợp để đảm bảo rằng những
          nhân viên có liên quan của mình cũng tuân thủ quy định này và sẽ chịu
          trách nhiệm trong trường hợp có bất cứ hành vi nào vi phạm quy định
          này. Điều khoản này sẽ vẫn có hiệu lực kể cả sau khi Hợp Đồng này hết
          hạn hoặc chấm dứt.
        </p>
        <p style={{ marginTop: "10px" }}>Điều 8. Bất khả kháng</p>
        <p style={{ marginTop: "10px" }}>
          8.1 Bất khả kháng là những sự kiện khách quan nằm ngoài sự kiểm soát
          của các bên bao gồm nhưng không giới hạn ở: động đất, bão, lũ lụt, gió
          lốc, sóng thần, lở đất, hỏa hoạn, chiến tranh hay đe dọa chiến tranh…
          hoặc các thảm họa khác không thể lường trước được; hoặc sự thay đổi
          của luật pháp bởi chính quyền Việt Nam.
        </p>
        <p style={{ marginTop: "10px" }}>
          8.2 Khi một bên không thể thực hiện tất cả hay một phần của nghĩa vụ
          Hợp đồng do sự kiện bất khả kháng gây ra một cách trực tiếp, Bên này
          sẽ không được xem là vi phạm Hợp đồng nếu đáp ứng được tất cả những
          điều kiện sau:
        </p>
        <p style={{ marginTop: "10px" }}>
          8.2.1 Bất khả kháng là nguyên nhân trực tiếp của sự gián đoạn hoặc trì
          hoãn việc thực hiện nghĩa vụ; và
        </p>
        <p style={{ marginTop: "10px" }}>
          8.2.2 Bên bị gặp phải sự kiện bất khả kháng đã nỗ lực để thực hiện
          nghĩa vụ của mình và giảm thiểu thiệt hại gây ra cho Bên kia bởi sự
          kiện bất khả kháng; và
        </p>
        <p style={{ marginTop: "10px" }}>
          8.2.3 Tại thời điểm xảy ra sự kiện bất khả kháng, bên gặp phải sự kiện
          bất khả kháng kháng phải thông báo ngay cho bên kia cũng như cung cấp
          văn bản thông báo và giải thích về lý do gây ra sự gián đoạn hoặc trì
          hoãn thực hiện nghĩa vụ.
        </p>
        <p style={{ marginTop: "10px" }}>
          Điều 9. Quyền và nghĩa vụ của Các Bên
        </p>
        <p style={{ marginTop: "10px" }}>9.1 Quyền và nghĩa vụ của Bên A:</p>
        <p style={{ marginTop: "10px" }}>
          9.1.1. Cung ứng các dịch vụ và thực hiện những công việc có liên quan
          một cách đầy đủ, phù hợp với thoả thuận và theo quy định của pháp
          luật.
        </p>
        <p style={{ marginTop: "10px" }}>
          9.1.2. Giữ bí mật về thông tin mà mình biết được trong quá trình cung
          ứng dịch vụ nếu có thoả thuận hoặc pháp luật có quy định.
        </p>
        <p style={{ marginTop: "10px" }}>
          9.1.3. Trừ trường hợp có thoả thuận khác, Bên A phải nỗ lực cao nhất
          để thực hiện nghĩa vụ cung ứng dịch vụ và khả năng cao nhất.
        </p>
        <p style={{ marginTop: "10px" }}>
          9.1.4. Hoàn thành dịch vụ đúng thời hạn đã thoả thuận trong Hợp Đồng.
        </p>
        <p style={{ marginTop: "10px" }}>9.2 Quyền và nghĩa vụ của Bên B:</p>
        <p style={{ marginTop: "10px" }}>
          9.2.1. Thanh toán tiền cung ứng dịch vụ như đã thoả thuận trong Hợp
          Đồng.
        </p>
        <p style={{ marginTop: "10px" }}>
          9.2.2. Cung cấp kịp thời các kế hoạch, chỉ dẫn và những chi tiết khác
          để việc cung ứng dịch vụ được thực hiện không bị trì hoãn hay gián
          đoạn;
        </p>
        <p style={{ marginTop: "10px" }}>
          9.2.3. Hợp tác trong tất cả những vấn đề cần thiết khác để Bên A có
          thể cung ứng dịch vụ một cách thích hợp;
        </p>
        <p style={{ marginTop: "10px" }}>
          Điều 10. Hiệu lực và chấm dứt Hợp đồng
        </p>
        <p style={{ marginTop: "10px" }}>
          10.1 Hợp Đồng này có hiệu lực từ ngày ký đến hết ngày bảo hành của sản
          phẩm
        </p>
        <p style={{ marginTop: "10px" }}>
          10.2 Hợp Đồng này sẽ chấm dứt trước thời hạn trong những trường hợp
          sau:
        </p>
        <p style={{ marginTop: "10px" }}>
          10.2.1. Nếu các bên đồng ý chấm dứt bằng văn bản.
        </p>
        <p style={{ marginTop: "10px" }}>
          10.2.2. Nếu bất cứ vi phạm Hợp đồng nào không được khắc phục trong
          thời hạn 14 ngày kể từ ngày nhận được yêu cầu khắc phục từ Bên không
          vi phạm. Trong trường hợp này, Bên không vi phạm có quyền đơn phương
          chấm dứt Hợp đồng bằng cách gửi văn bản thông báo cho Bên vi phạm.
        </p>
        <p style={{ marginTop: "10px" }}>
          10.2.3. Nếu sự kiện bất khả kháng kéo dài quá 14 ngày kể từ ngày phát
          sinh, Hợp Đồng này có thể được chấm dứt dựa trên văn bản thông báo của
          một Bên cho Bên còn lại.
        </p>
        <p style={{ marginTop: "10px" }}>Điều 11. Giải quyết tranh chấp</p>
        <p style={{ marginTop: "10px" }}>
          Trong trường hợp có bất cứ mâu thuẫn nào phát sinh từ Hợp Đồng này,
          Các Bên sẽ ưu tiên giải quyết vấn đề bằng thương lượng. Nếu không thể
          giải quyết được trong vòng 30 ngày, vấn đề sẽ được giải quyết bởi
          Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) theo quy tắc tố tụng của
          Trung tâm này, địa điểm tiến hành giải quyết bằng trọng tài là thành
          phố Hồ Chí Minh. Bên thua kiện phải thanh toán tất cả các chi phí liên
          quan đến việc giải quyết tranh chấp cho Bên thắng kiện (bao gồm cả chi
          phí luật sư).
        </p>
        <p style={{ marginTop: "10px" }}>Điều 12. Điều khoản chung</p>
        <p style={{ marginTop: "10px" }}>
          12.1 Hợp Đồng này được điều chỉnh và giải thích theo pháp luật Việt
          Nam.
        </p>
        <p style={{ marginTop: "10px" }}>
          12.2 Mọi sửa đổi hoặc bổ sung Hợp Đồng đều phải được lập thành văn bản
          và ký duyệt bởi người có thẩm quyền của mỗi Bên.
        </p>
        <p style={{ marginTop: "10px" }}>
          12.3 Mỗi Bên không được phép chuyển giao bất cứ quyền, nghĩa vụ nào
          trong Hợp Đồng này cho bất cứ bên thứ ba nào mà không được sự chấp
          thuận trước bằng văn bản của Bên còn lại.
        </p>
        <p style={{ marginTop: "10px" }}>
          12.4 Hợp Đồng này sẽ được lập thành 2 bản có giá trị như nhau, mỗi Bên
          giữ 1 bản để thực hiện.
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
          </div>
          <div>
            <p>ĐẠI DIỆN BÊN B</p>
          </div>
        </div>
      </div>
    </Box>
  );
}
