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

V9 - RECALL MEMORY ENGINE / PHÂN TÍCH NGƯỜI HỌC
--------------------------------------------------
- Thêm Recall Lab: phân tích chi tiết theo từng kỹ năng, từng mục học và từng lỗi.
- Ghi lại: đúng/sai, đáp án đã chọn, đáp án đúng, dạng kỹ năng, thời gian trả lời, số lần quên lại (lapse), streak và lịch ôn tiếp theo.
- Flashcard từ vựng, Kanji từ mới và 218 Kanji có 4 mức tự đánh giá: Quên / Khó / Nhớ / Rất chắc.
- Trắc nghiệm N5, Kanji Hard, N4 Quiz, 218 Kanji SUPER HARD và đọc hiểu đều đẩy dữ liệu vào cùng một mô hình trí nhớ.
- Recall Lab có:
  + Retention ước tính, số mục đến hạn, accuracy 7 ngày, tốc độ recall.
  + Ma trận kỹ năng: từ vựng, ngữ pháp, đọc hiểu, mặt chữ Kanji, nghĩa, On/Kun, đọc/viết N4...
  + Bản đồ nhầm lẫn: đáp án sai -> đáp án đúng và số lần lặp.
  + Recall Queue: ưu tiên mục đến hạn / vừa sai / accuracy thấp / recall chậm / lapse cao.
  + Chi tiết từng mục: lịch sử trả lời, strength, stage, retention, cặp nhầm và lịch ôn tiếp.
  + Kế hoạch ôn theo spaced recall: khoảng 10 phút -> 1 ngày -> 3 ngày -> 7 ngày -> 14 -> 30 -> 60 -> 120 ngày; lịch co lại khi sai và giãn ra khi recall chắc.
- Phiên ôn trong Recall Lab dùng ACTIVE RECALL: không hiện đáp án A/B/C trước. Người học tự gọi đáp án ra trước, sau đó mới lật đáp án và chấm mức nhớ.
- Dữ liệu phân tích lưu bằng localStorage trên chính trình duyệt/thiết bị; có nút xuất JSON để sao lưu.


V10 - TRẮC NGHIỆM TỪ VỰNG TOÀN BÀI
-----------------------------------
- Trong mục "Từ vựng" của mỗi Bài 1–25 có 2 chế độ:
  1) Danh sách từ.
  2) Trắc nghiệm toàn bài.
- Một lượt "Trắc nghiệm toàn bài" bắt buộc kiểm tra 100% mục từ của bài:
  số câu cơ bản = đúng số mục từ của bài.
- Chế độ "Trộn thông minh" luân phiên:
  Nhật -> nghĩa Việt;
  nghĩa Việt -> từ Nhật;
  Kanji/từ Nhật -> cách đọc.
- Với từ chỉ viết Kana, hệ thống tự đổi câu đọc sang dạng nghĩa để tránh câu hỏi lộ đáp án.
- Đáp án sai chỉ lấy từ CHÍNH BÀI đang học.
- Khi bật "Bẫy khó", đáp án sai được ưu tiên theo:
  nghĩa gần;
  cùng nhóm nghĩa;
  mặt chữ gần;
  cách đọc gần;
  và lịch sử người học từng chọn sai.
- Kết thúc lượt học hiển thị:
  số từ đã kiểm tra / tổng số từ;
  số từ sai;
  độ chính xác;
  nút luyện lại riêng các từ sai.
- Mỗi câu được ghi vào Recall Memory Engine với:
  hướng recall;
  đáp án sai -> đáp án đúng;
  thời gian phản hồi;
  số lần sai/lapse.
  Vì vậy cặp từ từng nhầm sẽ được ưu tiên làm bẫy trong những lần sau.


V11 - SOÁT LẠI TOÀN BỘ TỪ VỰNG N5 THEO PDF
--------------------------------------------
- Phát hiện dữ liệu V3-V10 bị lỗi OCR ghép dòng/cột ở nhiều bài.
- Bài 1 được đối chiếu và giữ dữ liệu đã đúng.
- Bài 2–25 được dựng lại mảng từ vựng theo mục "I. Từ vựng" của PDF người dùng cung cấp.
- Sửa đồng thời:
  * từ Nhật/Kanji bị dính nhiều mục thành một;
  * kana bị OCR sai;
  * nghĩa Việt bị lệch sang dòng khác;
  * những mục bị mất do OCR;
  * các câu hội thoại/từ tham khảo bị gán nhầm nghĩa.
- Flashcard, trắc nghiệm từ vựng toàn bài, Kanji theo từ mới và Recall Memory
  đều đọc trực tiếp từ data.js nên tự động dùng bộ từ V11 đã sửa.


V12 - KANJI THEO ĐÚNG HÀNG/BÀI TRONG ẢNH
-----------------------------------------
Cấu trúc 218 chữ:
- #1–10: Nhóm đầu bảng (ô bài trong ảnh để trống)
- #11–26: 2課
- #27–42: 4課
- #43–58: 6課
- #59–74: 8課
- #75–90: 10課
- #91–106: 12課
- #107–122: 14課
- #123–138: 16課
- #139–154: 18課
- #155–170: 20課
- #171–186: 22課
- #187–202: 24課
- #203–218: Nhóm cuối bảng (ô bài trong ảnh để trống)

TÍNH NĂNG
- Chọn 1 hoặc nhiều bài/hàng cùng lúc.
- Flashcard hiển thị nhóm, nghĩa, On/Kun, ví dụ đã học.
- Tự đối chiếu online số nét + On/Kun với KANJIDIC2 qua KanjiAPI khi có Internet.
- "Tìm thêm từ online": truy vấn JMdict qua KanjiAPI và chỉ giữ từ có Kanji
  nằm trong phạm vi đã học tới bài cao nhất đang chọn.
- Nếu từ online khớp dữ liệu Minna/Dũng Mori thì hiển thị nghĩa Việt cục bộ;
  nếu chưa có bản dịch Việt đã kiểm chứng, web giữ nghĩa tiếng Anh từ JMdict.
- Trắc nghiệm theo một hoặc nhiều bài:
  mặt chữ/nét, nghĩa, Onyomi, Kunyomi, đọc từ, hoặc trộn.
- "Toàn bộ" kiểm tra mỗi Kanji đã chọn một lần.
- Ghép chữ khó:
  hiển thị cách đọc + nghĩa, người học chọn tile Kanji theo đúng thứ tự;
  tile nhiễu ưu tiên chữ gần nét.
- Lỗi quiz/ghép chữ tiếp tục được ghi vào Recall Memory Engine.

ĐỐI CHIẾU NGHĨA V12
- Sửa cách diễn đạt một số nghĩa quá máy móc ở bộ 218:
  画, 語, 目, 品, 明, 答, 配, 料, 理, 仕, 者, 堂, 用, 図, 写, 真,
  林, 考, 親, 切, 験, 歳, 留, 散, 浴, 降, 欲.
- 半: Kunyomi hiển thị "なかば".


V13 - TRẮC NGHIỆM TỪ VỰNG THEO BÀI
------------------------------------
- Có menu riêng "Từ vựng Quiz".
- Chọn 1 bài, nhiều bài, Bài 1–5, Bài 1–10 hoặc tất cả 25 bài.
- Chế độ mặc định: kiểm tra 100% từ của từng bài đã chọn.
- Có thêm:
  * chỉ luyện những từ Recall Lab đang đánh dấu sai/yếu;
  * luyện nhanh 20 câu;
  * luyện nhanh 50 câu.
- Kiểu câu:
  * Nhật -> nghĩa Việt;
  * nghĩa Việt -> từ Nhật;
  * Kanji/từ Nhật -> cách đọc;
  * trộn thông minh cả 3.
- Đáp án sai luôn ưu tiên từ cùng bài với câu hỏi.
- Khi bật "Bẫy dễ nhầm", hệ thống dùng:
  * nghĩa gần / cùng nhóm nghĩa;
  * cách đọc gần;
  * mặt chữ gần;
  * đáp án mà người học từng chọn nhầm trước đó.
- Khi luyện nhiều bài, câu của Bài X vẫn lấy bẫy từ Bài X.
- Kết quả hiển thị điểm riêng từng bài và cho luyện lại riêng các từ sai.
- Tất cả câu trả lời tiếp tục ghi vào Recall Memory Engine.
