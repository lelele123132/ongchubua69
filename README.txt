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


V14 - NIGHT MODE
----------------
- Thêm nút Night Mode trực tiếp trên thanh điều hướng.
- Chuyển Sáng / Tối tức thời.
- Lưu lựa chọn bằng localStorage với key nihongoThemeV14.
- Nếu người dùng chưa từng chọn, web tự theo prefers-color-scheme của hệ điều hành.
- Có script trong <head> để áp theme trước khi render, giảm hiện tượng chớp nền trắng.
- Dark theme áp dụng cho:
  trang chủ, bài học, Flashcard, Từ vựng Quiz, Recall Lab,
  N4 Quiz, Kanji theo bài, trắc nghiệm Kanji, ghép chữ và các form.


V15 - BÀI TẬP NGỮ PHÁP ĐA DẠNG
--------------------------------
- Bài 1–25 đều có Lý thuyết / Bài tập ngữ pháp.
- Tổng ngân hàng hiện tại khoảng 654 câu sinh từ dữ liệu ngữ pháp hiện có.
- Mỗi bài khoảng 21–27 câu.
- 9 dạng: Mẫu->nghĩa, Nghĩa->mẫu, Nhận dạng câu, Nhật->Việt,
  Việt->Nhật, Điền trợ từ, Bẫy trợ từ, Hoàn thành cấu trúc, Sắp xếp câu.
- Cơ bản / Nâng cao / Trộn tất cả.
- 12 / 24 / toàn bộ.
- Luyện riêng từng mẫu và luyện lại riêng câu sai.
- Kết quả được ghi vào Recall Memory theo từng loại lỗi ngữ pháp.


V16 - N4 KANJI BỔ SUNG + TỐI ƯU LAG
------------------------------------
N4:
- Thêm nguồn riêng "8 Kanji vừa học":
  貸・借・送・強・勉・旅・室・登
- Từ/ví dụ:
  貸す かす = cho mượn
  借りる かりる = mượn
  送る おくる = gửi
  強い つよい = mạnh
  勉強する べんきょうする = học
  旅行する りょこうする = đi du lịch
  教室 きょうしつ = lớp/phòng học
  登る のぼる = leo
- Có thẻ xem On/Kun + ví dụ và quiz đọc/nghĩa/viết.

Tối ưu:
- Cache Recall model trong lúc sinh bộ câu hỏi từ vựng lớn.
- Không còn JSON.parse localStorage lặp lại cho từng đáp án nhiễu.
- Tóm tắt "từ Recall yếu/sai" được cache, không quét 25 bài mỗi lần tick.
- Luyện tập tổng hợp -> Từ vựng dùng phân trang 80 dòng.
  Khi chọn toàn bộ 25 bài, browser không còn phải dựng hơn 1000 dòng DOM cùng lúc.
- Tìm kiếm vẫn hoạt động trên toàn bộ dữ liệu rồi chỉ render trang hiện tại.


V17 - HỌC TỪ MỚI KANA-FIRST / KHÔNG KANJI
-------------------------------------------
- Tab Từ vựng có thêm chế độ mặc định: "🌱 Học từ mới • Kana".
- Trong mode này KHÔNG hiển thị Kanji.
- Từ có Kanji chỉ hiển thị cách đọc Kana.
  Ví dụ 学生 -> がくせい.
- Từ vay mượn vẫn giữ Katakana chuẩn:
  コーヒー, テレビ, コンピューター...
- Học theo 3 pha:
  1. Nhìn: Kana + nghĩa Việt.
  2. Active Recall: chỉ Kana, tự nhớ nghĩa rồi mới mở đáp án.
  3. Kiểm tra 2 chiều: Kana -> nghĩa và nghĩa -> Kana.
- 5 / 8 / 10 / 15 từ mỗi phiên, mặc định 10.
- Có TTS tiếng Nhật nếu trình duyệt hỗ trợ.
- Theo dõi trạng thái new / learning / mastered cho từng từ.
- Recall Memory ghi kana-recall / kana-meaning / kana-form.
- Giữ nguyên toàn bộ V16: N4, Kanji, Grammar Practice, Night Mode, tối ưu lag.


V18 - FIX KANA MODE KHÔNG HIỆN
-------------------------------
- Chế độ Kana-first đã được nhúng trực tiếp vào app.js.
- index.html không còn phụ thuộc vào v17kana.js để mode hoạt động.
- Khi mở tab Từ vựng, mặc định vào "🌱 Học từ mới • Kana".
- Có fallback tự chèn nút Kana nếu renderer cũ xuất hiện.
- Thêm card Kana-first ở Trang chủ để người dùng biết tính năng tồn tại.
- Giữ nguyên V16/V17 data, Recall, Grammar, N4, Night Mode.

V19 - TRẮC NGHIỆM TỪ VỰNG KANA-ONLY
- Trắc nghiệm toàn bài: Kana <-> nghĩa Việt.
- Không hỏi Kanji, không reveal Kanji sau khi trả lời.
- Quiz nhiều bài cũng Kana-only.
- Katakana chuẩn vẫn giữ nguyên.


V20 - BÀI TẬP CHIA THỂ て TỪ BÀI 14
------------------------------------
Trong tab Ngữ pháp của Bài 14–25 có thêm:
て Chia thể て

Phạm vi:
- Chỉ bài hiện tại
- Bài 14 -> bài hiện tại
- Toàn bộ Bài 14–25

Dạng bài:
1. Gõ て-form từ ます-form
2. Chọn て-form đúng
3. て-form -> chọn lại ます-form
4. Chọn quy tắc biến đổi
5. Trộn cả 4 dạng

Quy tắc được luyện:
- い・ち・り + ます -> って
- み・び・に + ます -> んで
- き + ます -> いて
- ぎ + ます -> いで
- し + ます -> して
- Nhóm II: bỏ ます + て
- します -> して
- 来ます -> 来て
- 行きます -> 行って (ngoại lệ)

Các trường hợp dễ nhầm đã xử lý:
- 降ります（おります）-> おりて
- 降ります（ふります）-> ふって
- 着ます（きます）-> きて
- 要ります（いります）-> いって
- 足ります（たります）-> たりて

Recall Memory:
te-form-produce / te-form-choice / te-form-reverse / te-form-rule


V21 - SIMPLE て-FORM QUIZ
-------------------------
Theo yêu cầu, phần thể て được rút gọn:
- Chỉ hiện động từ dạng ます.
- Có 4 đáp án.
- Chọn て-form đúng.
- Bấm đáp án -> hiện đúng/sai -> câu tiếp theo.
- Bỏ hoàn toàn:
  gõ đáp án,
  て -> ます,
  chọn quy tắc.
- Vẫn chọn được phạm vi:
  bài hiện tại / Bài 14 -> hiện tại / toàn bộ 14–25.
- Recall Memory vẫn ghi các động từ làm sai.


V22 - て-FORM: ĐÁP ÁN CÙNG MỘT ĐỘNG TỪ
---------------------------------------
Câu hỏi:
のみます → ?

Đáp án:
A. のみて
B. のんで
C. のみって
D. のみいて

Tất cả đáp án đều được sinh từ chính động từ đang hỏi.
Không lấy て-form của động từ khác làm đáp án nhiễu.


V23 - RANDOM VOCAB FLASHCARDS
-----------------------------
- Chọn 1 hoặc nhiều bài.
- Quick select 1–5 / 1–10 / 11–20 / tất cả.
- Random từ của các bài đã chọn.
- Kana -> nghĩa / nghĩa -> Kana / mixed.
- 10 / 20 / 50 / tất cả thẻ.
- Không dùng Kanji.
- Bấm thẻ để lật.
- Chọn Quên / Nhớ.
- Có ôn lại thẻ quên và xáo lại bộ.
- Recall Memory tích hợp.


V24 - MINNA NO NIHONGO II / N4 VOCAB BÀI 26–50
------------------------------------------------
Đã thêm track N4 Minna no Nihongo II riêng, song song với N5:

- 25 bài: Bài 26–50
- 1010 mục từ / biểu đạt
- Flashcard từng bài, có xáo random
- Học từ mới Kana-first
- Danh sách Kanji / Kana / Romaji / nghĩa Việt
- Trắc nghiệm toàn bài Kana <-> nghĩa Việt
- Quiz chọn nhiều bài
- Flashcard random chọn nhiều bài
- Quên / Nhớ + ôn lại thẻ quên
- Recall Memory tích hợp
- Night Mode giữ nguyên
- N5 Bài 1–25 và các module cũ giữ nguyên

Nguồn:
- PDF Dungmori N4 do người dùng cung cấp là nguồn nghĩa Việt chính.
- Cấu trúc Bài 26–50 được đối chiếu với các danh mục Minna no Nihongo II công khai.

Lưu ý:
- Đây là từ vựng theo giáo trình Minna no Nihongo II, không phải danh sách JLPT N4 chính thức do JLPT công bố.


V25 - FLASHCARD TIẾNG VIỆT -> NHỚ TIẾNG NHẬT
---------------------------------------------
Áp dụng cho cả:
- N5 Minna Bài 1–25
- N4 Minna Bài 26–50

Flashcard từng bài có 3 chiều:
1. Nhật -> Việt
2. Việt -> Nhật
3. Trộn hai chiều

Mode Việt -> Nhật:
- Mặt trước chỉ hiện nghĩa tiếng Việt.
- Người học tự recall từ/cụm từ tiếng Nhật.
- Lật thẻ mới hiện Kana tiếng Nhật.
- Kanji (nếu có) chỉ hiện phụ ở mặt đáp án.
- Romaji vẫn hiển thị phụ.

Flashcard random nhiều bài:
- N5 và N4 đều có lựa chọn Việt -> Nhật.
- Khi mở, V25 ưu tiên sẵn chiều Việt -> Nhật.

Recall Memory:
- flash-vi-jp cho N5
- n4m-flash-vi-jp cho N4 Minna
được ghi riêng với chiều Nhật -> Việt.
