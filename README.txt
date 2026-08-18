NIHONGO N5 - 25 BÀI • V3

CÁCH CHẠY
1. Giải nén thư mục.
2. Mở file index.html bằng Chrome / Edge / Firefox.
3. Không cần cài server, framework hay thư viện.

TÍNH NĂNG
- 25 bài theo lộ trình Minna no Nihongo Sơ cấp I.
- Flashcard từ vựng: Kana lớn + Kanji (nếu có) + romaji + nghĩa Việt.
- Lật thẻ bằng chuột/chạm hoặc phím Space; đổi thẻ bằng phím ← →.
- Đánh dấu từng flashcard đã nhớ, lưu bằng localStorage.
- Từ vựng có ô tìm theo Kanji, Kana, romaji hoặc nghĩa tiếng Việt.
- Kanji, ngữ pháp, trắc nghiệm từng bài.
- Đọc hiểu + câu hỏi.
- Rê chuột/chạm vào từ tiếng Nhật trong bài đọc để xem nghĩa tiếng Việt.
- Luyện tập tổng hợp: chọn bài 1, 2, 3... nhiều bài hoặc chọn tất cả 25 bài.
- Lưu tiến độ học trên trình duyệt.

NGUỒN TỪ VỰNG V3
- Bộ dữ liệu placeholder cũ đã được thay bằng dữ liệu trích và đối chiếu từ file PDF người dùng cung cấp:
  “Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2”.
- Website hiện có 944 mục từ / biểu đạt trong 25 bài.
- Mỗi bài trong data.js có sourcePages để ghi lại trang PDF đã dùng làm nguồn.
- Kana / Kanji được chuẩn hoá cho việc hiển thị trên web; một số mục có ngữ cảnh hoặc cách viết bổ sung để thuận tiện học flashcard.

LƯU Ý
- PDF nguồn không được đóng gói trong website.
- Phần “Kanji” riêng, ngữ pháp luyện tập, trắc nghiệm và bài đọc của website là nội dung phục vụ học/luyện tập; không phải bản sao nguyên trang sách.
- Nếu muốn kiểm tra/chỉnh một mục từ, tìm lesson trong data.js. Mỗi từ có các trường:
  jp       : chữ Nhật/Kanji
  kana     : cách viết Kana
  reading  : romaji
  vi       : nghĩa tiếng Việt

FLASHCARD UI V3
- Sửa hoàn toàn lỗi chữ Nhật bị xếp dọc/tách từng ký tự.
- Mặt trước ưu tiên Kana lớn (ví dụ: わたし), Kanji phía dưới (私), romaji nhỏ.
- Mặt sau hiển thị nghĩa tiếng Việt rõ ràng.
- Nguồn/trang PDF hiển thị bằng chip nhỏ phía trên thẻ, không chiếm diện tích flashcard.
- Nút Trước / Đánh dấu đã nhớ / Tiếp nằm tách khỏi thẻ, không chồng nội dung.
- Responsive cho desktop và điện thoại.


V4 - KANJI FLASHCARD
- Mục Kanji không còn dùng danh sách Kanji rời.
- Tự lọc các từ mới có chữ Hán từ vocab của từng bài và tạo flashcard.
- Mặt trước: từ viết bằng Kanji. Mặt sau: Kana, romaji, nghĩa Việt.
- Có nút đánh dấu đã nhớ và hỗ trợ phím ← → / Space.
- Luyện tập tổng hợp Kanji cũng chuyển sang flashcard từ mới có Kanji.


V5: Trắc nghiệm đã được sửa để mọi đáp án nhiễu của mỗi câu chỉ lấy từ chính bài chứa câu hỏi đó. Khi luyện nhiều bài, câu thuộc bài nào sẽ dùng lựa chọn của bài đó.


V6 - LUYỆN KANJI KHÓ
--------------------
- Trong mục Kanji của từng bài có 2 chế độ: Kanji Flashcard và Luyện Kanji khó.
- Luyện Kanji khó gồm 3 dạng:
  1) Chọn đúng mặt chữ; đáp án nhiễu ưu tiên thay 1-2 nét bằng chữ Hán gần hình.
  2) Chọn nghĩa; đáp án sai ưu tiên nghĩa gần nhau trong chính bài.
  3) Chọn cách đọc; đáp án sai ưu tiên các cách đọc gần giống trong chính bài.
- Ở Luyện tập tổng hợp có thêm nút "Luyện Kanji khó" cho các bài đã chọn.
- Lưu ý: ở câu bẫy mặt chữ, một số phương án sai được tạo để luyện phân biệt nét
  và có thể không phải là một từ vựng thật trong bài.


V7 - THÊM TRẮC NGHIỆM N4 TỪ 2 PDF
-----------------------------------
1) Gokaku N4:
- 151 câu.
- 問題1: 86 câu chọn cách đọc Kanji.
- 問題2: 65 câu chọn cách viết Kanji.
- Có thể chọn 10 / 20 / 50 / tất cả.
- Làm sai có thể luyện lại riêng các câu sai.

2) Dũng Mori N4:
- 142 mục Kanji/từ vựng được đưa vào bộ ôn.
- Website tạo 3 dạng: Kanji -> cách đọc, Kanji -> nghĩa Việt, Kana -> Kanji.
- Dùng làm phần đối chiếu khi trả lời các câu Gokaku có mục tương ứng.

Lưu ý:
- Gokaku là câu hỏi từ PDF người dùng cung cấp.
- Bộ Dũng Mori là câu hỏi do website sinh từ bảng tổng hợp, không phải câu hỏi nguyên văn.


V8 - 218 KANJI TỪ ẢNH 提出漢字一覧
----------------------------------
- Thêm 218 Kanji theo đúng thứ tự trong ảnh người dùng cung cấp.
- Phân loại theo số nhỏ của bảng: 4=N5, 3=N4, 2=N3 tương đương.
- Flashcard: nghĩa Việt, Onyomi chính, Kunyomi chính, ví dụ ưu tiên dữ liệu N5/N4 đang có.
- Danh sách có tìm kiếm và lọc N5/N4/N3≈.
- Chế độ Siêu khó gồm: bẫy mặt chữ 1-2 nét, nghĩa cùng nhóm, Onyomi/Kunyomi gần âm, đọc từ ví dụ.
- Có đánh dấu Kanji đã nhớ và luyện lại riêng câu sai.
