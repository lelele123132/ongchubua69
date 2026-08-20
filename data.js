// Nihongo Recall Lab V11
// Từ vựng Bài 1–25 đã được đối chiếu lại với PDF Minna no Nihongo người dùng cung cấp.
// V11 thay các mảng OCR lỗi bằng dữ liệu đã soát: Nhật/Kana/Nghĩa Việt.
const LESSONS = [
  {
    "id": 1,
    "theme": "Chào hỏi & giới thiệu",
    "vocab": [
      {
        "jp": "私",
        "kana": "わたし",
        "reading": "watashi",
        "vi": "tôi"
      },
      {
        "jp": "あなた",
        "kana": "あなた",
        "reading": "anata",
        "vi": "anh/chị, ông/bà, bạn (ngôi thứ II số ít)"
      },
      {
        "jp": "あの人",
        "kana": "あのひと",
        "reading": "anohito",
        "vi": "người kia, người đó, anh kia, chị kia"
      },
      {
        "jp": "（あの方）",
        "kana": "（あのかた）",
        "reading": "anokata",
        "vi": "vị kia, vị đó (cách nói lịch sự của あのひと)"
      },
      {
        "jp": "～さん",
        "kana": "～さん",
        "reading": "san",
        "vi": "anh, chị, ông, bà (hậu tố thêm sau tên để gọi lịch sự)"
      },
      {
        "jp": "～ちゃん",
        "kana": "～ちゃん",
        "reading": "chan",
        "vi": "hậu tố thêm sau tên trẻ em thay cho ～さん"
      },
      {
        "jp": "～人",
        "kana": "～じん",
        "reading": "jin",
        "vi": "hậu tố mang nghĩa “người nước ~”; ví dụ アメリカじん: người Mỹ"
      },
      {
        "jp": "先生",
        "kana": "せんせい",
        "reading": "sensei",
        "vi": "thầy/cô (không dùng khi giới thiệu nghề giáo viên của chính mình)"
      },
      {
        "jp": "教師",
        "kana": "きょうし",
        "reading": "kyoushi",
        "vi": "giáo viên"
      },
      {
        "jp": "学生",
        "kana": "がくせい",
        "reading": "gakusei",
        "vi": "học sinh, sinh viên"
      },
      {
        "jp": "会社員",
        "kana": "かいしゃいん",
        "reading": "kaishain",
        "vi": "nhân viên công ty"
      },
      {
        "jp": "社員",
        "kana": "しゃいん",
        "reading": "shain",
        "vi": "nhân viên Công ty ~ (dùng kèm theo tên công ty)"
      },
      {
        "jp": "銀行員",
        "kana": "ぎんこういん",
        "reading": "ginkouin",
        "vi": "nhân viên ngân hàng"
      },
      {
        "jp": "医者",
        "kana": "いしゃ",
        "reading": "isha",
        "vi": "bác sĩ"
      },
      {
        "jp": "研究者",
        "kana": "けんきゅうしゃ",
        "reading": "kenkyuusha",
        "vi": "nhà nghiên cứu"
      },
      {
        "jp": "大学",
        "kana": "だいがく",
        "reading": "daigaku",
        "vi": "đại học, trường đại học"
      },
      {
        "jp": "病院",
        "kana": "びょういん",
        "reading": "byouin",
        "vi": "bệnh viện"
      },
      {
        "jp": "だれ（どなた）",
        "kana": "だれ（どなた）",
        "reading": "dare donata",
        "vi": "ai (どなた là cách nói lịch sự của だれ)"
      },
      {
        "jp": "～歳",
        "kana": "～さい",
        "reading": "sai",
        "vi": "~ tuổi"
      },
      {
        "jp": "何歳（おいくつ）",
        "kana": "なんさい（おいくつ）",
        "reading": "nansai oikutsu",
        "vi": "mấy tuổi, bao nhiêu tuổi (おいくつ là cách nói lịch sự)"
      },
      {
        "jp": "はい",
        "kana": "はい",
        "reading": "hai",
        "vi": "vâng, dạ"
      },
      {
        "jp": "いいえ",
        "kana": "いいえ",
        "reading": "iie",
        "vi": "không"
      },
      {
        "jp": "初めまして。",
        "kana": "はじめまして。",
        "reading": "hajimemashite",
        "vi": "Rất hân hạnh được gặp anh/chị."
      },
      {
        "jp": "～から来ました。",
        "kana": "～からきました。",
        "reading": "karakimashita",
        "vi": "Tôi đến từ ~."
      },
      {
        "jp": "［どうぞ］よろしく［お願いします］。",
        "kana": "［どうぞ］よろしく［おねがいします］。",
        "reading": "douzo yoroshiku onegaishimasu",
        "vi": "Rất vui được làm quen với anh/chị; rất mong được anh/chị giúp đỡ."
      },
      {
        "jp": "失礼ですが",
        "kana": "しつれいですが",
        "reading": "shitsureidesuga",
        "vi": "Xin lỗi… (dùng khi hỏi thông tin cá nhân như tên, địa chỉ)"
      },
      {
        "jp": "お名前は？",
        "kana": "おなまえは？",
        "reading": "onamaeha",
        "vi": "Tên anh/chị là gì?"
      },
      {
        "jp": "こちらは～さんです。",
        "kana": "こちらは～さんです。",
        "reading": "kochiraha sandesu",
        "vi": "Đây là anh/chị/ông/bà ~."
      },
      {
        "jp": "アメリカ",
        "kana": "アメリカ",
        "reading": "amerika",
        "vi": "Mỹ"
      },
      {
        "jp": "イギリス",
        "kana": "イギリス",
        "reading": "igirisu",
        "vi": "Anh"
      },
      {
        "jp": "インド",
        "kana": "インド",
        "reading": "indo",
        "vi": "Ấn Độ"
      },
      {
        "jp": "インドネシア",
        "kana": "インドネシア",
        "reading": "indoneshia",
        "vi": "In-đô-nê-xi-a"
      },
      {
        "jp": "韓国",
        "kana": "かんこく",
        "reading": "kankoku",
        "vi": "Hàn Quốc"
      },
      {
        "jp": "タイ",
        "kana": "タイ",
        "reading": "tai",
        "vi": "Thái Lan"
      },
      {
        "jp": "中国",
        "kana": "ちゅうごく",
        "reading": "chuugoku",
        "vi": "Trung Quốc"
      },
      {
        "jp": "ドイツ",
        "kana": "ドイツ",
        "reading": "doitsu",
        "vi": "Đức"
      },
      {
        "jp": "日本",
        "kana": "にほん",
        "reading": "nihon",
        "vi": "Nhật Bản"
      },
      {
        "jp": "ブラジル",
        "kana": "ブラジル",
        "reading": "burajiru",
        "vi": "Braxin"
      },
      {
        "jp": "IMC／パワー電気／ブラジルエアー",
        "kana": "IMC／パワーでんき／ブラジルエアー",
        "reading": "pawaadenki burajirueaa",
        "vi": "tên các công ty giả định"
      },
      {
        "jp": "AKC",
        "kana": "AKC",
        "reading": "",
        "vi": "tên một tổ chức giả định"
      },
      {
        "jp": "神戸病院",
        "kana": "こうべびょういん",
        "reading": "koubebyouin",
        "vi": "tên bệnh viện giả định"
      },
      {
        "jp": "さくら大学／富士大学",
        "kana": "さくらだいがく／ふじだいがく",
        "reading": "sakuradaigaku fujidaigaku",
        "vi": "tên các trường đại học giả định"
      }
    ],
    "kanji": [
      {
        "char": "人",
        "meaning": "người",
        "reading": "ジン・ニン / ひと"
      },
      {
        "char": "日",
        "meaning": "ngày, Nhật",
        "reading": "ニチ・ジツ / ひ"
      },
      {
        "char": "本",
        "meaning": "sách, gốc",
        "reading": "ホン / もと"
      }
    ],
    "grammar": [
      {
        "pattern": "N1 は N2 です",
        "meaning": "N1 là N2.",
        "example": "わたしは がくせいです。",
        "translation": "Tôi là sinh viên."
      },
      {
        "pattern": "N1 は N2 じゃありません",
        "meaning": "N1 không phải N2.",
        "example": "わたしは せんせいじゃありません。",
        "translation": "Tôi không phải giáo viên."
      },
      {
        "pattern": "N1 は N2 ですか",
        "meaning": "N1 có phải N2 không?",
        "example": "ミラーさんは かいしゃいんですか。",
        "translation": "Anh Miller có phải nhân viên công ty không?"
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "わたし",
          "vi": "tôi"
        },
        "は マイです。",
        {
          "jp": "ベトナムじん",
          "vi": "người Việt Nam"
        },
        "です。",
        {
          "jp": "がくせい",
          "vi": "sinh viên"
        },
        "です。",
        {
          "jp": "せんせい",
          "vi": "giáo viên"
        },
        "じゃありません。よろしく おねがいします。"
      ],
      "questions": [
        {
          "q": "マイさんは どこの ひとですか。",
          "correct": "ベトナム",
          "answers": [
            "ベトナム",
            "にほん",
            "アメリカ",
            "タイ"
          ]
        },
        {
          "q": "マイさんは せんせいですか。",
          "correct": "いいえ、がくせいです。",
          "answers": [
            "いいえ、がくせいです。",
            "はい、せんせいです。",
            "いいえ、かいしゃいんです。",
            "はい、にほんじんです。"
          ]
        }
      ]
    },
    "title": "Bài 1",
    "sourcePages": [
      31,
      32
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: đã đối chiếu lại với PDF; giữ dữ liệu đã đúng."
  },
  {
    "id": 2,
    "theme": "Đồ vật & cách chỉ định",
    "vocab": [
      {
        "jp": "これ",
        "kana": "これ",
        "reading": "kore",
        "vi": "cái này, đây (vật ở gần người nói)"
      },
      {
        "jp": "それ",
        "kana": "それ",
        "reading": "sore",
        "vi": "cái đó, đó (vật ở gần người nghe)"
      },
      {
        "jp": "あれ",
        "kana": "あれ",
        "reading": "are",
        "vi": "cái kia, kia (vật ở xa cả người nói và người nghe)"
      },
      {
        "jp": "この～",
        "kana": "この～",
        "reading": "kono",
        "vi": "~ này (gần người nói)"
      },
      {
        "jp": "その～",
        "kana": "その～",
        "reading": "sono",
        "vi": "~ đó (gần người nghe)"
      },
      {
        "jp": "あの～",
        "kana": "あの～",
        "reading": "ano",
        "vi": "~ kia (xa cả người nói và người nghe)"
      },
      {
        "jp": "本",
        "kana": "ほん",
        "reading": "hon",
        "vi": "sách"
      },
      {
        "jp": "辞書",
        "kana": "じしょ",
        "reading": "jisho",
        "vi": "từ điển"
      },
      {
        "jp": "雑誌",
        "kana": "ざっし",
        "reading": "zasshi",
        "vi": "tạp chí"
      },
      {
        "jp": "新聞",
        "kana": "しんぶん",
        "reading": "shinbun",
        "vi": "báo"
      },
      {
        "jp": "ノート",
        "kana": "ノート",
        "reading": "nooto",
        "vi": "vở"
      },
      {
        "jp": "手帳",
        "kana": "てちょう",
        "reading": "techou",
        "vi": "sổ tay"
      },
      {
        "jp": "名刺",
        "kana": "めいし",
        "reading": "meishi",
        "vi": "danh thiếp"
      },
      {
        "jp": "カード",
        "kana": "カード",
        "reading": "kaado",
        "vi": "thẻ"
      },
      {
        "jp": "鉛筆",
        "kana": "えんぴつ",
        "reading": "enpitsu",
        "vi": "bút chì"
      },
      {
        "jp": "ボールペン",
        "kana": "ボールペン",
        "reading": "boorupen",
        "vi": "bút bi"
      },
      {
        "jp": "シャープペンシル",
        "kana": "シャープペンシル",
        "reading": "shaapupenshiru",
        "vi": "bút chì kim, bút chì bấm"
      },
      {
        "jp": "かぎ",
        "kana": "かぎ",
        "reading": "kagi",
        "vi": "chìa khóa"
      },
      {
        "jp": "時計",
        "kana": "とけい",
        "reading": "tokei",
        "vi": "đồng hồ"
      },
      {
        "jp": "傘",
        "kana": "かさ",
        "reading": "kasa",
        "vi": "ô, dù"
      },
      {
        "jp": "かばん",
        "kana": "かばん",
        "reading": "kaban",
        "vi": "cặp sách, túi xách"
      },
      {
        "jp": "CD",
        "kana": "CD",
        "reading": "shiidii",
        "vi": "đĩa CD"
      },
      {
        "jp": "テレビ",
        "kana": "テレビ",
        "reading": "terebi",
        "vi": "tivi"
      },
      {
        "jp": "ラジオ",
        "kana": "ラジオ",
        "reading": "rajio",
        "vi": "radio"
      },
      {
        "jp": "カメラ",
        "kana": "カメラ",
        "reading": "kamera",
        "vi": "máy ảnh"
      },
      {
        "jp": "コンピューター",
        "kana": "コンピューター",
        "reading": "konpyuutaa",
        "vi": "máy vi tính"
      },
      {
        "jp": "車",
        "kana": "くるま",
        "reading": "kuruma",
        "vi": "ô tô, xe hơi"
      },
      {
        "jp": "机",
        "kana": "つくえ",
        "reading": "tsukue",
        "vi": "bàn"
      },
      {
        "jp": "いす",
        "kana": "いす",
        "reading": "isu",
        "vi": "ghế"
      },
      {
        "jp": "チョコレート",
        "kana": "チョコレート",
        "reading": "chokoreeto",
        "vi": "sô-cô-la"
      },
      {
        "jp": "コーヒー",
        "kana": "コーヒー",
        "reading": "koohii",
        "vi": "cà phê"
      },
      {
        "jp": "[お]土産",
        "kana": "[お]みやげ",
        "reading": "miyage",
        "vi": "quà (mua khi đi xa về hoặc mang khi đến thăm ai)"
      },
      {
        "jp": "英語",
        "kana": "えいご",
        "reading": "eigo",
        "vi": "tiếng Anh"
      },
      {
        "jp": "日本語",
        "kana": "にほんご",
        "reading": "nihongo",
        "vi": "tiếng Nhật"
      },
      {
        "jp": "～語",
        "kana": "～ご",
        "reading": "go",
        "vi": "tiếng ~"
      },
      {
        "jp": "何",
        "kana": "なん",
        "reading": "nan",
        "vi": "gì, cái gì"
      },
      {
        "jp": "そう",
        "kana": "そう",
        "reading": "sou",
        "vi": "vậy, thế"
      },
      {
        "jp": "あのう",
        "kana": "あのう",
        "reading": "anou",
        "vi": "à, ờ… (dùng khi ngập ngừng, do dự)"
      },
      {
        "jp": "えっ",
        "kana": "えっ",
        "reading": "e",
        "vi": "Hả?/Ồ? (dùng khi nghe điều bất ngờ hoặc không mong đợi)"
      },
      {
        "jp": "どうぞ。",
        "kana": "どうぞ。",
        "reading": "douzo",
        "vi": "Xin mời."
      },
      {
        "jp": "[どうも]ありがとう[ございます]。",
        "kana": "[どうも]ありがとう[ございます]。",
        "reading": "arigatou",
        "vi": "[Rất] cảm ơn."
      },
      {
        "jp": "そうですか。",
        "kana": "そうですか。",
        "reading": "soudesuka",
        "vi": "Thế à."
      },
      {
        "jp": "違います。",
        "kana": "ちがいます。",
        "reading": "chigaimasu",
        "vi": "Không phải, không đúng, sai rồi."
      },
      {
        "jp": "あ",
        "kana": "あ",
        "reading": "a",
        "vi": "Ôi!/À! (dùng khi chợt nhận ra điều gì)"
      },
      {
        "jp": "これからお世話になります。",
        "kana": "これからおせわになります。",
        "reading": "korekaraosewaninarimasu",
        "vi": "Từ nay tôi rất mong được anh/chị giúp đỡ."
      },
      {
        "jp": "こちらこそ[どうぞ]よろしく[お願いします]。",
        "kana": "こちらこそ[どうぞ]よろしく[おねがいします]。",
        "reading": "kochirakosoyoroshiku",
        "vi": "Chính tôi mới là người mong được anh/chị giúp đỡ; rất mong được làm quen."
      }
    ],
    "kanji": [
      {
        "char": "上",
        "meaning": "trên",
        "reading": "ジョウ / うえ"
      },
      {
        "char": "下",
        "meaning": "dưới",
        "reading": "カ・ゲ / した"
      },
      {
        "char": "中",
        "meaning": "trong, giữa",
        "reading": "チュウ / なか"
      }
    ],
    "grammar": [
      {
        "pattern": "これ／それ／あれ は N です",
        "meaning": "Đây / đó / kia là N.",
        "example": "これは ほんです。",
        "translation": "Đây là sách."
      },
      {
        "pattern": "この／その／あの N",
        "meaning": "N này / đó / kia.",
        "example": "その かさは わたしのです。",
        "translation": "Cái ô đó là của tôi."
      },
      {
        "pattern": "N1 の N2",
        "meaning": "N2 của N1 / N2 thuộc loại N1.",
        "example": "これは にほんごの じしょです。",
        "translation": "Đây là từ điển tiếng Nhật."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "これ",
          "vi": "cái này"
        },
        "は わたしの ",
        {
          "jp": "ほん",
          "vi": "sách"
        },
        "です。",
        {
          "jp": "それ",
          "vi": "cái đó"
        },
        "は リーさんの ",
        {
          "jp": "じしょ",
          "vi": "từ điển"
        },
        "です。",
        {
          "jp": "あれ",
          "vi": "cái kia"
        },
        "は せんせいの ",
        {
          "jp": "かさ",
          "vi": "ô / dù"
        },
        "です。"
      ],
      "questions": [
        {
          "q": "わたしの ものは どれですか。",
          "correct": "ほん",
          "answers": [
            "ほん",
            "じしょ",
            "かさ",
            "かばん"
          ]
        },
        {
          "q": "じしょは だれのですか。",
          "correct": "リーさんのです。",
          "answers": [
            "リーさんのです。",
            "わたしのです。",
            "せんせいのです。",
            "だれのでもありません。"
          ]
        }
      ]
    },
    "title": "Bài 2",
    "sourcePages": [
      37,
      38
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 3,
    "theme": "Địa điểm & nơi chốn",
    "vocab": [
      {
        "jp": "ここ",
        "kana": "ここ",
        "reading": "koko",
        "vi": "chỗ này, đằng này, đây (gần người nói)"
      },
      {
        "jp": "そこ",
        "kana": "そこ",
        "reading": "soko",
        "vi": "chỗ đó, đó (gần người nghe)"
      },
      {
        "jp": "あそこ",
        "kana": "あそこ",
        "reading": "asoko",
        "vi": "chỗ kia, đằng kia, kia (xa cả người nói và người nghe)"
      },
      {
        "jp": "どこ",
        "kana": "どこ",
        "reading": "doko",
        "vi": "chỗ nào, đâu"
      },
      {
        "jp": "こちら",
        "kana": "こちら",
        "reading": "kochira",
        "vi": "phía này, đằng này, chỗ này, đây (cách nói lịch sự của ここ)"
      },
      {
        "jp": "そちら",
        "kana": "そちら",
        "reading": "sochira",
        "vi": "phía đó, đằng đó, chỗ đó, đó (cách nói lịch sự của そこ)"
      },
      {
        "jp": "あちら",
        "kana": "あちら",
        "reading": "achira",
        "vi": "phía kia, đằng kia, chỗ kia, kia (cách nói lịch sự của あそこ)"
      },
      {
        "jp": "どちら",
        "kana": "どちら",
        "reading": "dochira",
        "vi": "phía nào, đằng nào, chỗ nào, đâu (cách nói lịch sự của どこ)"
      },
      {
        "jp": "教室",
        "kana": "きょうしつ",
        "reading": "kyoushitsu",
        "vi": "lớp học, phòng học"
      },
      {
        "jp": "食堂",
        "kana": "しょくどう",
        "reading": "shokudou",
        "vi": "nhà ăn"
      },
      {
        "jp": "事務所",
        "kana": "じむしょ",
        "reading": "jimusho",
        "vi": "văn phòng"
      },
      {
        "jp": "会議室",
        "kana": "かいぎしつ",
        "reading": "kaigishitsu",
        "vi": "phòng họp"
      },
      {
        "jp": "受付",
        "kana": "うけつけ",
        "reading": "uketsuke",
        "vi": "quầy lễ tân, phòng thường trực"
      },
      {
        "jp": "ロビー",
        "kana": "ロビー",
        "reading": "robii",
        "vi": "hành lang, đại sảnh"
      },
      {
        "jp": "部屋",
        "kana": "へや",
        "reading": "heya",
        "vi": "căn phòng"
      },
      {
        "jp": "トイレ（お手洗い）",
        "kana": "トイレ（おてあらい）",
        "reading": "toire",
        "vi": "toa-lét, nhà vệ sinh, phòng vệ sinh"
      },
      {
        "jp": "階段",
        "kana": "かいだん",
        "reading": "kaidan",
        "vi": "cầu thang"
      },
      {
        "jp": "エレベーター",
        "kana": "エレベーター",
        "reading": "erebeetaa",
        "vi": "thang máy"
      },
      {
        "jp": "エスカレーター",
        "kana": "エスカレーター",
        "reading": "esukareetaa",
        "vi": "thang cuốn"
      },
      {
        "jp": "自動販売機",
        "kana": "じどうはんばいき",
        "reading": "jidouhanbaiki",
        "vi": "máy bán hàng tự động"
      },
      {
        "jp": "電話",
        "kana": "でんわ",
        "reading": "denwa",
        "vi": "điện thoại"
      },
      {
        "jp": "[お]国",
        "kana": "[お]くに",
        "reading": "kuni",
        "vi": "nước (của bạn/anh/chị)"
      },
      {
        "jp": "会社",
        "kana": "かいしゃ",
        "reading": "kaisha",
        "vi": "công ty"
      },
      {
        "jp": "うち",
        "kana": "うち",
        "reading": "uchi",
        "vi": "nhà"
      },
      {
        "jp": "靴",
        "kana": "くつ",
        "reading": "kutsu",
        "vi": "giày"
      },
      {
        "jp": "ネクタイ",
        "kana": "ネクタイ",
        "reading": "nekutai",
        "vi": "cà vạt"
      },
      {
        "jp": "ワイン",
        "kana": "ワイン",
        "reading": "wain",
        "vi": "rượu vang"
      },
      {
        "jp": "売り場",
        "kana": "うりば",
        "reading": "uriba",
        "vi": "quầy bán hàng (trong bách hóa, v.v.)"
      },
      {
        "jp": "地下",
        "kana": "ちか",
        "reading": "chika",
        "vi": "tầng hầm, dưới mặt đất"
      },
      {
        "jp": "～階",
        "kana": "～かい（～がい）",
        "reading": "kai",
        "vi": "tầng thứ ~"
      },
      {
        "jp": "何階",
        "kana": "なんがい",
        "reading": "nangai",
        "vi": "tầng mấy"
      },
      {
        "jp": "～円",
        "kana": "～えん",
        "reading": "en",
        "vi": "~ yên"
      },
      {
        "jp": "いくら",
        "kana": "いくら",
        "reading": "ikura",
        "vi": "bao nhiêu tiền"
      },
      {
        "jp": "百",
        "kana": "ひゃく",
        "reading": "hyaku",
        "vi": "một trăm"
      },
      {
        "jp": "千",
        "kana": "せん",
        "reading": "sen",
        "vi": "một nghìn"
      },
      {
        "jp": "万",
        "kana": "まん",
        "reading": "man",
        "vi": "mười nghìn, vạn"
      },
      {
        "jp": "すみません。",
        "kana": "すみません。",
        "reading": "sumimasen",
        "vi": "Xin lỗi."
      },
      {
        "jp": "どうも。",
        "kana": "どうも。",
        "reading": "doumo",
        "vi": "Cảm ơn."
      },
      {
        "jp": "いらっしゃいませ。",
        "kana": "いらっしゃいませ。",
        "reading": "irasshaimase",
        "vi": "Xin chào quý khách, mời quý khách vào."
      },
      {
        "jp": "[～を]見せてください。",
        "kana": "[～を]みせてください。",
        "reading": "misetekudasai",
        "vi": "Cho tôi xem [~]."
      },
      {
        "jp": "じゃ",
        "kana": "じゃ",
        "reading": "ja",
        "vi": "Thế thì/Vậy thì"
      },
      {
        "jp": "[～を]ください。",
        "kana": "[～を]ください。",
        "reading": "kudasai",
        "vi": "Cho tôi [~]."
      },
      {
        "jp": "イタリア",
        "kana": "イタリア",
        "reading": "itaria",
        "vi": "Ý"
      },
      {
        "jp": "スイス",
        "kana": "スイス",
        "reading": "suisu",
        "vi": "Thụy Sĩ"
      },
      {
        "jp": "フランス",
        "kana": "フランス",
        "reading": "furansu",
        "vi": "Pháp"
      },
      {
        "jp": "ジャカルタ",
        "kana": "ジャカルタ",
        "reading": "jakaruta",
        "vi": "Jakarta"
      },
      {
        "jp": "バンコク",
        "kana": "バンコク",
        "reading": "bankoku",
        "vi": "Bangkok"
      },
      {
        "jp": "ベルリン",
        "kana": "ベルリン",
        "reading": "berurin",
        "vi": "Berlin"
      },
      {
        "jp": "新大阪",
        "kana": "しんおおさか",
        "reading": "shinoosaka",
        "vi": "tên một ga ở Osaka"
      }
    ],
    "kanji": [
      {
        "char": "学",
        "meaning": "học",
        "reading": "ガク / まなぶ"
      },
      {
        "char": "校",
        "meaning": "trường",
        "reading": "コウ"
      },
      {
        "char": "先",
        "meaning": "trước",
        "reading": "セン / さき"
      }
    ],
    "grammar": [
      {
        "pattern": "ここ／そこ／あそこ は N です",
        "meaning": "Địa điểm ở đây / đó / kia.",
        "example": "ここは きょうしつです。",
        "translation": "Đây là phòng học."
      },
      {
        "pattern": "N は どこですか",
        "meaning": "N ở đâu?",
        "example": "トイレは どこですか。",
        "translation": "Nhà vệ sinh ở đâu?"
      },
      {
        "pattern": "こちら／そちら／あちら",
        "meaning": "Cách nói lịch sự của đây / đó / kia.",
        "example": "エレベーターは あちらです。",
        "translation": "Thang máy ở đằng kia."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "ここ",
          "vi": "ở đây"
        },
        "は がっこうです。",
        {
          "jp": "きょうしつ",
          "vi": "phòng học"
        },
        "は 2かいです。",
        {
          "jp": "しょくどう",
          "vi": "nhà ăn"
        },
        "は 1かいです。",
        {
          "jp": "トイレ",
          "vi": "nhà vệ sinh"
        },
        "は ",
        {
          "jp": "あそこ",
          "vi": "ở đằng kia"
        },
        "です。"
      ],
      "questions": [
        {
          "q": "しょくどうは なんかいですか。",
          "correct": "1かい",
          "answers": [
            "1かい",
            "2かい",
            "3かい",
            "4かい"
          ]
        },
        {
          "q": "トイレは どこですか。",
          "correct": "あそこです。",
          "answers": [
            "あそこです。",
            "ここです。",
            "きょうしつです。",
            "2かいです。"
          ]
        }
      ]
    },
    "title": "Bài 3",
    "sourcePages": [
      43,
      44
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 4,
    "theme": "Thời gian & lịch sinh hoạt",
    "vocab": [
      {
        "jp": "起きます",
        "kana": "おきます",
        "reading": "okimasu",
        "vi": "dậy, thức dậy"
      },
      {
        "jp": "寝ます",
        "kana": "ねます",
        "reading": "nemasu",
        "vi": "ngủ, đi ngủ"
      },
      {
        "jp": "働きます",
        "kana": "はたらきます",
        "reading": "hatarakimasu",
        "vi": "làm việc"
      },
      {
        "jp": "休みます",
        "kana": "やすみます",
        "reading": "yasumimasu",
        "vi": "nghỉ, nghỉ ngơi"
      },
      {
        "jp": "勉強します",
        "kana": "べんきょうします",
        "reading": "benkyoushimasu",
        "vi": "học"
      },
      {
        "jp": "終わります",
        "kana": "おわります",
        "reading": "owarimasu",
        "vi": "hết, kết thúc, xong"
      },
      {
        "jp": "デパート",
        "kana": "デパート",
        "reading": "depaato",
        "vi": "bách hóa"
      },
      {
        "jp": "銀行",
        "kana": "ぎんこう",
        "reading": "ginkou",
        "vi": "ngân hàng"
      },
      {
        "jp": "郵便局",
        "kana": "ゆうびんきょく",
        "reading": "yuubinkyoku",
        "vi": "bưu điện"
      },
      {
        "jp": "図書館",
        "kana": "としょかん",
        "reading": "toshokan",
        "vi": "thư viện"
      },
      {
        "jp": "美術館",
        "kana": "びじゅつかん",
        "reading": "bijutsukan",
        "vi": "bảo tàng mỹ thuật"
      },
      {
        "jp": "今",
        "kana": "いま",
        "reading": "ima",
        "vi": "bây giờ"
      },
      {
        "jp": "～時",
        "kana": "～じ",
        "reading": "ji",
        "vi": "~ giờ"
      },
      {
        "jp": "～分",
        "kana": "～ふん（～ぷん）",
        "reading": "fun",
        "vi": "~ phút"
      },
      {
        "jp": "半",
        "kana": "はん",
        "reading": "han",
        "vi": "rưỡi, nửa"
      },
      {
        "jp": "何時",
        "kana": "なんじ",
        "reading": "nanji",
        "vi": "mấy giờ"
      },
      {
        "jp": "何分",
        "kana": "なんぷん",
        "reading": "nanpun",
        "vi": "mấy phút"
      },
      {
        "jp": "午前",
        "kana": "ごぜん",
        "reading": "gozen",
        "vi": "buổi sáng, trước 12 giờ trưa (AM)"
      },
      {
        "jp": "午後",
        "kana": "ごご",
        "reading": "gogo",
        "vi": "buổi chiều, sau 12 giờ trưa (PM)"
      },
      {
        "jp": "朝",
        "kana": "あさ",
        "reading": "asa",
        "vi": "buổi sáng, sáng"
      },
      {
        "jp": "昼",
        "kana": "ひる",
        "reading": "hiru",
        "vi": "buổi trưa, trưa"
      },
      {
        "jp": "晩（夜）",
        "kana": "ばん（よる）",
        "reading": "ban",
        "vi": "buổi tối, tối"
      },
      {
        "jp": "おととい",
        "kana": "おととい",
        "reading": "ototoi",
        "vi": "hôm kia"
      },
      {
        "jp": "きのう",
        "kana": "きのう",
        "reading": "kinou",
        "vi": "hôm qua"
      },
      {
        "jp": "きょう",
        "kana": "きょう",
        "reading": "kyou",
        "vi": "hôm nay"
      },
      {
        "jp": "あした",
        "kana": "あした",
        "reading": "ashita",
        "vi": "ngày mai"
      },
      {
        "jp": "あさって",
        "kana": "あさって",
        "reading": "asatte",
        "vi": "ngày kia"
      },
      {
        "jp": "今朝",
        "kana": "けさ",
        "reading": "kesa",
        "vi": "sáng nay"
      },
      {
        "jp": "今晩",
        "kana": "こんばん",
        "reading": "konban",
        "vi": "tối nay"
      },
      {
        "jp": "休み",
        "kana": "やすみ",
        "reading": "yasumi",
        "vi": "nghỉ, nghỉ phép, ngày nghỉ"
      },
      {
        "jp": "昼休み",
        "kana": "ひるやすみ",
        "reading": "hiruyasumi",
        "vi": "nghỉ trưa"
      },
      {
        "jp": "試験",
        "kana": "しけん",
        "reading": "shiken",
        "vi": "thi, kỳ thi, kiểm tra"
      },
      {
        "jp": "会議",
        "kana": "かいぎ",
        "reading": "kaigi",
        "vi": "cuộc họp, hội nghị"
      },
      {
        "jp": "映画",
        "kana": "えいが",
        "reading": "eiga",
        "vi": "phim, điện ảnh"
      },
      {
        "jp": "毎朝",
        "kana": "まいあさ",
        "reading": "maiasa",
        "vi": "hàng sáng, mỗi sáng"
      },
      {
        "jp": "毎晩",
        "kana": "まいばん",
        "reading": "maiban",
        "vi": "hàng tối, mỗi tối"
      },
      {
        "jp": "毎日",
        "kana": "まいにち",
        "reading": "mainichi",
        "vi": "hàng ngày, mỗi ngày"
      },
      {
        "jp": "月曜日",
        "kana": "げつようび",
        "reading": "getsuyoubi",
        "vi": "thứ hai"
      },
      {
        "jp": "火曜日",
        "kana": "かようび",
        "reading": "kayoubi",
        "vi": "thứ ba"
      },
      {
        "jp": "水曜日",
        "kana": "すいようび",
        "reading": "suiyoubi",
        "vi": "thứ tư"
      },
      {
        "jp": "木曜日",
        "kana": "もくようび",
        "reading": "mokuyoubi",
        "vi": "thứ năm"
      },
      {
        "jp": "金曜日",
        "kana": "きんようび",
        "reading": "kinyoubi",
        "vi": "thứ sáu"
      },
      {
        "jp": "土曜日",
        "kana": "どようび",
        "reading": "doyoubi",
        "vi": "thứ bảy"
      },
      {
        "jp": "日曜日",
        "kana": "にちようび",
        "reading": "nichiyoubi",
        "vi": "chủ nhật"
      },
      {
        "jp": "何曜日",
        "kana": "なんようび",
        "reading": "nanyoubi",
        "vi": "thứ mấy"
      },
      {
        "jp": "～から",
        "kana": "～から",
        "reading": "kara",
        "vi": "từ ~"
      },
      {
        "jp": "～まで",
        "kana": "～まで",
        "reading": "made",
        "vi": "đến ~"
      },
      {
        "jp": "～と～",
        "kana": "～と～",
        "reading": "to",
        "vi": "~ và ~ (nối danh từ)"
      },
      {
        "jp": "大変ですね。",
        "kana": "たいへんですね。",
        "reading": "taihendesune",
        "vi": "Anh/Chị vất vả quá nhỉ. (bày tỏ sự thông cảm)"
      },
      {
        "jp": "番号",
        "kana": "ばんごう",
        "reading": "bangou",
        "vi": "số"
      },
      {
        "jp": "何番",
        "kana": "なんばん",
        "reading": "nanban",
        "vi": "số bao nhiêu, số mấy"
      },
      {
        "jp": "そちら",
        "kana": "そちら",
        "reading": "sochira",
        "vi": "ông/bà; phía ông/phía bà"
      },
      {
        "jp": "ニューヨーク",
        "kana": "ニューヨーク",
        "reading": "nyuuyooku",
        "vi": "New York"
      },
      {
        "jp": "ペキン",
        "kana": "ペキン",
        "reading": "pekin",
        "vi": "Bắc Kinh"
      },
      {
        "jp": "ロサンゼルス",
        "kana": "ロサンゼルス",
        "reading": "rosanzerusu",
        "vi": "Los Angeles"
      },
      {
        "jp": "ロンドン",
        "kana": "ロンドン",
        "reading": "rondon",
        "vi": "Luân Đôn"
      },
      {
        "jp": "あすか",
        "kana": "あすか",
        "reading": "asuka",
        "vi": "tên giả định của một nhà hàng Nhật"
      },
      {
        "jp": "アップル銀行",
        "kana": "アップルぎんこう",
        "reading": "appuruginkou",
        "vi": "Ngân hàng Apple (tên giả định)"
      },
      {
        "jp": "みどり図書館",
        "kana": "みどりとしょかん",
        "reading": "midoritoshokan",
        "vi": "Thư viện Midori (tên giả định)"
      },
      {
        "jp": "やまと美術館",
        "kana": "やまとびじゅつかん",
        "reading": "yamatobijutsukan",
        "vi": "Bảo tàng mỹ thuật Yamato (tên giả định)"
      }
    ],
    "kanji": [
      {
        "char": "時",
        "meaning": "giờ, thời gian",
        "reading": "ジ / とき"
      },
      {
        "char": "分",
        "meaning": "phút, phần",
        "reading": "フン・ブン"
      },
      {
        "char": "半",
        "meaning": "một nửa",
        "reading": "ハン"
      }
    ],
    "grammar": [
      {
        "pattern": "いま ～じ ～ふんです",
        "meaning": "Bây giờ là ~ giờ ~ phút.",
        "example": "いま 7じ30ぷんです。",
        "translation": "Bây giờ là 7 giờ 30."
      },
      {
        "pattern": "～じから ～じまで",
        "meaning": "Từ ~ giờ đến ~ giờ.",
        "example": "9じから 5じまで はたらきます。",
        "translation": "Làm việc từ 9 giờ đến 5 giờ."
      },
      {
        "pattern": "時間 に V",
        "meaning": "Làm hành động vào thời điểm cụ thể.",
        "example": "6じに おきます。",
        "translation": "Tôi thức dậy lúc 6 giờ."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "まいあさ",
          "vi": "mỗi sáng"
        },
        " 6じに ",
        {
          "jp": "おきます",
          "vi": "thức dậy"
        },
        "。7じに あさごはんを たべます。ごご11じに ",
        {
          "jp": "ねます",
          "vi": "ngủ"
        },
        "。にちようびは ",
        {
          "jp": "やすみます",
          "vi": "nghỉ"
        },
        "。"
      ],
      "questions": [
        {
          "q": "なんじに おきますか。",
          "correct": "6じ",
          "answers": [
            "6じ",
            "7じ",
            "11じ",
            "9じ"
          ]
        },
        {
          "q": "いつ やすみますか。",
          "correct": "にちようび",
          "answers": [
            "にちようび",
            "げつようび",
            "まいにち",
            "どようび"
          ]
        }
      ]
    },
    "title": "Bài 4",
    "sourcePages": [
      49,
      50
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 5,
    "theme": "Đi lại & phương tiện",
    "vocab": [
      {
        "jp": "行きます",
        "kana": "いきます",
        "reading": "ikimasu",
        "vi": "đi"
      },
      {
        "jp": "来ます",
        "kana": "きます",
        "reading": "kimasu",
        "vi": "đến"
      },
      {
        "jp": "帰ります",
        "kana": "かえります",
        "reading": "kaerimasu",
        "vi": "về"
      },
      {
        "jp": "学校",
        "kana": "がっこう",
        "reading": "gakkou",
        "vi": "trường học"
      },
      {
        "jp": "スーパー",
        "kana": "スーパー",
        "reading": "suupaa",
        "vi": "siêu thị"
      },
      {
        "jp": "駅",
        "kana": "えき",
        "reading": "eki",
        "vi": "ga, nhà ga"
      },
      {
        "jp": "飛行機",
        "kana": "ひこうき",
        "reading": "hikouki",
        "vi": "máy bay"
      },
      {
        "jp": "船",
        "kana": "ふね",
        "reading": "fune",
        "vi": "thuyền, tàu thủy"
      },
      {
        "jp": "電車",
        "kana": "でんしゃ",
        "reading": "densha",
        "vi": "tàu điện"
      },
      {
        "jp": "地下鉄",
        "kana": "ちかてつ",
        "reading": "chikatetsu",
        "vi": "tàu điện ngầm"
      },
      {
        "jp": "新幹線",
        "kana": "しんかんせん",
        "reading": "shinkansen",
        "vi": "tàu Shinkansen (tàu cao tốc của Nhật)"
      },
      {
        "jp": "バス",
        "kana": "バス",
        "reading": "basu",
        "vi": "xe buýt"
      },
      {
        "jp": "タクシー",
        "kana": "タクシー",
        "reading": "takushii",
        "vi": "tắc-xi"
      },
      {
        "jp": "自転車",
        "kana": "じてんしゃ",
        "reading": "jitensha",
        "vi": "xe đạp"
      },
      {
        "jp": "歩いて",
        "kana": "あるいて",
        "reading": "aruite",
        "vi": "đi bộ"
      },
      {
        "jp": "人",
        "kana": "ひと",
        "reading": "hito",
        "vi": "người"
      },
      {
        "jp": "友達",
        "kana": "ともだち",
        "reading": "tomodachi",
        "vi": "bạn, bạn bè"
      },
      {
        "jp": "彼",
        "kana": "かれ",
        "reading": "kare",
        "vi": "anh ấy, bạn trai"
      },
      {
        "jp": "彼女",
        "kana": "かのじょ",
        "reading": "kanojo",
        "vi": "chị ấy, bạn gái"
      },
      {
        "jp": "家族",
        "kana": "かぞく",
        "reading": "kazoku",
        "vi": "gia đình"
      },
      {
        "jp": "一人で",
        "kana": "ひとりで",
        "reading": "hitoride",
        "vi": "một mình"
      },
      {
        "jp": "先週",
        "kana": "せんしゅう",
        "reading": "senshuu",
        "vi": "tuần trước"
      },
      {
        "jp": "今週",
        "kana": "こんしゅう",
        "reading": "konshuu",
        "vi": "tuần này"
      },
      {
        "jp": "来週",
        "kana": "らいしゅう",
        "reading": "raishuu",
        "vi": "tuần sau"
      },
      {
        "jp": "先月",
        "kana": "せんげつ",
        "reading": "sengetsu",
        "vi": "tháng trước"
      },
      {
        "jp": "今月",
        "kana": "こんげつ",
        "reading": "kongetsu",
        "vi": "tháng này"
      },
      {
        "jp": "来月",
        "kana": "らいげつ",
        "reading": "raigetsu",
        "vi": "tháng sau"
      },
      {
        "jp": "去年",
        "kana": "きょねん",
        "reading": "kyonen",
        "vi": "năm ngoái"
      },
      {
        "jp": "ことし",
        "kana": "ことし",
        "reading": "kotoshi",
        "vi": "năm nay"
      },
      {
        "jp": "来年",
        "kana": "らいねん",
        "reading": "rainen",
        "vi": "sang năm"
      },
      {
        "jp": "～年",
        "kana": "～ねん",
        "reading": "nen",
        "vi": "năm ~"
      },
      {
        "jp": "何年",
        "kana": "なんねん",
        "reading": "nannen",
        "vi": "mấy năm"
      },
      {
        "jp": "～月",
        "kana": "～がつ",
        "reading": "gatsu",
        "vi": "tháng ~"
      },
      {
        "jp": "何月",
        "kana": "なんがつ",
        "reading": "nangatsu",
        "vi": "tháng mấy"
      },
      {
        "jp": "一日",
        "kana": "ついたち",
        "reading": "tsuitachi",
        "vi": "ngày mồng 1"
      },
      {
        "jp": "二日",
        "kana": "ふつか",
        "reading": "futsuka",
        "vi": "ngày mồng 2; 2 ngày"
      },
      {
        "jp": "三日",
        "kana": "みっか",
        "reading": "mikka",
        "vi": "ngày mồng 3; 3 ngày"
      },
      {
        "jp": "四日",
        "kana": "よっか",
        "reading": "yokka",
        "vi": "ngày mồng 4; 4 ngày"
      },
      {
        "jp": "五日",
        "kana": "いつか",
        "reading": "itsuka",
        "vi": "ngày mồng 5; 5 ngày"
      },
      {
        "jp": "六日",
        "kana": "むいか",
        "reading": "muika",
        "vi": "ngày mồng 6; 6 ngày"
      },
      {
        "jp": "七日",
        "kana": "なのか",
        "reading": "nanoka",
        "vi": "ngày mồng 7; 7 ngày"
      },
      {
        "jp": "八日",
        "kana": "ようか",
        "reading": "youka",
        "vi": "ngày mồng 8; 8 ngày"
      },
      {
        "jp": "九日",
        "kana": "ここのか",
        "reading": "kokonoka",
        "vi": "ngày mồng 9; 9 ngày"
      },
      {
        "jp": "十日",
        "kana": "とおか",
        "reading": "tooka",
        "vi": "ngày mồng 10; 10 ngày"
      },
      {
        "jp": "十四日",
        "kana": "じゅうよっか",
        "reading": "juuyokka",
        "vi": "ngày 14; 14 ngày"
      },
      {
        "jp": "二十日",
        "kana": "はつか",
        "reading": "hatsuka",
        "vi": "ngày 20; 20 ngày"
      },
      {
        "jp": "二十四日",
        "kana": "にじゅうよっか",
        "reading": "nijuuyokka",
        "vi": "ngày 24; 24 ngày"
      },
      {
        "jp": "～日",
        "kana": "～にち",
        "reading": "nichi",
        "vi": "ngày ~; ~ ngày"
      },
      {
        "jp": "何日",
        "kana": "なんにち",
        "reading": "nannichi",
        "vi": "ngày mấy, ngày bao nhiêu; mấy ngày, bao nhiêu ngày"
      },
      {
        "jp": "いつ",
        "kana": "いつ",
        "reading": "itsu",
        "vi": "bao giờ, khi nào"
      },
      {
        "jp": "誕生日",
        "kana": "たんじょうび",
        "reading": "tanjoubi",
        "vi": "sinh nhật"
      },
      {
        "jp": "そうですね。",
        "kana": "そうですね。",
        "reading": "soudesune",
        "vi": "Ừ, nhỉ./Để tôi xem."
      },
      {
        "jp": "[どうも]ありがとうございました。",
        "kana": "[どうも]ありがとうございました。",
        "reading": "arigatougozaimashita",
        "vi": "[Rất] cảm ơn anh/chị."
      },
      {
        "jp": "どういたしまして。",
        "kana": "どういたしまして。",
        "reading": "douitashimashite",
        "vi": "Không có gì đâu."
      },
      {
        "jp": "～番線",
        "kana": "～ばんせん",
        "reading": "bansen",
        "vi": "sân ga số ~"
      },
      {
        "jp": "次の",
        "kana": "つぎの",
        "reading": "tsugino",
        "vi": "tiếp theo"
      },
      {
        "jp": "普通",
        "kana": "ふつう",
        "reading": "futsuu",
        "vi": "tàu thường (dừng ở cả các ga lẻ)"
      },
      {
        "jp": "急行",
        "kana": "きゅうこう",
        "reading": "kyuukou",
        "vi": "tàu tốc hành"
      },
      {
        "jp": "特急",
        "kana": "とっきゅう",
        "reading": "tokkyuu",
        "vi": "tàu tốc hành đặc biệt"
      },
      {
        "jp": "甲子園",
        "kana": "こうしえん",
        "reading": "koushien",
        "vi": "tên một khu phố gần Osaka"
      },
      {
        "jp": "大阪城",
        "kana": "おおさかじょう",
        "reading": "oosakajou",
        "vi": "Lâu đài Osaka"
      }
    ],
    "kanji": [
      {
        "char": "行",
        "meaning": "đi",
        "reading": "コウ / いく"
      },
      {
        "char": "来",
        "meaning": "đến",
        "reading": "ライ / くる"
      },
      {
        "char": "車",
        "meaning": "xe",
        "reading": "シャ / くるま"
      }
    ],
    "grammar": [
      {
        "pattern": "N へ いきます",
        "meaning": "Đi đến N.",
        "example": "がっこうへ いきます。",
        "translation": "Tôi đi đến trường."
      },
      {
        "pattern": "N で いきます",
        "meaning": "Đi bằng phương tiện N.",
        "example": "バスで いきます。",
        "translation": "Tôi đi bằng xe buýt."
      },
      {
        "pattern": "N と いきます",
        "meaning": "Đi cùng N.",
        "example": "ともだちと とうきょうへ いきます。",
        "translation": "Tôi đi Tokyo cùng bạn."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "まいにち",
          "vi": "mỗi ngày"
        },
        " がっこうへ ",
        {
          "jp": "いきます",
          "vi": "đi"
        },
        "。うちから ",
        {
          "jp": "えき",
          "vi": "nhà ga"
        },
        "まで ",
        {
          "jp": "あるいて",
          "vi": "đi bộ"
        },
        " いきます。それから ",
        {
          "jp": "でんしゃ",
          "vi": "tàu điện"
        },
        "で がっこうへ いきます。"
      ],
      "questions": [
        {
          "q": "うちから えきまで どうやって いきますか。",
          "correct": "あるいて",
          "answers": [
            "あるいて",
            "バスで",
            "でんしゃで",
            "じてんしゃで"
          ]
        },
        {
          "q": "えきから がっこうまで なにで いきますか。",
          "correct": "でんしゃ",
          "answers": [
            "でんしゃ",
            "バス",
            "じてんしゃ",
            "くるま"
          ]
        }
      ]
    },
    "title": "Bài 5",
    "sourcePages": [
      55,
      56
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 6,
    "theme": "Hoạt động hằng ngày",
    "vocab": [
      {
        "jp": "食べます",
        "kana": "たべます",
        "reading": "tabemasu",
        "vi": "ăn"
      },
      {
        "jp": "飲みます",
        "kana": "のみます",
        "reading": "nomimasu",
        "vi": "uống"
      },
      {
        "jp": "吸います[たばこを～]",
        "kana": "すいます[たばこを～]",
        "reading": "suimasu",
        "vi": "hút [thuốc lá]"
      },
      {
        "jp": "見ます",
        "kana": "みます",
        "reading": "mimasu",
        "vi": "nhìn, xem"
      },
      {
        "jp": "聞きます",
        "kana": "ききます",
        "reading": "kikimasu",
        "vi": "nghe"
      },
      {
        "jp": "読みます",
        "kana": "よみます",
        "reading": "yomimasu",
        "vi": "đọc"
      },
      {
        "jp": "書きます",
        "kana": "かきます",
        "reading": "kakimasu",
        "vi": "viết (cũng có nghĩa là vẽ; khi mang nghĩa vẽ sách dùng Hiragana)"
      },
      {
        "jp": "買います",
        "kana": "かいます",
        "reading": "kaimasu",
        "vi": "mua"
      },
      {
        "jp": "撮ります[写真を～]",
        "kana": "とります[しゃしんを～]",
        "reading": "torimasu",
        "vi": "chụp [ảnh]"
      },
      {
        "jp": "します",
        "kana": "します",
        "reading": "shimasu",
        "vi": "làm, chơi"
      },
      {
        "jp": "会います[友達に～]",
        "kana": "あいます[ともだちに～]",
        "reading": "aimasu",
        "vi": "gặp [bạn]"
      },
      {
        "jp": "ごはん",
        "kana": "ごはん",
        "reading": "gohan",
        "vi": "bữa ăn, cơm"
      },
      {
        "jp": "朝ごはん",
        "kana": "あさごはん",
        "reading": "asagohan",
        "vi": "cơm sáng, bữa sáng"
      },
      {
        "jp": "昼ごはん",
        "kana": "ひるごはん",
        "reading": "hirugohan",
        "vi": "cơm trưa, bữa trưa"
      },
      {
        "jp": "晩ごはん",
        "kana": "ばんごはん",
        "reading": "bangohan",
        "vi": "cơm tối, bữa tối"
      },
      {
        "jp": "パン",
        "kana": "パン",
        "reading": "pan",
        "vi": "bánh mì"
      },
      {
        "jp": "卵",
        "kana": "たまご",
        "reading": "tamago",
        "vi": "trứng"
      },
      {
        "jp": "肉",
        "kana": "にく",
        "reading": "niku",
        "vi": "thịt"
      },
      {
        "jp": "魚",
        "kana": "さかな",
        "reading": "sakana",
        "vi": "cá"
      },
      {
        "jp": "野菜",
        "kana": "やさい",
        "reading": "yasai",
        "vi": "rau"
      },
      {
        "jp": "果物",
        "kana": "くだもの",
        "reading": "kudamono",
        "vi": "hoa quả, trái cây"
      },
      {
        "jp": "水",
        "kana": "みず",
        "reading": "mizu",
        "vi": "nước"
      },
      {
        "jp": "お茶",
        "kana": "おちゃ",
        "reading": "ocha",
        "vi": "trà, trà xanh"
      },
      {
        "jp": "紅茶",
        "kana": "こうちゃ",
        "reading": "koucha",
        "vi": "trà đen"
      },
      {
        "jp": "牛乳（ミルク）",
        "kana": "ぎゅうにゅう（ミルク）",
        "reading": "gyuunyuu",
        "vi": "sữa bò (sữa)"
      },
      {
        "jp": "ジュース",
        "kana": "ジュース",
        "reading": "juusu",
        "vi": "nước hoa quả"
      },
      {
        "jp": "ビール",
        "kana": "ビール",
        "reading": "biiru",
        "vi": "bia"
      },
      {
        "jp": "[お]酒",
        "kana": "[お]さけ",
        "reading": "sake",
        "vi": "rượu, rượu gạo Nhật Bản"
      },
      {
        "jp": "たばこ",
        "kana": "たばこ",
        "reading": "tabako",
        "vi": "thuốc lá"
      },
      {
        "jp": "手紙",
        "kana": "てがみ",
        "reading": "tegami",
        "vi": "thư"
      },
      {
        "jp": "レポート",
        "kana": "レポート",
        "reading": "repooto",
        "vi": "báo cáo"
      },
      {
        "jp": "写真",
        "kana": "しゃしん",
        "reading": "shashin",
        "vi": "ảnh, hình"
      },
      {
        "jp": "ビデオ",
        "kana": "ビデオ",
        "reading": "bideo",
        "vi": "băng video, đầu video"
      },
      {
        "jp": "店",
        "kana": "みせ",
        "reading": "mise",
        "vi": "cửa hàng, tiệm"
      },
      {
        "jp": "庭",
        "kana": "にわ",
        "reading": "niwa",
        "vi": "vườn"
      },
      {
        "jp": "宿題",
        "kana": "しゅくだい",
        "reading": "shukudai",
        "vi": "bài tập về nhà"
      },
      {
        "jp": "テニス",
        "kana": "テニス",
        "reading": "tenisu",
        "vi": "quần vợt"
      },
      {
        "jp": "サッカー",
        "kana": "サッカー",
        "reading": "sakkaa",
        "vi": "bóng đá"
      },
      {
        "jp": "[お]花見",
        "kana": "[お]はなみ",
        "reading": "hanami",
        "vi": "việc ngắm hoa anh đào"
      },
      {
        "jp": "何",
        "kana": "なに",
        "reading": "nani",
        "vi": "cái gì, gì"
      },
      {
        "jp": "いっしょに",
        "kana": "いっしょに",
        "reading": "isshoni",
        "vi": "cùng, cùng nhau"
      },
      {
        "jp": "ちょっと",
        "kana": "ちょっと",
        "reading": "chotto",
        "vi": "một chút"
      },
      {
        "jp": "いつも",
        "kana": "いつも",
        "reading": "itsumo",
        "vi": "luôn luôn, lúc nào cũng"
      },
      {
        "jp": "時々",
        "kana": "ときどき",
        "reading": "tokidoki",
        "vi": "thỉnh thoảng"
      },
      {
        "jp": "それから",
        "kana": "それから",
        "reading": "sorekara",
        "vi": "sau đó, tiếp theo"
      },
      {
        "jp": "ええ",
        "kana": "ええ",
        "reading": "ee",
        "vi": "vâng, được"
      },
      {
        "jp": "いいですね。",
        "kana": "いいですね。",
        "reading": "iidesune",
        "vi": "Được đấy nhỉ./Hay quá."
      },
      {
        "jp": "わかりました。",
        "kana": "わかりました。",
        "reading": "wakarimashita",
        "vi": "Tôi hiểu rồi./Vâng ạ."
      },
      {
        "jp": "何ですか。",
        "kana": "なんですか。",
        "reading": "nandesuka",
        "vi": "Có gì đấy ạ?/Cái gì vậy?/Vâng, có tôi."
      },
      {
        "jp": "じゃ、また[あした]。",
        "kana": "じゃ、また[あした]。",
        "reading": "jamata",
        "vi": "Hẹn gặp lại [ngày mai]."
      },
      {
        "jp": "メキシコ",
        "kana": "メキシコ",
        "reading": "mekishiko",
        "vi": "Mexico"
      },
      {
        "jp": "大阪デパート",
        "kana": "おおさかデパート",
        "reading": "oosakadepaato",
        "vi": "tên bách hóa giả định"
      },
      {
        "jp": "つるや",
        "kana": "つるや",
        "reading": "tsuruya",
        "vi": "tên nhà hàng giả định"
      },
      {
        "jp": "フランス屋",
        "kana": "フランスや",
        "reading": "furansuya",
        "vi": "tên cửa hàng giả định"
      },
      {
        "jp": "毎日屋",
        "kana": "まいにちや",
        "reading": "mainichiya",
        "vi": "tên siêu thị giả định"
      }
    ],
    "kanji": [
      {
        "char": "食",
        "meaning": "ăn",
        "reading": "ショク / たべる"
      },
      {
        "char": "飲",
        "meaning": "uống",
        "reading": "イン / のむ"
      },
      {
        "char": "見",
        "meaning": "nhìn, xem",
        "reading": "ケン / みる"
      }
    ],
    "grammar": [
      {
        "pattern": "N を V",
        "meaning": "Làm V với tân ngữ N.",
        "example": "パンを たべます。",
        "translation": "Tôi ăn bánh mì."
      },
      {
        "pattern": "場所 で V",
        "meaning": "Làm hành động tại địa điểm.",
        "example": "としょかんで べんきょうします。",
        "translation": "Tôi học ở thư viện."
      },
      {
        "pattern": "いっしょに Vませんか",
        "meaning": "Mời ai đó cùng làm.",
        "example": "いっしょに えいがを みませんか。",
        "translation": "Cùng xem phim nhé?"
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "きょう",
          "vi": "hôm nay"
        },
        " としょかんで ",
        {
          "jp": "しんぶん",
          "vi": "báo"
        },
        "を ",
        {
          "jp": "よみます",
          "vi": "đọc"
        },
        "。ごご、ともだちと ",
        {
          "jp": "えいが",
          "vi": "phim"
        },
        "を ",
        {
          "jp": "みます",
          "vi": "xem"
        },
        "。よる、うちで ごはんを ",
        {
          "jp": "たべます",
          "vi": "ăn"
        },
        "。"
      ],
      "questions": [
        {
          "q": "どこで しんぶんを よみますか。",
          "correct": "としょかん",
          "answers": [
            "としょかん",
            "うち",
            "えき",
            "がっこう"
          ]
        },
        {
          "q": "だれと えいがを みますか。",
          "correct": "ともだち",
          "answers": [
            "ともだち",
            "せんせい",
            "ひとり",
            "かぞく"
          ]
        }
      ]
    },
    "title": "Bài 6",
    "sourcePages": [
      61,
      62
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 7,
    "theme": "Công cụ, ngôn ngữ & cho nhận",
    "vocab": [
      {
        "jp": "切ります",
        "kana": "きります",
        "reading": "kirimasu",
        "vi": "cắt"
      },
      {
        "jp": "送ります",
        "kana": "おくります",
        "reading": "okurimasu",
        "vi": "gửi"
      },
      {
        "jp": "あげます",
        "kana": "あげます",
        "reading": "agemasu",
        "vi": "cho, tặng"
      },
      {
        "jp": "もらいます",
        "kana": "もらいます",
        "reading": "moraimasu",
        "vi": "nhận"
      },
      {
        "jp": "貸します",
        "kana": "かします",
        "reading": "kashimasu",
        "vi": "cho mượn, cho vay"
      },
      {
        "jp": "借ります",
        "kana": "かります",
        "reading": "karimasu",
        "vi": "mượn, vay"
      },
      {
        "jp": "教えます",
        "kana": "おしえます",
        "reading": "oshiemasu",
        "vi": "dạy"
      },
      {
        "jp": "習います",
        "kana": "ならいます",
        "reading": "naraimasu",
        "vi": "học, tập"
      },
      {
        "jp": "かけます[電話を～]",
        "kana": "かけます[でんわを～]",
        "reading": "kakemasu",
        "vi": "gọi [điện thoại]"
      },
      {
        "jp": "手",
        "kana": "て",
        "reading": "te",
        "vi": "tay"
      },
      {
        "jp": "はし",
        "kana": "はし",
        "reading": "hashi",
        "vi": "đũa"
      },
      {
        "jp": "スプーン",
        "kana": "スプーン",
        "reading": "supuun",
        "vi": "thìa"
      },
      {
        "jp": "ナイフ",
        "kana": "ナイフ",
        "reading": "naifu",
        "vi": "dao"
      },
      {
        "jp": "フォーク",
        "kana": "フォーク",
        "reading": "fuuku",
        "vi": "dĩa, nĩa"
      },
      {
        "jp": "はさみ",
        "kana": "はさみ",
        "reading": "hasami",
        "vi": "kéo"
      },
      {
        "jp": "パソコン",
        "kana": "パソコン",
        "reading": "pasokon",
        "vi": "máy vi tính cá nhân"
      },
      {
        "jp": "ケータイ",
        "kana": "ケータイ",
        "reading": "keetai",
        "vi": "điện thoại di động"
      },
      {
        "jp": "メール",
        "kana": "メール",
        "reading": "meeru",
        "vi": "thư điện tử, email"
      },
      {
        "jp": "年賀状",
        "kana": "ねんがじょう",
        "reading": "nengajou",
        "vi": "thiệp mừng năm mới"
      },
      {
        "jp": "パンチ",
        "kana": "パンチ",
        "reading": "panchi",
        "vi": "cái đục lỗ"
      },
      {
        "jp": "ホッチキス",
        "kana": "ホッチキス",
        "reading": "hocchikisu",
        "vi": "cái dập ghim"
      },
      {
        "jp": "セロテープ",
        "kana": "セロテープ",
        "reading": "seroteepu",
        "vi": "băng dính"
      },
      {
        "jp": "消しゴム",
        "kana": "けしゴム",
        "reading": "keshigomu",
        "vi": "cái tẩy, cục tẩy"
      },
      {
        "jp": "紙",
        "kana": "かみ",
        "reading": "kami",
        "vi": "giấy"
      },
      {
        "jp": "花",
        "kana": "はな",
        "reading": "hana",
        "vi": "hoa"
      },
      {
        "jp": "シャツ",
        "kana": "シャツ",
        "reading": "shatsu",
        "vi": "áo sơ mi"
      },
      {
        "jp": "プレゼント",
        "kana": "プレゼント",
        "reading": "purezento",
        "vi": "quà tặng, tặng phẩm"
      },
      {
        "jp": "荷物",
        "kana": "にもつ",
        "reading": "nimotsu",
        "vi": "đồ đạc, hành lý"
      },
      {
        "jp": "お金",
        "kana": "おかね",
        "reading": "okane",
        "vi": "tiền"
      },
      {
        "jp": "切符",
        "kana": "きっぷ",
        "reading": "kippu",
        "vi": "vé"
      },
      {
        "jp": "クリスマス",
        "kana": "クリスマス",
        "reading": "kurisumasu",
        "vi": "Giáng sinh"
      },
      {
        "jp": "父",
        "kana": "ちち",
        "reading": "chichi",
        "vi": "bố (khi nói về bố mình)"
      },
      {
        "jp": "母",
        "kana": "はは",
        "reading": "haha",
        "vi": "mẹ (khi nói về mẹ mình)"
      },
      {
        "jp": "お父さん",
        "kana": "おとうさん",
        "reading": "otousan",
        "vi": "bố (người khác; hoặc dùng để gọi bố mình)"
      },
      {
        "jp": "お母さん",
        "kana": "おかあさん",
        "reading": "okaasan",
        "vi": "mẹ (người khác; hoặc dùng để gọi mẹ mình)"
      },
      {
        "jp": "もう",
        "kana": "もう",
        "reading": "mou",
        "vi": "đã, rồi"
      },
      {
        "jp": "まだ",
        "kana": "まだ",
        "reading": "mada",
        "vi": "chưa"
      },
      {
        "jp": "これから",
        "kana": "これから",
        "reading": "korekara",
        "vi": "từ bây giờ, sau đây"
      },
      {
        "jp": "[～、]すてきですね。",
        "kana": "[～、]すてきですね。",
        "reading": "sutekidesune",
        "vi": "[~] hay nhỉ./Đẹp nhỉ."
      },
      {
        "jp": "いらっしゃい。",
        "kana": "いらっしゃい。",
        "reading": "irasshai",
        "vi": "Rất hoan nghênh/Chào mừng anh/chị đã đến chơi."
      },
      {
        "jp": "どうぞお上がりください。",
        "kana": "どうぞおあがりください。",
        "reading": "douzooagarikudasai",
        "vi": "Mời anh/chị vào."
      },
      {
        "jp": "失礼します。",
        "kana": "しつれいします。",
        "reading": "shitsureishimasu",
        "vi": "Xin phép tôi vào./Xin phép ~."
      },
      {
        "jp": "[～は]いかがですか。",
        "kana": "[～は]いかがですか。",
        "reading": "ikagadesuka",
        "vi": "Anh/Chị dùng ~ nhé?"
      },
      {
        "jp": "いただきます。",
        "kana": "いただきます。",
        "reading": "itadakimasu",
        "vi": "Mời dùng/Tôi xin phép dùng. (nói trước khi ăn hoặc uống)"
      },
      {
        "jp": "ごちそうさま[でした]。",
        "kana": "ごちそうさま[でした]。",
        "reading": "gochisousama",
        "vi": "Cảm ơn về bữa ăn ngon. (nói sau khi ăn)"
      },
      {
        "jp": "スペイン",
        "kana": "スペイン",
        "reading": "supein",
        "vi": "Tây Ban Nha"
      }
    ],
    "kanji": [
      {
        "char": "手",
        "meaning": "tay",
        "reading": "シュ / て"
      },
      {
        "char": "紙",
        "meaning": "giấy",
        "reading": "シ / かみ"
      },
      {
        "char": "語",
        "meaning": "ngôn ngữ",
        "reading": "ゴ"
      }
    ],
    "grammar": [
      {
        "pattern": "道具 で V",
        "meaning": "Làm bằng công cụ.",
        "example": "はさみで かみを きります。",
        "translation": "Cắt giấy bằng kéo."
      },
      {
        "pattern": "A は B に N を あげます",
        "meaning": "A cho B vật N.",
        "example": "わたしは ともだちに はなを あげます。",
        "translation": "Tôi tặng hoa cho bạn."
      },
      {
        "pattern": "A は B に／から N を もらいます",
        "meaning": "A nhận N từ B.",
        "example": "せんせいに ほんを もらいました。",
        "translation": "Tôi nhận sách từ giáo viên."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "きのう",
          "vi": "hôm qua"
        },
        " ともだちの たんじょうびでした。わたしは ともだちに ",
        {
          "jp": "プレゼント",
          "vi": "quà tặng"
        },
        "を ",
        {
          "jp": "あげました",
          "vi": "đã tặng"
        },
        "。ともだちから ",
        {
          "jp": "メール",
          "vi": "email"
        },
        "を ",
        {
          "jp": "もらいました",
          "vi": "đã nhận"
        },
        "。"
      ],
      "questions": [
        {
          "q": "だれの たんじょうびでしたか。",
          "correct": "ともだち",
          "answers": [
            "ともだち",
            "せんせい",
            "わたし",
            "かぞく"
          ]
        },
        {
          "q": "わたしは なにを もらいましたか。",
          "correct": "メール",
          "answers": [
            "メール",
            "プレゼント",
            "ほん",
            "はな"
          ]
        }
      ]
    },
    "title": "Bài 7",
    "sourcePages": [
      67,
      68
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 8,
    "theme": "Tính từ & miêu tả",
    "vocab": [
      {
        "jp": "ハンサム[な]",
        "kana": "ハンサム[な]",
        "reading": "hansamu",
        "vi": "đẹp trai"
      },
      {
        "jp": "きれい[な]",
        "kana": "きれい[な]",
        "reading": "kirei",
        "vi": "đẹp, sạch"
      },
      {
        "jp": "静か[な]",
        "kana": "しずか[な]",
        "reading": "shizuka",
        "vi": "yên tĩnh"
      },
      {
        "jp": "にぎやか[な]",
        "kana": "にぎやか[な]",
        "reading": "nigiyaka",
        "vi": "náo nhiệt"
      },
      {
        "jp": "有名[な]",
        "kana": "ゆうめい[な]",
        "reading": "yuumei",
        "vi": "nổi tiếng"
      },
      {
        "jp": "親切[な]",
        "kana": "しんせつ[な]",
        "reading": "shinsetsu",
        "vi": "tốt bụng, thân thiện (không dùng khi nói về người trong gia đình mình)"
      },
      {
        "jp": "元気[な]",
        "kana": "げんき[な]",
        "reading": "genki",
        "vi": "khỏe, khỏe khoắn"
      },
      {
        "jp": "暇[な]",
        "kana": "ひま[な]",
        "reading": "hima",
        "vi": "rảnh rỗi"
      },
      {
        "jp": "便利[な]",
        "kana": "べんり[な]",
        "reading": "benri",
        "vi": "tiện lợi"
      },
      {
        "jp": "すてき[な]",
        "kana": "すてき[な]",
        "reading": "suteki",
        "vi": "đẹp, hay"
      },
      {
        "jp": "大きい",
        "kana": "おおきい",
        "reading": "ookii",
        "vi": "to, lớn"
      },
      {
        "jp": "小さい",
        "kana": "ちいさい",
        "reading": "chiisai",
        "vi": "nhỏ, bé"
      },
      {
        "jp": "新しい",
        "kana": "あたらしい",
        "reading": "atarashii",
        "vi": "mới"
      },
      {
        "jp": "古い",
        "kana": "ふるい",
        "reading": "furui",
        "vi": "cũ (không dùng khi nói về tuổi tác của người)"
      },
      {
        "jp": "いい（よい）",
        "kana": "いい（よい）",
        "reading": "ii",
        "vi": "tốt"
      },
      {
        "jp": "悪い",
        "kana": "わるい",
        "reading": "warui",
        "vi": "xấu"
      },
      {
        "jp": "暑い・熱い",
        "kana": "あつい",
        "reading": "atsui",
        "vi": "nóng"
      },
      {
        "jp": "寒い",
        "kana": "さむい",
        "reading": "samui",
        "vi": "lạnh, rét (dùng cho thời tiết)"
      },
      {
        "jp": "冷たい",
        "kana": "つめたい",
        "reading": "tsumetai",
        "vi": "lạnh, buốt (cảm giác khi chạm)"
      },
      {
        "jp": "難しい",
        "kana": "むずかしい",
        "reading": "muzukashii",
        "vi": "khó"
      },
      {
        "jp": "易しい",
        "kana": "やさしい",
        "reading": "yasashii",
        "vi": "dễ"
      },
      {
        "jp": "高い",
        "kana": "たかい",
        "reading": "takai",
        "vi": "đắt, cao"
      },
      {
        "jp": "安い",
        "kana": "やすい",
        "reading": "yasui",
        "vi": "rẻ"
      },
      {
        "jp": "低い",
        "kana": "ひくい",
        "reading": "hikui",
        "vi": "thấp"
      },
      {
        "jp": "おもしろい",
        "kana": "おもしろい",
        "reading": "omoshiroi",
        "vi": "thú vị, hay"
      },
      {
        "jp": "おいしい",
        "kana": "おいしい",
        "reading": "oishii",
        "vi": "ngon"
      },
      {
        "jp": "忙しい",
        "kana": "いそがしい",
        "reading": "isogashii",
        "vi": "bận"
      },
      {
        "jp": "楽しい",
        "kana": "たのしい",
        "reading": "tanoshii",
        "vi": "vui"
      },
      {
        "jp": "白い",
        "kana": "しろい",
        "reading": "shiroi",
        "vi": "trắng"
      },
      {
        "jp": "黒い",
        "kana": "くろい",
        "reading": "kuroi",
        "vi": "đen"
      },
      {
        "jp": "赤い",
        "kana": "あかい",
        "reading": "akai",
        "vi": "đỏ"
      },
      {
        "jp": "青い",
        "kana": "あおい",
        "reading": "aoi",
        "vi": "xanh da trời"
      },
      {
        "jp": "桜",
        "kana": "さくら",
        "reading": "sakura",
        "vi": "hoa/cây anh đào"
      },
      {
        "jp": "山",
        "kana": "やま",
        "reading": "yama",
        "vi": "núi"
      },
      {
        "jp": "町",
        "kana": "まち",
        "reading": "machi",
        "vi": "thị trấn, thị xã, thành phố"
      },
      {
        "jp": "食べ物",
        "kana": "たべもの",
        "reading": "tabemono",
        "vi": "đồ ăn"
      },
      {
        "jp": "所",
        "kana": "ところ",
        "reading": "tokoro",
        "vi": "nơi, chỗ"
      },
      {
        "jp": "寮",
        "kana": "りょう",
        "reading": "ryou",
        "vi": "kí túc xá"
      },
      {
        "jp": "レストラン",
        "kana": "レストラン",
        "reading": "resutoran",
        "vi": "nhà hàng"
      },
      {
        "jp": "生活",
        "kana": "せいかつ",
        "reading": "seikatsu",
        "vi": "cuộc sống, sinh hoạt"
      },
      {
        "jp": "[お]仕事",
        "kana": "[お]しごと",
        "reading": "shigoto",
        "vi": "việc, công việc"
      },
      {
        "jp": "どう",
        "kana": "どう",
        "reading": "dou",
        "vi": "thế nào"
      },
      {
        "jp": "どんな～",
        "kana": "どんな～",
        "reading": "donna",
        "vi": "~ như thế nào"
      },
      {
        "jp": "とても",
        "kana": "とても",
        "reading": "totemo",
        "vi": "rất, lắm"
      },
      {
        "jp": "あまり",
        "kana": "あまり",
        "reading": "amari",
        "vi": "không ~ lắm (dùng với thể phủ định)"
      },
      {
        "jp": "そして",
        "kana": "そして",
        "reading": "soshite",
        "vi": "và, thêm nữa (nối hai câu)"
      },
      {
        "jp": "～が、～",
        "kana": "～が、～",
        "reading": "ga",
        "vi": "~, nhưng ~"
      },
      {
        "jp": "お元気ですか。",
        "kana": "おげんきですか。",
        "reading": "ogenkidesuka",
        "vi": "Anh/Chị có khỏe không?"
      },
      {
        "jp": "そうですね。",
        "kana": "そうですね。",
        "reading": "soudesune",
        "vi": "Thế à./Để tôi xem. (nói trong lúc suy nghĩ câu trả lời)"
      },
      {
        "jp": "[～、]もう一杯いかがですか。",
        "kana": "[～、]もういっぱい いかがですか。",
        "reading": "mouippai ikagadesuka",
        "vi": "Anh/Chị dùng thêm một chén/ly [~] nữa nhé?"
      },
      {
        "jp": "[いいえ、]けっこうです。",
        "kana": "[いいえ、]けっこうです。",
        "reading": "kekkoudesu",
        "vi": "Không, đủ rồi ạ."
      },
      {
        "jp": "もう～です[ね]。",
        "kana": "もう～です[ね]。",
        "reading": "moudesu",
        "vi": "Đã ~ rồi nhỉ./Đã ~ rồi, đúng không?"
      },
      {
        "jp": "そろそろ失礼します。",
        "kana": "そろそろしつれいします。",
        "reading": "sorosoroshitsureishimasu",
        "vi": "Sắp đến lúc tôi phải xin phép về."
      },
      {
        "jp": "いいえ。",
        "kana": "いいえ。",
        "reading": "iie",
        "vi": "Không có gì./Không sao cả."
      },
      {
        "jp": "またいらっしゃってください。",
        "kana": "またいらっしゃってください。",
        "reading": "matairasshattekudasai",
        "vi": "Lần sau anh/chị lại đến chơi nhé."
      },
      {
        "jp": "シャンハイ",
        "kana": "シャンハイ",
        "reading": "shanhai",
        "vi": "Thượng Hải"
      },
      {
        "jp": "金閣寺",
        "kana": "きんかくじ",
        "reading": "kinkakuji",
        "vi": "Chùa Kinkaku-ji (Chùa Vàng)"
      },
      {
        "jp": "奈良公園",
        "kana": "ならこうえん",
        "reading": "narakouen",
        "vi": "Công viên Nara"
      },
      {
        "jp": "富士山",
        "kana": "ふじさん",
        "reading": "fujisan",
        "vi": "Núi Phú Sĩ"
      },
      {
        "jp": "「七人の侍」",
        "kana": "「しちにんのさむらい」",
        "reading": "shichininnosamurai",
        "vi": "“Bảy chàng võ sĩ Samurai” (tên phim của Kurosawa Akira)"
      }
    ],
    "kanji": [
      {
        "char": "大",
        "meaning": "to, lớn",
        "reading": "ダイ / おお"
      },
      {
        "char": "小",
        "meaning": "nhỏ",
        "reading": "ショウ / ちい"
      },
      {
        "char": "新",
        "meaning": "mới",
        "reading": "シン / あたらしい"
      }
    ],
    "grammar": [
      {
        "pattern": "な形容詞 + です",
        "meaning": "Miêu tả bằng tính từ な.",
        "example": "この まちは しずかです。",
        "translation": "Thành phố này yên tĩnh."
      },
      {
        "pattern": "い形容詞 + です",
        "meaning": "Miêu tả bằng tính từ い.",
        "example": "この ほんは おもしろいです。",
        "translation": "Cuốn sách này thú vị."
      },
      {
        "pattern": "あまり ～ません",
        "meaning": "Không ... lắm.",
        "example": "この へやは あまり ひろくないです。",
        "translation": "Phòng này không rộng lắm."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "わたし",
          "vi": "tôi"
        },
        "の まちは ",
        {
          "jp": "しずか",
          "vi": "yên tĩnh"
        },
        "です。えきは ",
        {
          "jp": "おおきい",
          "vi": "to"
        },
        "です。えきの ちかくは ",
        {
          "jp": "にぎやか",
          "vi": "nhộn nhịp"
        },
        "です。あたらしい カフェも あります。"
      ],
      "questions": [
        {
          "q": "まちは どうですか。",
          "correct": "しずかです",
          "answers": [
            "しずかです",
            "にぎやかです",
            "ふるいです",
            "たかいです"
          ]
        },
        {
          "q": "えきの ちかくは どうですか。",
          "correct": "にぎやかです",
          "answers": [
            "にぎやかです",
            "しずかです",
            "ちいさいです",
            "ふるいです"
          ]
        }
      ]
    },
    "title": "Bài 8",
    "sourcePages": [
      73,
      74
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 9,
    "theme": "Sở thích & khả năng hiểu",
    "vocab": [
      {
        "jp": "わかります",
        "kana": "わかります",
        "reading": "wakarimasu",
        "vi": "hiểu, nắm được"
      },
      {
        "jp": "あります",
        "kana": "あります",
        "reading": "arimasu",
        "vi": "có (sở hữu)"
      },
      {
        "jp": "好き[な]",
        "kana": "すき[な]",
        "reading": "suki",
        "vi": "thích"
      },
      {
        "jp": "嫌い[な]",
        "kana": "きらい[な]",
        "reading": "kirai",
        "vi": "ghét, không thích"
      },
      {
        "jp": "上手[な]",
        "kana": "じょうず[な]",
        "reading": "jouzu",
        "vi": "giỏi, khéo"
      },
      {
        "jp": "下手[な]",
        "kana": "へた[な]",
        "reading": "heta",
        "vi": "kém"
      },
      {
        "jp": "飲み物",
        "kana": "のみもの",
        "reading": "nomimono",
        "vi": "đồ uống"
      },
      {
        "jp": "料理",
        "kana": "りょうり",
        "reading": "ryouri",
        "vi": "món ăn, việc nấu ăn"
      },
      {
        "jp": "スポーツ",
        "kana": "スポーツ",
        "reading": "supootsu",
        "vi": "thể thao"
      },
      {
        "jp": "野球",
        "kana": "やきゅう",
        "reading": "yakyuu",
        "vi": "bóng chày"
      },
      {
        "jp": "ダンス",
        "kana": "ダンス",
        "reading": "dansu",
        "vi": "nhảy, khiêu vũ"
      },
      {
        "jp": "旅行",
        "kana": "りょこう",
        "reading": "ryokou",
        "vi": "du lịch, chuyến du lịch"
      },
      {
        "jp": "音楽",
        "kana": "おんがく",
        "reading": "ongaku",
        "vi": "âm nhạc"
      },
      {
        "jp": "歌",
        "kana": "うた",
        "reading": "uta",
        "vi": "bài hát"
      },
      {
        "jp": "クラシック",
        "kana": "クラシック",
        "reading": "kurashikku",
        "vi": "nhạc cổ điển"
      },
      {
        "jp": "ジャズ",
        "kana": "ジャズ",
        "reading": "jazu",
        "vi": "nhạc jazz"
      },
      {
        "jp": "コンサート",
        "kana": "コンサート",
        "reading": "konsaato",
        "vi": "buổi hòa nhạc"
      },
      {
        "jp": "カラオケ",
        "kana": "カラオケ",
        "reading": "karaoke",
        "vi": "karaoke"
      },
      {
        "jp": "歌舞伎",
        "kana": "かぶき",
        "reading": "kabuki",
        "vi": "Kabuki (một loại ca kịch truyền thống Nhật)"
      },
      {
        "jp": "絵",
        "kana": "え",
        "reading": "e",
        "vi": "tranh, hội họa"
      },
      {
        "jp": "字",
        "kana": "じ",
        "reading": "ji",
        "vi": "chữ"
      },
      {
        "jp": "漢字",
        "kana": "かんじ",
        "reading": "kanji",
        "vi": "chữ Hán, Kanji"
      },
      {
        "jp": "ひらがな",
        "kana": "ひらがな",
        "reading": "hiragana",
        "vi": "chữ Hiragana"
      },
      {
        "jp": "カタカナ",
        "kana": "カタカナ",
        "reading": "katakana",
        "vi": "chữ Katakana"
      },
      {
        "jp": "ローマ字",
        "kana": "ローマじ",
        "reading": "roomaji",
        "vi": "chữ La Mã"
      },
      {
        "jp": "細かいお金",
        "kana": "こまかいおかね",
        "reading": "komakaiokane",
        "vi": "tiền lẻ"
      },
      {
        "jp": "チケット",
        "kana": "チケット",
        "reading": "chiketto",
        "vi": "vé"
      },
      {
        "jp": "時間",
        "kana": "じかん",
        "reading": "jikan",
        "vi": "thời gian"
      },
      {
        "jp": "用事",
        "kana": "ようじ",
        "reading": "youji",
        "vi": "việc bận, công chuyện"
      },
      {
        "jp": "約束",
        "kana": "やくそく",
        "reading": "yakusoku",
        "vi": "cuộc hẹn, lời hứa"
      },
      {
        "jp": "アルバイト",
        "kana": "アルバイト",
        "reading": "arubaito",
        "vi": "việc làm thêm"
      },
      {
        "jp": "ご主人",
        "kana": "ごしゅじん",
        "reading": "goshujin",
        "vi": "chồng (khi nói về chồng người khác)"
      },
      {
        "jp": "夫／主人",
        "kana": "おっと／しゅじん",
        "reading": "ottoshujin",
        "vi": "chồng (khi nói về chồng mình)"
      },
      {
        "jp": "奥さん",
        "kana": "おくさん",
        "reading": "okusan",
        "vi": "vợ (khi nói về vợ người khác)"
      },
      {
        "jp": "妻／家内",
        "kana": "つま／かない",
        "reading": "tsumakanai",
        "vi": "vợ (khi nói về vợ mình)"
      },
      {
        "jp": "子ども",
        "kana": "こども",
        "reading": "kodomo",
        "vi": "con cái, trẻ em"
      },
      {
        "jp": "よく",
        "kana": "よく",
        "reading": "yoku",
        "vi": "tốt, rõ (chỉ mức độ)"
      },
      {
        "jp": "だいたい",
        "kana": "だいたい",
        "reading": "daitai",
        "vi": "đại thể, đại khái"
      },
      {
        "jp": "たくさん",
        "kana": "たくさん",
        "reading": "takusan",
        "vi": "nhiều"
      },
      {
        "jp": "少し",
        "kana": "すこし",
        "reading": "sukoshi",
        "vi": "ít, một ít"
      },
      {
        "jp": "全然",
        "kana": "ぜんぜん",
        "reading": "zenzen",
        "vi": "hoàn toàn ~ không (dùng với thể phủ định)"
      },
      {
        "jp": "早く／速く",
        "kana": "はやく",
        "reading": "hayaku",
        "vi": "sớm, nhanh"
      },
      {
        "jp": "～から",
        "kana": "～から",
        "reading": "kara",
        "vi": "vì ~"
      },
      {
        "jp": "どうして",
        "kana": "どうして",
        "reading": "doushite",
        "vi": "tại sao"
      },
      {
        "jp": "貸してください。",
        "kana": "かしてください。",
        "reading": "kashitekudasai",
        "vi": "Hãy cho tôi mượn (nó)."
      },
      {
        "jp": "いいですよ。",
        "kana": "いいですよ。",
        "reading": "iidesuyo",
        "vi": "Được chứ./Được ạ."
      },
      {
        "jp": "残念です[が]。",
        "kana": "ざんねんです[が]。",
        "reading": "zannendesu",
        "vi": "Tôi xin lỗi, [nhưng…]/Đáng tiếc là…"
      },
      {
        "jp": "ああ",
        "kana": "ああ",
        "reading": "aa",
        "vi": "À/Ôi"
      },
      {
        "jp": "いっしょにいかがですか。",
        "kana": "いっしょにいかがですか。",
        "reading": "isshoniikagadesuka",
        "vi": "Anh/Chị cùng ~ với tôi/chúng tôi không?"
      },
      {
        "jp": "[～は]ちょっと…。",
        "kana": "[～は]ちょっと…。",
        "reading": "chotto",
        "vi": "[~ thì] có lẽ không được rồi… (cách từ chối khéo)"
      },
      {
        "jp": "だめですか。",
        "kana": "だめですか。",
        "reading": "damedesuka",
        "vi": "Không được à?"
      },
      {
        "jp": "また今度お願いします。",
        "kana": "またこんどおねがいします。",
        "reading": "matakondoonegaishimasu",
        "vi": "Hẹn anh/chị lần sau vậy."
      }
    ],
    "kanji": [
      {
        "char": "好",
        "meaning": "thích",
        "reading": "コウ / すく"
      },
      {
        "char": "音",
        "meaning": "âm thanh",
        "reading": "オン / おと"
      },
      {
        "char": "楽",
        "meaning": "vui, nhạc",
        "reading": "ガク・ラク / たのしい"
      }
    ],
    "grammar": [
      {
        "pattern": "N が すきです",
        "meaning": "Thích N.",
        "example": "わたしは おんがくが すきです。",
        "translation": "Tôi thích âm nhạc."
      },
      {
        "pattern": "N が じょうずです",
        "meaning": "Giỏi N.",
        "example": "リーさんは にほんごが じょうずです。",
        "translation": "Lee giỏi tiếng Nhật."
      },
      {
        "pattern": "N が わかります",
        "meaning": "Hiểu N.",
        "example": "にほんごが すこし わかります。",
        "translation": "Tôi hiểu một chút tiếng Nhật."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "わたし",
          "vi": "tôi"
        },
        "は ",
        {
          "jp": "おんがく",
          "vi": "âm nhạc"
        },
        "が ",
        {
          "jp": "すき",
          "vi": "thích"
        },
        "です。ピアノは すこし できます。でも ",
        {
          "jp": "スポーツ",
          "vi": "thể thao"
        },
        "は あまり すきじゃありません。にほんごは すこし ",
        {
          "jp": "わかります",
          "vi": "hiểu"
        },
        "。"
      ],
      "questions": [
        {
          "q": "なにが すきですか。",
          "correct": "おんがく",
          "answers": [
            "おんがく",
            "スポーツ",
            "にほんご",
            "えいが"
          ]
        },
        {
          "q": "にほんごが わかりますか。",
          "correct": "すこし わかります",
          "answers": [
            "すこし わかります",
            "ぜんぜん わかりません",
            "よく わかります",
            "にほんごは きらいです"
          ]
        }
      ]
    },
    "title": "Bài 9",
    "sourcePages": [
      79,
      80
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 10,
    "theme": "Sự tồn tại & vị trí",
    "vocab": [
      {
        "jp": "あります",
        "kana": "あります",
        "reading": "arimasu",
        "vi": "ở, tồn tại (đồ vật)"
      },
      {
        "jp": "います",
        "kana": "います",
        "reading": "imasu",
        "vi": "ở, tồn tại (người và động vật)"
      },
      {
        "jp": "いろいろ[な]",
        "kana": "いろいろ[な]",
        "reading": "iroiro",
        "vi": "nhiều, đa dạng"
      },
      {
        "jp": "男の人",
        "kana": "おとこのひと",
        "reading": "otokonohito",
        "vi": "người đàn ông"
      },
      {
        "jp": "女の人",
        "kana": "おんなのひと",
        "reading": "onnanohito",
        "vi": "người phụ nữ"
      },
      {
        "jp": "男の子",
        "kana": "おとこのこ",
        "reading": "otokonoko",
        "vi": "cậu con trai"
      },
      {
        "jp": "女の子",
        "kana": "おんなのこ",
        "reading": "onnanoko",
        "vi": "cô con gái"
      },
      {
        "jp": "犬",
        "kana": "いぬ",
        "reading": "inu",
        "vi": "chó"
      },
      {
        "jp": "猫",
        "kana": "ねこ",
        "reading": "neko",
        "vi": "mèo"
      },
      {
        "jp": "パンダ",
        "kana": "パンダ",
        "reading": "panda",
        "vi": "gấu trúc"
      },
      {
        "jp": "象",
        "kana": "ぞう",
        "reading": "zou",
        "vi": "voi"
      },
      {
        "jp": "木",
        "kana": "き",
        "reading": "ki",
        "vi": "cây, gỗ"
      },
      {
        "jp": "物",
        "kana": "もの",
        "reading": "mono",
        "vi": "vật, đồ vật"
      },
      {
        "jp": "電池",
        "kana": "でんち",
        "reading": "denchi",
        "vi": "pin"
      },
      {
        "jp": "箱",
        "kana": "はこ",
        "reading": "hako",
        "vi": "hộp"
      },
      {
        "jp": "スイッチ",
        "kana": "スイッチ",
        "reading": "suicchi",
        "vi": "công tắc"
      },
      {
        "jp": "冷蔵庫",
        "kana": "れいぞうこ",
        "reading": "reizouko",
        "vi": "tủ lạnh"
      },
      {
        "jp": "テーブル",
        "kana": "テーブル",
        "reading": "teeburu",
        "vi": "bàn"
      },
      {
        "jp": "ベッド",
        "kana": "ベッド",
        "reading": "beddo",
        "vi": "giường"
      },
      {
        "jp": "棚",
        "kana": "たな",
        "reading": "tana",
        "vi": "giá sách, kệ sách"
      },
      {
        "jp": "ドア",
        "kana": "ドア",
        "reading": "doa",
        "vi": "cửa"
      },
      {
        "jp": "窓",
        "kana": "まど",
        "reading": "mado",
        "vi": "cửa sổ"
      },
      {
        "jp": "ポスト",
        "kana": "ポスト",
        "reading": "posuto",
        "vi": "hộp thư, hòm thư"
      },
      {
        "jp": "ビル",
        "kana": "ビル",
        "reading": "biru",
        "vi": "tòa nhà"
      },
      {
        "jp": "ATM",
        "kana": "ATM",
        "reading": "eitiemu",
        "vi": "máy rút tiền tự động, ATM"
      },
      {
        "jp": "コンビニ",
        "kana": "コンビニ",
        "reading": "konbini",
        "vi": "cửa hàng tiện lợi (mở 24/24)"
      },
      {
        "jp": "公園",
        "kana": "こうえん",
        "reading": "kouen",
        "vi": "công viên"
      },
      {
        "jp": "喫茶店",
        "kana": "きっさてん",
        "reading": "kissaten",
        "vi": "quán giải khát, quán cà phê"
      },
      {
        "jp": "～屋",
        "kana": "～や",
        "reading": "ya",
        "vi": "hiệu ~, cửa hàng ~"
      },
      {
        "jp": "乗り場",
        "kana": "のりば",
        "reading": "noriba",
        "vi": "điểm đón/lên tắc-xi, tàu, v.v."
      },
      {
        "jp": "県",
        "kana": "けん",
        "reading": "ken",
        "vi": "tỉnh"
      },
      {
        "jp": "上",
        "kana": "うえ",
        "reading": "ue",
        "vi": "trên"
      },
      {
        "jp": "下",
        "kana": "した",
        "reading": "shita",
        "vi": "dưới"
      },
      {
        "jp": "前",
        "kana": "まえ",
        "reading": "mae",
        "vi": "trước"
      },
      {
        "jp": "後ろ",
        "kana": "うしろ",
        "reading": "ushiro",
        "vi": "sau"
      },
      {
        "jp": "右",
        "kana": "みぎ",
        "reading": "migi",
        "vi": "(bên) phải"
      },
      {
        "jp": "左",
        "kana": "ひだり",
        "reading": "hidari",
        "vi": "(bên) trái"
      },
      {
        "jp": "中",
        "kana": "なか",
        "reading": "naka",
        "vi": "trong, giữa"
      },
      {
        "jp": "外",
        "kana": "そと",
        "reading": "soto",
        "vi": "ngoài"
      },
      {
        "jp": "隣",
        "kana": "となり",
        "reading": "tonari",
        "vi": "bên cạnh"
      },
      {
        "jp": "近く",
        "kana": "ちかく",
        "reading": "chikaku",
        "vi": "gần"
      },
      {
        "jp": "間",
        "kana": "あいだ",
        "reading": "aida",
        "vi": "giữa, ở giữa"
      },
      {
        "jp": "～や～[など]",
        "kana": "～や～[など]",
        "reading": "ya",
        "vi": "~ và ~, [v.v.]"
      },
      {
        "jp": "[どうも]すみません。",
        "kana": "[どうも]すみません。",
        "reading": "sumimasen",
        "vi": "Cảm ơn."
      },
      {
        "jp": "ナンプラー",
        "kana": "ナンプラー",
        "reading": "nanpuraa",
        "vi": "nam pla, nước mắm"
      },
      {
        "jp": "コーナー",
        "kana": "コーナー",
        "reading": "koonaa",
        "vi": "góc, khu vực"
      },
      {
        "jp": "いちばん下",
        "kana": "いちばんした",
        "reading": "ichibanshita",
        "vi": "ở dưới cùng"
      },
      {
        "jp": "東京ディズニーランド",
        "kana": "とうきょうディズニーランド",
        "reading": "toukyoudezuniirando",
        "vi": "Công viên Tokyo Disneyland"
      },
      {
        "jp": "アジアストア",
        "kana": "アジアストア",
        "reading": "ajiasutoa",
        "vi": "tên siêu thị giả định"
      }
    ],
    "kanji": [
      {
        "char": "前",
        "meaning": "trước",
        "reading": "ゼン / まえ"
      },
      {
        "char": "後",
        "meaning": "sau",
        "reading": "ゴ / あと・うしろ"
      },
      {
        "char": "間",
        "meaning": "khoảng giữa",
        "reading": "カン / あいだ"
      }
    ],
    "grammar": [
      {
        "pattern": "場所 に N が あります／います",
        "meaning": "Ở địa điểm có N.",
        "example": "へやに つくえが あります。",
        "translation": "Trong phòng có bàn."
      },
      {
        "pattern": "N は 場所 に あります／います",
        "meaning": "N ở địa điểm.",
        "example": "ねこは いすの したに います。",
        "translation": "Mèo ở dưới ghế."
      },
      {
        "pattern": "N1 や N2 など",
        "meaning": "Có N1, N2, v.v.",
        "example": "つくえの うえに ほんや ノートなどが あります。",
        "translation": "Trên bàn có sách, vở, v.v."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "へや",
          "vi": "căn phòng"
        },
        "に つくえが ",
        {
          "jp": "あります",
          "vi": "có"
        },
        "。つくえの ",
        {
          "jp": "うえ",
          "vi": "trên"
        },
        "に ほんが あります。いすの ",
        {
          "jp": "した",
          "vi": "dưới"
        },
        "に ",
        {
          "jp": "ねこ",
          "vi": "con mèo"
        },
        "が ",
        {
          "jp": "います",
          "vi": "ở"
        },
        "。"
      ],
      "questions": [
        {
          "q": "ほんは どこですか。",
          "correct": "つくえの うえ",
          "answers": [
            "つくえの うえ",
            "いすの した",
            "へやの そと",
            "つくえの した"
          ]
        },
        {
          "q": "ねこは どこですか。",
          "correct": "いすの した",
          "answers": [
            "いすの した",
            "つくえの うえ",
            "へやの まえ",
            "いすの うえ"
          ]
        }
      ]
    },
    "title": "Bài 10",
    "sourcePages": [
      85,
      86
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 11,
    "theme": "Số lượng & tần suất",
    "vocab": [
      {
        "jp": "います[子どもが～]",
        "kana": "います[こどもが～]",
        "reading": "imasu",
        "vi": "có [con]"
      },
      {
        "jp": "います[日本に～]",
        "kana": "います[にほんに～]",
        "reading": "imasu",
        "vi": "ở [Nhật]"
      },
      {
        "jp": "かかります",
        "kana": "かかります",
        "reading": "kakarimasu",
        "vi": "mất, tốn (thời gian, tiền bạc)"
      },
      {
        "jp": "休みます[会社を～]",
        "kana": "やすみます[かいしゃを～]",
        "reading": "yasumimasu",
        "vi": "nghỉ [làm việc]"
      },
      {
        "jp": "一つ",
        "kana": "ひとつ",
        "reading": "hitotsu",
        "vi": "một cái"
      },
      {
        "jp": "二つ",
        "kana": "ふたつ",
        "reading": "futatsu",
        "vi": "hai cái"
      },
      {
        "jp": "三つ",
        "kana": "みっつ",
        "reading": "mittsu",
        "vi": "ba cái"
      },
      {
        "jp": "四つ",
        "kana": "よっつ",
        "reading": "yottsu",
        "vi": "bốn cái"
      },
      {
        "jp": "五つ",
        "kana": "いつつ",
        "reading": "itsutsu",
        "vi": "năm cái"
      },
      {
        "jp": "六つ",
        "kana": "むっつ",
        "reading": "muttsu",
        "vi": "sáu cái"
      },
      {
        "jp": "七つ",
        "kana": "ななつ",
        "reading": "nanatsu",
        "vi": "bảy cái"
      },
      {
        "jp": "八つ",
        "kana": "やっつ",
        "reading": "yattsu",
        "vi": "tám cái"
      },
      {
        "jp": "九つ",
        "kana": "ここのつ",
        "reading": "kokonotsu",
        "vi": "chín cái"
      },
      {
        "jp": "十",
        "kana": "とお",
        "reading": "too",
        "vi": "mười cái"
      },
      {
        "jp": "いくつ",
        "kana": "いくつ",
        "reading": "ikutsu",
        "vi": "mấy cái, bao nhiêu cái"
      },
      {
        "jp": "一人",
        "kana": "ひとり",
        "reading": "hitori",
        "vi": "một người"
      },
      {
        "jp": "二人",
        "kana": "ふたり",
        "reading": "futari",
        "vi": "hai người"
      },
      {
        "jp": "～人",
        "kana": "～にん",
        "reading": "nin",
        "vi": "~ người"
      },
      {
        "jp": "～台",
        "kana": "～だい",
        "reading": "dai",
        "vi": "~ cái, chiếc (đếm máy móc, xe cộ, v.v.)"
      },
      {
        "jp": "～枚",
        "kana": "～まい",
        "reading": "mai",
        "vi": "~ tờ, tấm (đếm vật mỏng)"
      },
      {
        "jp": "～回",
        "kana": "～かい",
        "reading": "kai",
        "vi": "~ lần"
      },
      {
        "jp": "りんご",
        "kana": "りんご",
        "reading": "ringo",
        "vi": "táo"
      },
      {
        "jp": "みかん",
        "kana": "みかん",
        "reading": "mikan",
        "vi": "quýt"
      },
      {
        "jp": "サンドイッチ",
        "kana": "サンドイッチ",
        "reading": "sandoicchi",
        "vi": "bánh sandwich"
      },
      {
        "jp": "カレー[ライス]",
        "kana": "カレー[ライス]",
        "reading": "karee",
        "vi": "món [cơm] cà-ri"
      },
      {
        "jp": "アイスクリーム",
        "kana": "アイスクリーム",
        "reading": "aisukuriimu",
        "vi": "kem"
      },
      {
        "jp": "切手",
        "kana": "きって",
        "reading": "kitte",
        "vi": "tem"
      },
      {
        "jp": "はがき",
        "kana": "はがき",
        "reading": "hagaki",
        "vi": "bưu thiếp"
      },
      {
        "jp": "封筒",
        "kana": "ふうとう",
        "reading": "fuutou",
        "vi": "phong bì"
      },
      {
        "jp": "両親",
        "kana": "りょうしん",
        "reading": "ryoushin",
        "vi": "bố mẹ"
      },
      {
        "jp": "兄弟",
        "kana": "きょうだい",
        "reading": "kyoudai",
        "vi": "anh chị em"
      },
      {
        "jp": "兄",
        "kana": "あに",
        "reading": "ani",
        "vi": "anh trai (mình)"
      },
      {
        "jp": "お兄さん",
        "kana": "おにいさん",
        "reading": "oniisan",
        "vi": "anh trai (của người khác)"
      },
      {
        "jp": "姉",
        "kana": "あね",
        "reading": "ane",
        "vi": "chị gái (mình)"
      },
      {
        "jp": "お姉さん",
        "kana": "おねえさん",
        "reading": "oneesan",
        "vi": "chị gái (của người khác)"
      },
      {
        "jp": "弟",
        "kana": "おとうと",
        "reading": "otouto",
        "vi": "em trai (mình)"
      },
      {
        "jp": "弟さん",
        "kana": "おとうとさん",
        "reading": "otoutosan",
        "vi": "em trai (của người khác)"
      },
      {
        "jp": "妹",
        "kana": "いもうと",
        "reading": "imouto",
        "vi": "em gái (mình)"
      },
      {
        "jp": "妹さん",
        "kana": "いもうとさん",
        "reading": "imoutosan",
        "vi": "em gái (của người khác)"
      },
      {
        "jp": "外国",
        "kana": "がいこく",
        "reading": "gaikoku",
        "vi": "nước ngoài"
      },
      {
        "jp": "留学生",
        "kana": "りゅうがくせい",
        "reading": "ryuugakusei",
        "vi": "lưu học sinh, sinh viên người nước ngoài"
      },
      {
        "jp": "クラス",
        "kana": "クラス",
        "reading": "kurasu",
        "vi": "lớp học"
      },
      {
        "jp": "～時間",
        "kana": "～じかん",
        "reading": "jikan",
        "vi": "~ tiếng/giờ"
      },
      {
        "jp": "～週間",
        "kana": "～しゅうかん",
        "reading": "shuukan",
        "vi": "~ tuần"
      },
      {
        "jp": "～か月",
        "kana": "～かげつ",
        "reading": "kagetsu",
        "vi": "~ tháng"
      },
      {
        "jp": "～年",
        "kana": "～ねん",
        "reading": "nen",
        "vi": "~ năm"
      },
      {
        "jp": "～ぐらい",
        "kana": "～ぐらい",
        "reading": "gurai",
        "vi": "khoảng ~"
      },
      {
        "jp": "どのくらい",
        "kana": "どのくらい",
        "reading": "donokurai",
        "vi": "bao lâu"
      },
      {
        "jp": "全部で",
        "kana": "ぜんぶで",
        "reading": "zenbude",
        "vi": "tổng cộng"
      },
      {
        "jp": "みんな",
        "kana": "みんな",
        "reading": "minna",
        "vi": "tất cả, mọi người"
      },
      {
        "jp": "～だけ",
        "kana": "～だけ",
        "reading": "dake",
        "vi": "chỉ ~"
      },
      {
        "jp": "かしこまりました。",
        "kana": "かしこまりました。",
        "reading": "kashikomarimashita",
        "vi": "Tôi đã rõ rồi ạ (thưa ông/bà)."
      },
      {
        "jp": "いい[お]天気ですね。",
        "kana": "いい[お]てんきですね。",
        "reading": "iitenkidesune",
        "vi": "Trời đẹp nhỉ."
      },
      {
        "jp": "お出かけですか。",
        "kana": "おでかけですか。",
        "reading": "odekakedesuka",
        "vi": "Anh/Chị đi ra ngoài đấy à?"
      },
      {
        "jp": "ちょっと～まで。",
        "kana": "ちょっと～まで。",
        "reading": "chottomade",
        "vi": "Tôi đi ~ một chút."
      },
      {
        "jp": "行ってらっしゃい。",
        "kana": "いってらっしゃい。",
        "reading": "itterasshai",
        "vi": "Anh/Chị đi nhé. (đi rồi về nhé)"
      },
      {
        "jp": "行ってきます。",
        "kana": "いってきます。",
        "reading": "ittekimasu",
        "vi": "Tôi đi đây. (tôi đi rồi sẽ về)"
      },
      {
        "jp": "船便",
        "kana": "ふなびん",
        "reading": "funabin",
        "vi": "(gửi) bằng đường biển"
      },
      {
        "jp": "航空便（エアメール）",
        "kana": "こうくうびん（エアメール）",
        "reading": "koukuubin",
        "vi": "(gửi) bằng đường hàng không"
      },
      {
        "jp": "お願いします。",
        "kana": "おねがいします。",
        "reading": "onegaishimasu",
        "vi": "Nhờ anh/chị./Làm ơn."
      },
      {
        "jp": "オーストラリア",
        "kana": "オーストラリア",
        "reading": "oosutoraria",
        "vi": "Úc"
      }
    ],
    "kanji": [
      {
        "char": "一",
        "meaning": "một",
        "reading": "イチ / ひと"
      },
      {
        "char": "二",
        "meaning": "hai",
        "reading": "ニ / ふた"
      },
      {
        "char": "週",
        "meaning": "tuần",
        "reading": "シュウ"
      }
    ],
    "grammar": [
      {
        "pattern": "数量詞 + V",
        "meaning": "Từ chỉ số lượng đứng trước động từ.",
        "example": "りんごを みっつ かいました。",
        "translation": "Tôi mua 3 quả táo."
      },
      {
        "pattern": "期間 かかります",
        "meaning": "Mất khoảng thời gian.",
        "example": "とうきょうまで 2じかん かかります。",
        "translation": "Mất 2 giờ đến Tokyo."
      },
      {
        "pattern": "期間 に 回数 V",
        "meaning": "Tần suất trong một khoảng thời gian.",
        "example": "1しゅうかんに 3かい べんきょうします。",
        "translation": "Tôi học 3 lần một tuần."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "まいしゅう",
          "vi": "mỗi tuần"
        },
        " スーパーへ いきます。",
        {
          "jp": "りんご",
          "vi": "táo"
        },
        "を ",
        {
          "jp": "ふたつ",
          "vi": "hai cái"
        },
        "、バナナを みっつ かいます。にほんごは ",
        {
          "jp": "いっしゅうかん",
          "vi": "một tuần"
        },
        "に 4かい べんきょうします。"
      ],
      "questions": [
        {
          "q": "りんごを いくつ かいますか。",
          "correct": "ふたつ",
          "answers": [
            "ふたつ",
            "ひとつ",
            "みっつ",
            "よっつ"
          ]
        },
        {
          "q": "にほんごを 1しゅうかんに なんかい べんきょうしますか。",
          "correct": "4かい",
          "answers": [
            "4かい",
            "2かい",
            "3かい",
            "7かい"
          ]
        }
      ]
    },
    "title": "Bài 11",
    "sourcePages": [
      91,
      92
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 12,
    "theme": "Quá khứ & so sánh",
    "vocab": [
      {
        "jp": "簡単[な]",
        "kana": "かんたん[な]",
        "reading": "kantan",
        "vi": "đơn giản, dễ"
      },
      {
        "jp": "近い",
        "kana": "ちかい",
        "reading": "chikai",
        "vi": "gần"
      },
      {
        "jp": "遠い",
        "kana": "とおい",
        "reading": "tooi",
        "vi": "xa"
      },
      {
        "jp": "速い",
        "kana": "はやい",
        "reading": "hayai",
        "vi": "nhanh, sớm"
      },
      {
        "jp": "遅い",
        "kana": "おそい",
        "reading": "osoi",
        "vi": "chậm, muộn"
      },
      {
        "jp": "多い[人が～]",
        "kana": "おおい[ひとが～]",
        "reading": "ooi",
        "vi": "nhiều [người]"
      },
      {
        "jp": "少ない[人が～]",
        "kana": "すくない[ひとが～]",
        "reading": "sukunai",
        "vi": "ít [người]"
      },
      {
        "jp": "暖かい",
        "kana": "あたたかい",
        "reading": "atatakai",
        "vi": "ấm"
      },
      {
        "jp": "涼しい",
        "kana": "すずしい",
        "reading": "suzushii",
        "vi": "mát"
      },
      {
        "jp": "甘い",
        "kana": "あまい",
        "reading": "amai",
        "vi": "ngọt"
      },
      {
        "jp": "辛い",
        "kana": "からい",
        "reading": "karai",
        "vi": "cay"
      },
      {
        "jp": "重い",
        "kana": "おもい",
        "reading": "omoi",
        "vi": "nặng"
      },
      {
        "jp": "軽い",
        "kana": "かるい",
        "reading": "karui",
        "vi": "nhẹ"
      },
      {
        "jp": "いい[コーヒーが～]",
        "kana": "いい[コーヒーが～]",
        "reading": "ii",
        "vi": "thích, chọn, dùng [cà phê]"
      },
      {
        "jp": "季節",
        "kana": "きせつ",
        "reading": "kisetsu",
        "vi": "mùa"
      },
      {
        "jp": "春",
        "kana": "はる",
        "reading": "haru",
        "vi": "mùa xuân"
      },
      {
        "jp": "夏",
        "kana": "なつ",
        "reading": "natsu",
        "vi": "mùa hè"
      },
      {
        "jp": "秋",
        "kana": "あき",
        "reading": "aki",
        "vi": "mùa thu"
      },
      {
        "jp": "冬",
        "kana": "ふゆ",
        "reading": "fuyu",
        "vi": "mùa đông"
      },
      {
        "jp": "天気",
        "kana": "てんき",
        "reading": "tenki",
        "vi": "thời tiết"
      },
      {
        "jp": "雨",
        "kana": "あめ",
        "reading": "ame",
        "vi": "mưa"
      },
      {
        "jp": "雪",
        "kana": "ゆき",
        "reading": "yuki",
        "vi": "tuyết"
      },
      {
        "jp": "曇り",
        "kana": "くもり",
        "reading": "kumori",
        "vi": "có mây, trời nhiều mây"
      },
      {
        "jp": "ホテル",
        "kana": "ホテル",
        "reading": "hoteru",
        "vi": "khách sạn"
      },
      {
        "jp": "空港",
        "kana": "くうこう",
        "reading": "kuukou",
        "vi": "sân bay"
      },
      {
        "jp": "海",
        "kana": "うみ",
        "reading": "umi",
        "vi": "biển, đại dương"
      },
      {
        "jp": "世界",
        "kana": "せかい",
        "reading": "sekai",
        "vi": "thế giới"
      },
      {
        "jp": "パーティー",
        "kana": "パーティー",
        "reading": "paatee",
        "vi": "tiệc"
      },
      {
        "jp": "[お]祭り",
        "kana": "[お]まつり",
        "reading": "matsuri",
        "vi": "lễ hội"
      },
      {
        "jp": "すき焼き",
        "kana": "すきやき",
        "reading": "sukiyaki",
        "vi": "Sukiyaki (lẩu thịt bò, rau)"
      },
      {
        "jp": "刺身",
        "kana": "さしみ",
        "reading": "sashimi",
        "vi": "Sashimi (gỏi/cá sống)"
      },
      {
        "jp": "[お]すし",
        "kana": "[お]すし",
        "reading": "sushi",
        "vi": "Sushi (cơm giấm với cá tươi, v.v.)"
      },
      {
        "jp": "てんぷら",
        "kana": "てんぷら",
        "reading": "tenpura",
        "vi": "Tempura (hải sản, rau chiên tẩm bột)"
      },
      {
        "jp": "豚肉",
        "kana": "ぶたにく",
        "reading": "butaniku",
        "vi": "thịt heo, thịt lợn"
      },
      {
        "jp": "鶏肉",
        "kana": "とりにく",
        "reading": "toriniku",
        "vi": "thịt gà"
      },
      {
        "jp": "牛肉",
        "kana": "ぎゅうにく",
        "reading": "gyuuniku",
        "vi": "thịt bò"
      },
      {
        "jp": "レモン",
        "kana": "レモン",
        "reading": "remon",
        "vi": "chanh"
      },
      {
        "jp": "生け花",
        "kana": "いけばな",
        "reading": "ikebana",
        "vi": "nghệ thuật cắm hoa"
      },
      {
        "jp": "紅葉",
        "kana": "もみじ",
        "reading": "momiji",
        "vi": "cây lá đỏ, lá đỏ"
      },
      {
        "jp": "どちら",
        "kana": "どちら",
        "reading": "dochira",
        "vi": "cái nào (trong hai cái)"
      },
      {
        "jp": "どちらも",
        "kana": "どちらも",
        "reading": "dochiramo",
        "vi": "cả hai"
      },
      {
        "jp": "いちばん",
        "kana": "いちばん",
        "reading": "ichiban",
        "vi": "nhất"
      },
      {
        "jp": "ずっと",
        "kana": "ずっと",
        "reading": "zutto",
        "vi": "(hơn) hẳn, suốt"
      },
      {
        "jp": "初めて",
        "kana": "はじめて",
        "reading": "hajimete",
        "vi": "lần đầu tiên"
      },
      {
        "jp": "ただいま。",
        "kana": "ただいま。",
        "reading": "tadaima",
        "vi": "Tôi đã về đây. (nói khi về đến nhà)"
      },
      {
        "jp": "お帰りなさい。",
        "kana": "おかえりなさい。",
        "reading": "okaerinasai",
        "vi": "Anh/Chị đã về đấy à./Mừng anh/chị về."
      },
      {
        "jp": "わあ、すごい人ですね。",
        "kana": "わあ、すごいひとですね。",
        "reading": "waasugoihitodesune",
        "vi": "Ôi, đông người quá nhỉ!"
      },
      {
        "jp": "疲れました。",
        "kana": "つかれました。",
        "reading": "tsukaremashita",
        "vi": "Tôi mệt rồi."
      },
      {
        "jp": "祇園祭",
        "kana": "ぎおんまつり",
        "reading": "gionmatsuri",
        "vi": "Lễ hội Gion (lễ hội nổi tiếng ở Kyoto)"
      },
      {
        "jp": "ホンコン",
        "kana": "ホンコン",
        "reading": "honkon",
        "vi": "Hồng Kông"
      },
      {
        "jp": "シンガポール",
        "kana": "シンガポール",
        "reading": "shingapooru",
        "vi": "Singapore"
      },
      {
        "jp": "ABCストア",
        "kana": "ABCストア",
        "reading": "sutoa",
        "vi": "tên siêu thị giả định"
      },
      {
        "jp": "ジャパン",
        "kana": "ジャパン",
        "reading": "japan",
        "vi": "tên siêu thị giả định"
      }
    ],
    "kanji": [
      {
        "char": "近",
        "meaning": "gần",
        "reading": "キン / ちかい"
      },
      {
        "char": "遠",
        "meaning": "xa",
        "reading": "エン / とおい"
      },
      {
        "char": "早",
        "meaning": "sớm",
        "reading": "ソウ / はやい"
      }
    ],
    "grammar": [
      {
        "pattern": "A は B より ～",
        "meaning": "A ... hơn B.",
        "example": "でんしゃは バスより はやいです。",
        "translation": "Tàu điện nhanh hơn xe buýt."
      },
      {
        "pattern": "A と B と どちらが ～",
        "meaning": "A và B, cái nào ... hơn?",
        "example": "サッカーと テニスと どちらが すきですか。",
        "translation": "Bóng đá và tennis, bạn thích cái nào hơn?"
      },
      {
        "pattern": "N の なかで ～が いちばん",
        "meaning": "Trong N, ... là nhất.",
        "example": "くだものの なかで りんごが いちばん すきです。",
        "translation": "Trong trái cây, tôi thích táo nhất."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "でんしゃ",
          "vi": "tàu điện"
        },
        "は バスより ",
        {
          "jp": "はやい",
          "vi": "nhanh"
        },
        "です。うちから えきまで バスのほうが ",
        {
          "jp": "ちかい",
          "vi": "gần"
        },
        "です。でも でんしゃが ",
        {
          "jp": "いちばん",
          "vi": "nhất"
        },
        " べんりです。"
      ],
      "questions": [
        {
          "q": "なにが バスより はやいですか。",
          "correct": "でんしゃ",
          "answers": [
            "でんしゃ",
            "じてんしゃ",
            "くるま",
            "あるくこと"
          ]
        },
        {
          "q": "なにが いちばん べんりですか。",
          "correct": "でんしゃ",
          "answers": [
            "でんしゃ",
            "バス",
            "くるま",
            "じてんしゃ"
          ]
        }
      ]
    },
    "title": "Bài 12",
    "sourcePages": [
      97,
      98
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 13,
    "theme": "Mong muốn & mục đích",
    "vocab": [
      {
        "jp": "遊びます",
        "kana": "あそびます",
        "reading": "asobimasu",
        "vi": "chơi"
      },
      {
        "jp": "泳ぎます",
        "kana": "およぎます",
        "reading": "oyogimasu",
        "vi": "bơi"
      },
      {
        "jp": "迎えます",
        "kana": "むかえます",
        "reading": "mukaemasu",
        "vi": "đón"
      },
      {
        "jp": "疲れます",
        "kana": "つかれます",
        "reading": "tsukaremasu",
        "vi": "mệt"
      },
      {
        "jp": "結婚します",
        "kana": "けっこんします",
        "reading": "kekkonshimasu",
        "vi": "kết hôn, lập gia đình, cưới"
      },
      {
        "jp": "買い物します",
        "kana": "かいものします",
        "reading": "kaimonoshimasu",
        "vi": "mua sắm, mua hàng"
      },
      {
        "jp": "食事します",
        "kana": "しょくじします",
        "reading": "shokujishimasu",
        "vi": "ăn cơm, dùng bữa"
      },
      {
        "jp": "散歩します[公園を～]",
        "kana": "さんぽします[こうえんを～]",
        "reading": "sanposhimasu",
        "vi": "đi dạo [ở công viên]"
      },
      {
        "jp": "大変[な]",
        "kana": "たいへん[な]",
        "reading": "taihen",
        "vi": "vất vả, khó khăn, khổ"
      },
      {
        "jp": "欲しい",
        "kana": "ほしい",
        "reading": "hoshii",
        "vi": "muốn có"
      },
      {
        "jp": "広い",
        "kana": "ひろい",
        "reading": "hiroi",
        "vi": "rộng"
      },
      {
        "jp": "狭い",
        "kana": "せまい",
        "reading": "semai",
        "vi": "chật, hẹp"
      },
      {
        "jp": "プール",
        "kana": "プール",
        "reading": "puuru",
        "vi": "bể bơi"
      },
      {
        "jp": "川",
        "kana": "かわ",
        "reading": "kawa",
        "vi": "sông"
      },
      {
        "jp": "美術",
        "kana": "びじゅつ",
        "reading": "bijutsu",
        "vi": "mỹ thuật"
      },
      {
        "jp": "釣り",
        "kana": "つり",
        "reading": "tsuri",
        "vi": "việc câu cá"
      },
      {
        "jp": "スキー",
        "kana": "スキー",
        "reading": "sukii",
        "vi": "việc trượt tuyết"
      },
      {
        "jp": "週末",
        "kana": "しゅうまつ",
        "reading": "shuumatsu",
        "vi": "cuối tuần"
      },
      {
        "jp": "[お]正月",
        "kana": "[お]しょうがつ",
        "reading": "shougatsu",
        "vi": "Tết"
      },
      {
        "jp": "～ごろ",
        "kana": "～ごろ",
        "reading": "goro",
        "vi": "khoảng ~ (dùng cho thời gian)"
      },
      {
        "jp": "何か",
        "kana": "なにか",
        "reading": "nanika",
        "vi": "cái gì đó"
      },
      {
        "jp": "どこか",
        "kana": "どこか",
        "reading": "dokoka",
        "vi": "đâu đó, chỗ nào đó"
      },
      {
        "jp": "のどがかわきます",
        "kana": "のどがかわきます",
        "reading": "nodogakawakimasu",
        "vi": "khát (trạng thái: のどがかわきました)"
      },
      {
        "jp": "おなかがすきます",
        "kana": "おなかがすきます",
        "reading": "onakagasukimasu",
        "vi": "đói (trạng thái: おなかがすきました)"
      },
      {
        "jp": "そうしましょう。",
        "kana": "そうしましょう。",
        "reading": "soushimashou",
        "vi": "Nhất trí./Hãy làm vậy đi."
      },
      {
        "jp": "ご注文は？",
        "kana": "ごちゅうもんは？",
        "reading": "gochuumonha",
        "vi": "Anh/Chị dùng món gì ạ?"
      },
      {
        "jp": "定食",
        "kana": "ていしょく",
        "reading": "teishoku",
        "vi": "cơm suất, cơm phần"
      },
      {
        "jp": "牛どん",
        "kana": "ぎゅうどん",
        "reading": "gyuudon",
        "vi": "món cơm với thịt bò ở trên"
      },
      {
        "jp": "[少々]お待ちください。",
        "kana": "[しょうしょう]おまちください。",
        "reading": "omachikudasai",
        "vi": "Xin anh/chị vui lòng đợi [một chút]."
      },
      {
        "jp": "～でございます。",
        "kana": "～でございます。",
        "reading": "degozaimasu",
        "vi": "cách nói lịch sự của です"
      },
      {
        "jp": "別々に",
        "kana": "べつべつに",
        "reading": "betsubetsuni",
        "vi": "riêng, riêng ra"
      },
      {
        "jp": "アキックス",
        "kana": "アキックス",
        "reading": "akikkusu",
        "vi": "tên công ty giả định"
      },
      {
        "jp": "おはようテレビ",
        "kana": "おはようテレビ",
        "reading": "ohayouterebi",
        "vi": "tên chương trình truyền hình giả định"
      }
    ],
    "kanji": [
      {
        "char": "海",
        "meaning": "biển",
        "reading": "カイ / うみ"
      },
      {
        "char": "買",
        "meaning": "mua",
        "reading": "バイ / かう"
      },
      {
        "char": "物",
        "meaning": "đồ vật",
        "reading": "ブツ / もの"
      }
    ],
    "grammar": [
      {
        "pattern": "N が ほしいです",
        "meaning": "Muốn có N.",
        "example": "あたらしい じしょが ほしいです。",
        "translation": "Tôi muốn có từ điển mới."
      },
      {
        "pattern": "Vます-stem + たいです",
        "meaning": "Muốn làm V.",
        "example": "にほんへ いきたいです。",
        "translation": "Tôi muốn đi Nhật."
      },
      {
        "pattern": "Vます-stem + に いきます",
        "meaning": "Đi để làm V.",
        "example": "えいがを みに いきます。",
        "translation": "Tôi đi xem phim."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "なつやすみ",
          "vi": "nghỉ hè"
        },
        "に ",
        {
          "jp": "りょこう",
          "vi": "du lịch"
        },
        "したいです。",
        {
          "jp": "うみ",
          "vi": "biển"
        },
        "へ ",
        {
          "jp": "およぎに",
          "vi": "để bơi"
        },
        " いきたいです。それから おみやげを ",
        {
          "jp": "かいたい",
          "vi": "muốn mua"
        },
        "です。"
      ],
      "questions": [
        {
          "q": "なつやすみに なにを したいですか。",
          "correct": "りょこう",
          "answers": [
            "りょこう",
            "べんきょう",
            "しごと",
            "そうじ"
          ]
        },
        {
          "q": "どこへ およぎに いきたいですか。",
          "correct": "うみ",
          "answers": [
            "うみ",
            "やま",
            "がっこう",
            "えき"
          ]
        }
      ]
    },
    "title": "Bài 13",
    "sourcePages": [
      103,
      104
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 14,
    "theme": "Thể て & yêu cầu",
    "vocab": [
      {
        "jp": "つけます",
        "kana": "つけます",
        "reading": "tsukemasu",
        "vi": "bật"
      },
      {
        "jp": "消します",
        "kana": "けします",
        "reading": "keshimasu",
        "vi": "tắt"
      },
      {
        "jp": "開けます",
        "kana": "あけます",
        "reading": "akemasu",
        "vi": "mở"
      },
      {
        "jp": "閉めます",
        "kana": "しめます",
        "reading": "shimemasu",
        "vi": "đóng (cửa, cửa sổ)"
      },
      {
        "jp": "急ぎます",
        "kana": "いそぎます",
        "reading": "isogimasu",
        "vi": "vội, gấp"
      },
      {
        "jp": "待ちます",
        "kana": "まちます",
        "reading": "machimasu",
        "vi": "đợi, chờ"
      },
      {
        "jp": "持ちます",
        "kana": "もちます",
        "reading": "mochimasu",
        "vi": "mang, cầm"
      },
      {
        "jp": "取ります",
        "kana": "とります",
        "reading": "torimasu",
        "vi": "lấy, chuyển"
      },
      {
        "jp": "手伝います",
        "kana": "てつだいます",
        "reading": "tetsudaimasu",
        "vi": "giúp (làm việc gì)"
      },
      {
        "jp": "呼びます",
        "kana": "よびます",
        "reading": "yobimasu",
        "vi": "gọi"
      },
      {
        "jp": "話します",
        "kana": "はなします",
        "reading": "hanashimasu",
        "vi": "nói, nói chuyện"
      },
      {
        "jp": "使います",
        "kana": "つかいます",
        "reading": "tsukaimasu",
        "vi": "dùng, sử dụng"
      },
      {
        "jp": "止めます",
        "kana": "とめます",
        "reading": "tomemasu",
        "vi": "dừng, đỗ"
      },
      {
        "jp": "見せます",
        "kana": "みせます",
        "reading": "misemasu",
        "vi": "cho xem, trình"
      },
      {
        "jp": "教えます[住所を～]",
        "kana": "おしえます[じゅうしょを～]",
        "reading": "oshiemasu",
        "vi": "nói, cho biết [địa chỉ]"
      },
      {
        "jp": "座ります",
        "kana": "すわります",
        "reading": "suwarimasu",
        "vi": "ngồi"
      },
      {
        "jp": "立ちます",
        "kana": "たちます",
        "reading": "tachimasu",
        "vi": "đứng"
      },
      {
        "jp": "入ります[喫茶店に～]",
        "kana": "はいります[きっさてんに～]",
        "reading": "hairimasu",
        "vi": "vào [quán giải khát]"
      },
      {
        "jp": "出ます[喫茶店を～]",
        "kana": "でます[きっさてんを～]",
        "reading": "demasu",
        "vi": "ra, ra khỏi [quán giải khát]"
      },
      {
        "jp": "降ります[雨が～]",
        "kana": "ふります[あめが～]",
        "reading": "furimasu",
        "vi": "mưa"
      },
      {
        "jp": "コピーします",
        "kana": "コピーします",
        "reading": "kopiishimasu",
        "vi": "copy, phô-tô"
      },
      {
        "jp": "電気",
        "kana": "でんき",
        "reading": "denki",
        "vi": "điện, đèn điện"
      },
      {
        "jp": "エアコン",
        "kana": "エアコン",
        "reading": "eakon",
        "vi": "máy điều hòa (nhiệt độ)"
      },
      {
        "jp": "パスポート",
        "kana": "パスポート",
        "reading": "pasupooto",
        "vi": "hộ chiếu"
      },
      {
        "jp": "名前",
        "kana": "なまえ",
        "reading": "namae",
        "vi": "tên"
      },
      {
        "jp": "住所",
        "kana": "じゅうしょ",
        "reading": "juusho",
        "vi": "địa chỉ"
      },
      {
        "jp": "地図",
        "kana": "ちず",
        "reading": "chizu",
        "vi": "bản đồ"
      },
      {
        "jp": "塩",
        "kana": "しお",
        "reading": "shio",
        "vi": "muối"
      },
      {
        "jp": "砂糖",
        "kana": "さとう",
        "reading": "satou",
        "vi": "đường"
      },
      {
        "jp": "問題",
        "kana": "もんだい",
        "reading": "mondai",
        "vi": "câu hỏi, vấn đề"
      },
      {
        "jp": "答え",
        "kana": "こたえ",
        "reading": "kotae",
        "vi": "câu trả lời"
      },
      {
        "jp": "読み方",
        "kana": "よみかた",
        "reading": "yomikata",
        "vi": "cách đọc"
      },
      {
        "jp": "～方",
        "kana": "～かた",
        "reading": "kata",
        "vi": "cách ~"
      },
      {
        "jp": "まっすぐ",
        "kana": "まっすぐ",
        "reading": "massugu",
        "vi": "thẳng"
      },
      {
        "jp": "ゆっくり",
        "kana": "ゆっくり",
        "reading": "yukkuri",
        "vi": "chậm, thong thả, thoải mái"
      },
      {
        "jp": "すぐ",
        "kana": "すぐ",
        "reading": "sugu",
        "vi": "ngay, lập tức"
      },
      {
        "jp": "また",
        "kana": "また",
        "reading": "mata",
        "vi": "lại"
      },
      {
        "jp": "あとで",
        "kana": "あとで",
        "reading": "atode",
        "vi": "sau"
      },
      {
        "jp": "もう少し",
        "kana": "もうすこし",
        "reading": "mousukoshi",
        "vi": "thêm một chút nữa"
      },
      {
        "jp": "もう～",
        "kana": "もう～",
        "reading": "mou",
        "vi": "thêm ~"
      },
      {
        "jp": "さあ",
        "kana": "さあ",
        "reading": "saa",
        "vi": "thôi/nào (dùng để thúc giục hoặc khuyến khích)"
      },
      {
        "jp": "あれ？",
        "kana": "あれ？",
        "reading": "are",
        "vi": "Ồ? (khi phát hiện điều lạ hoặc bất ngờ)"
      },
      {
        "jp": "信号を右へ曲がってください。",
        "kana": "しんごうをみぎへまがってください。",
        "reading": "shingouomigihemagattekudasai",
        "vi": "Anh/Chị hãy rẽ phải ở chỗ đèn tín hiệu."
      },
      {
        "jp": "これでお願いします。",
        "kana": "これでおねがいします。",
        "reading": "koredeonegaishimasu",
        "vi": "Gửi anh/chị tiền này."
      },
      {
        "jp": "お釣り",
        "kana": "おつり",
        "reading": "otsuri",
        "vi": "tiền thừa, tiền thối lại"
      },
      {
        "jp": "みどり町",
        "kana": "みどりちょう",
        "reading": "midorichou",
        "vi": "tên thành phố giả định"
      }
    ],
    "kanji": [
      {
        "char": "開",
        "meaning": "mở",
        "reading": "カイ / あける"
      },
      {
        "char": "閉",
        "meaning": "đóng",
        "reading": "ヘイ / しめる"
      },
      {
        "char": "待",
        "meaning": "đợi",
        "reading": "タイ / まつ"
      }
    ],
    "grammar": [
      {
        "pattern": "Vて ください",
        "meaning": "Hãy / vui lòng làm V.",
        "example": "ここに なまえを かいてください。",
        "translation": "Vui lòng viết tên ở đây."
      },
      {
        "pattern": "Vて います",
        "meaning": "Đang làm V.",
        "example": "いま ほんを よんでいます。",
        "translation": "Bây giờ tôi đang đọc sách."
      },
      {
        "pattern": "Vましょうか",
        "meaning": "Để tôi làm V giúp nhé?",
        "example": "にもつを もちましょうか。",
        "translation": "Để tôi xách hành lý giúp nhé?"
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "いま",
          "vi": "bây giờ"
        },
        " せんせいは じゅぎょうを しています。学生は ほんを よんでいます。せんせいは「ドアを ",
        {
          "jp": "しめてください",
          "vi": "hãy đóng"
        },
        "。そして ここを ",
        {
          "jp": "みてください",
          "vi": "hãy nhìn"
        },
        "」と いいます。"
      ],
      "questions": [
        {
          "q": "せんせいは いま なにを していますか。",
          "correct": "じゅぎょう",
          "answers": [
            "じゅぎょう",
            "りょこう",
            "かいもの",
            "しょくじ"
          ]
        },
        {
          "q": "学生は なにを よんでいますか。",
          "correct": "ほん",
          "answers": [
            "ほん",
            "しんぶん",
            "メール",
            "じしょ"
          ]
        }
      ]
    },
    "title": "Bài 14",
    "sourcePages": [
      109,
      110
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 15,
    "theme": "Cho phép, cấm đoán & trạng thái",
    "vocab": [
      {
        "jp": "置きます",
        "kana": "おきます",
        "reading": "okimasu",
        "vi": "đặt, để"
      },
      {
        "jp": "作ります",
        "kana": "つくります",
        "reading": "tsukurimasu",
        "vi": "làm, chế tạo, sản xuất"
      },
      {
        "jp": "売ります",
        "kana": "うります",
        "reading": "urimasu",
        "vi": "bán"
      },
      {
        "jp": "知ります",
        "kana": "しります",
        "reading": "shirimasu",
        "vi": "biết"
      },
      {
        "jp": "住みます",
        "kana": "すみます",
        "reading": "sumimasu",
        "vi": "sống, ở"
      },
      {
        "jp": "研究します",
        "kana": "けんきゅうします",
        "reading": "kenkyuushimasu",
        "vi": "nghiên cứu"
      },
      {
        "jp": "資料",
        "kana": "しりょう",
        "reading": "shiryou",
        "vi": "tài liệu, tư liệu"
      },
      {
        "jp": "カタログ",
        "kana": "カタログ",
        "reading": "katarogu",
        "vi": "ca-ta-lô, danh mục"
      },
      {
        "jp": "時刻表",
        "kana": "じこくひょう",
        "reading": "jikokuhyou",
        "vi": "bảng giờ chạy tàu"
      },
      {
        "jp": "服",
        "kana": "ふく",
        "reading": "fuku",
        "vi": "quần áo"
      },
      {
        "jp": "製品",
        "kana": "せいひん",
        "reading": "seihin",
        "vi": "sản phẩm"
      },
      {
        "jp": "ソフト",
        "kana": "ソフト",
        "reading": "sofuto",
        "vi": "phần mềm"
      },
      {
        "jp": "電子辞書",
        "kana": "でんしじしょ",
        "reading": "denshijisho",
        "vi": "kim từ điển, từ điển điện tử"
      },
      {
        "jp": "経済",
        "kana": "けいざい",
        "reading": "keizai",
        "vi": "kinh tế"
      },
      {
        "jp": "市役所",
        "kana": "しやくしょ",
        "reading": "shiyakusho",
        "vi": "tòa thị chính"
      },
      {
        "jp": "高校",
        "kana": "こうこう",
        "reading": "koukou",
        "vi": "trường trung học phổ thông, trường cấp 3"
      },
      {
        "jp": "歯医者",
        "kana": "はいしゃ",
        "reading": "haisha",
        "vi": "nha sĩ"
      },
      {
        "jp": "独身",
        "kana": "どくしん",
        "reading": "dokushin",
        "vi": "độc thân"
      },
      {
        "jp": "すみません",
        "kana": "すみません",
        "reading": "sumimasen",
        "vi": "xin lỗi"
      },
      {
        "jp": "皆さん",
        "kana": "みなさん",
        "reading": "minasan",
        "vi": "các anh chị, các ông bà, các bạn, quý vị"
      },
      {
        "jp": "思い出します",
        "kana": "おもいだします",
        "reading": "omoidashimasu",
        "vi": "nhớ lại, hồi tưởng lại"
      },
      {
        "jp": "いらっしゃいます",
        "kana": "いらっしゃいます",
        "reading": "irasshaimasu",
        "vi": "kính ngữ của います"
      },
      {
        "jp": "日本橋",
        "kana": "にっぽんばし",
        "reading": "nipponbashi",
        "vi": "tên khu phố mua sắm ở Osaka"
      },
      {
        "jp": "みんなのインタビュー",
        "kana": "みんなのインタビュー",
        "reading": "minnanointabyuu",
        "vi": "tên chương trình truyền hình giả định"
      }
    ],
    "kanji": [
      {
        "char": "住",
        "meaning": "cư trú",
        "reading": "ジュウ / すむ"
      },
      {
        "char": "知",
        "meaning": "biết",
        "reading": "チ / しる"
      },
      {
        "char": "持",
        "meaning": "cầm, có",
        "reading": "ジ / もつ"
      }
    ],
    "grammar": [
      {
        "pattern": "Vても いいです",
        "meaning": "Được phép làm V.",
        "example": "ここで しゃしんを とっても いいです。",
        "translation": "Có thể chụp ảnh ở đây."
      },
      {
        "pattern": "Vては いけません",
        "meaning": "Không được làm V.",
        "example": "ここで たばこを すってはいけません。",
        "translation": "Không được hút thuốc ở đây."
      },
      {
        "pattern": "Vて います",
        "meaning": "Diễn tả trạng thái / thói quen.",
        "example": "ハノイに すんでいます。",
        "translation": "Tôi đang sống ở Hà Nội."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "この",
          "vi": "này"
        },
        " びじゅつかんでは ",
        {
          "jp": "しゃしん",
          "vi": "ảnh"
        },
        "を とっても いいです。でも フラッシュを つかっては いけません。いすに ",
        {
          "jp": "すわって",
          "vi": "ngồi"
        },
        " みても いいです。"
      ],
      "questions": [
        {
          "q": "しゃしんを とっても いいですか。",
          "correct": "はい、いいです。",
          "answers": [
            "はい、いいです。",
            "いいえ、だめです。",
            "そとだけ いいです。",
            "わかりません。"
          ]
        },
        {
          "q": "なにを つかっては いけませんか。",
          "correct": "フラッシュ",
          "answers": [
            "フラッシュ",
            "いす",
            "カメラ",
            "けいたい"
          ]
        }
      ]
    },
    "title": "Bài 15",
    "sourcePages": [
      115,
      116
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 16,
    "theme": "Nối hành động & trình tự",
    "vocab": [
      {
        "jp": "乗ります[電車に～]",
        "kana": "のります[でんしゃに～]",
        "reading": "norimasu",
        "vi": "đi, lên [tàu]"
      },
      {
        "jp": "降ります[電車を～]",
        "kana": "おります[でんしゃを～]",
        "reading": "orimasu",
        "vi": "xuống [tàu]"
      },
      {
        "jp": "乗り換えます",
        "kana": "のりかえます",
        "reading": "norikaemasu",
        "vi": "chuyển, đổi (tàu)"
      },
      {
        "jp": "浴びます[シャワーを～]",
        "kana": "あびます[シャワーを～]",
        "reading": "abimasu",
        "vi": "tắm [vòi hoa sen]"
      },
      {
        "jp": "入れます",
        "kana": "いれます",
        "reading": "iremasu",
        "vi": "cho vào, bỏ vào"
      },
      {
        "jp": "出します",
        "kana": "だします",
        "reading": "dashimasu",
        "vi": "lấy ra, đưa ra, gửi"
      },
      {
        "jp": "下ろします[お金を～]",
        "kana": "おろします[おかねを～]",
        "reading": "oroshimasu",
        "vi": "rút [tiền]"
      },
      {
        "jp": "入ります[大学に～]",
        "kana": "はいります[だいがくに～]",
        "reading": "hairimasu",
        "vi": "vào [đại học]"
      },
      {
        "jp": "出ます[大学を～]",
        "kana": "でます[だいがくを～]",
        "reading": "demasu",
        "vi": "ra, tốt nghiệp [đại học]"
      },
      {
        "jp": "押します",
        "kana": "おします",
        "reading": "oshimasu",
        "vi": "bấm, ấn"
      },
      {
        "jp": "飲みます",
        "kana": "のみます",
        "reading": "nomimasu",
        "vi": "uống (bia, rượu)"
      },
      {
        "jp": "始めます",
        "kana": "はじめます",
        "reading": "hajimemasu",
        "vi": "bắt đầu"
      },
      {
        "jp": "見学します",
        "kana": "けんがくします",
        "reading": "kengakushimasu",
        "vi": "tham quan kiến tập"
      },
      {
        "jp": "電話します",
        "kana": "でんわします",
        "reading": "denwashimasu",
        "vi": "gọi điện thoại"
      },
      {
        "jp": "若い",
        "kana": "わかい",
        "reading": "wakai",
        "vi": "trẻ"
      },
      {
        "jp": "長い",
        "kana": "ながい",
        "reading": "nagai",
        "vi": "dài"
      },
      {
        "jp": "短い",
        "kana": "みじかい",
        "reading": "mijikai",
        "vi": "ngắn"
      },
      {
        "jp": "明るい",
        "kana": "あかるい",
        "reading": "akarui",
        "vi": "sáng"
      },
      {
        "jp": "暗い",
        "kana": "くらい",
        "reading": "kurai",
        "vi": "tối"
      },
      {
        "jp": "体",
        "kana": "からだ",
        "reading": "karada",
        "vi": "người, cơ thể"
      },
      {
        "jp": "頭",
        "kana": "あたま",
        "reading": "atama",
        "vi": "đầu"
      },
      {
        "jp": "髪",
        "kana": "かみ",
        "reading": "kami",
        "vi": "tóc"
      },
      {
        "jp": "顔",
        "kana": "かお",
        "reading": "kao",
        "vi": "mặt"
      },
      {
        "jp": "目",
        "kana": "め",
        "reading": "me",
        "vi": "mắt"
      },
      {
        "jp": "耳",
        "kana": "みみ",
        "reading": "mimi",
        "vi": "tai"
      },
      {
        "jp": "鼻",
        "kana": "はな",
        "reading": "hana",
        "vi": "mũi"
      },
      {
        "jp": "口",
        "kana": "くち",
        "reading": "kuchi",
        "vi": "miệng"
      },
      {
        "jp": "歯",
        "kana": "は",
        "reading": "ha",
        "vi": "răng"
      },
      {
        "jp": "おなか",
        "kana": "おなか",
        "reading": "onaka",
        "vi": "bụng"
      },
      {
        "jp": "足",
        "kana": "あし",
        "reading": "ashi",
        "vi": "chân"
      },
      {
        "jp": "背",
        "kana": "せ",
        "reading": "se",
        "vi": "chiều cao (cơ thể)"
      },
      {
        "jp": "サービス",
        "kana": "サービス",
        "reading": "saabisu",
        "vi": "dịch vụ"
      },
      {
        "jp": "ジョギング",
        "kana": "ジョギング",
        "reading": "jogingu",
        "vi": "việc chạy bộ"
      },
      {
        "jp": "シャワー",
        "kana": "シャワー",
        "reading": "shawaa",
        "vi": "vòi hoa sen"
      },
      {
        "jp": "緑",
        "kana": "みどり",
        "reading": "midori",
        "vi": "màu xanh lá cây, cây xanh"
      },
      {
        "jp": "[お]寺",
        "kana": "[お]てら",
        "reading": "tera",
        "vi": "chùa"
      },
      {
        "jp": "神社",
        "kana": "じんじゃ",
        "reading": "jinja",
        "vi": "đền thờ đạo Thần"
      },
      {
        "jp": "～番",
        "kana": "～ばん",
        "reading": "ban",
        "vi": "số ~"
      },
      {
        "jp": "どうやって",
        "kana": "どうやって",
        "reading": "douyatte",
        "vi": "làm thế nào ~"
      },
      {
        "jp": "どの～",
        "kana": "どの～",
        "reading": "dono",
        "vi": "~ nào (trong ba thứ trở lên)"
      },
      {
        "jp": "どれ",
        "kana": "どれ",
        "reading": "dore",
        "vi": "cái nào (trong ba cái hoặc nhiều hơn)"
      },
      {
        "jp": "すごいですね。",
        "kana": "すごいですね。",
        "reading": "sugoidesune",
        "vi": "Thật là tuyệt vời!/Kinh quá nhỉ!"
      },
      {
        "jp": "[いいえ、]まだまだです。",
        "kana": "[いいえ、]まだまだです。",
        "reading": "madamadadesu",
        "vi": "[Không,] tôi còn phải cố gắng nhiều lắm."
      },
      {
        "jp": "お引き出しですか。",
        "kana": "おひきだしですか。",
        "reading": "ohikidashidesuka",
        "vi": "Anh/Chị rút tiền ạ?"
      },
      {
        "jp": "まず",
        "kana": "まず",
        "reading": "mazu",
        "vi": "trước hết, đầu tiên"
      },
      {
        "jp": "次に",
        "kana": "つぎに",
        "reading": "tsugini",
        "vi": "tiếp theo, sau đó"
      },
      {
        "jp": "キャッシュカード",
        "kana": "キャッシュカード",
        "reading": "kyasshukaado",
        "vi": "thẻ rút tiền mặt, thẻ ATM"
      },
      {
        "jp": "暗証番号",
        "kana": "あんしょうばんごう",
        "reading": "anshoubangou",
        "vi": "mã số bí mật, mật khẩu"
      },
      {
        "jp": "金額",
        "kana": "きんがく",
        "reading": "kingaku",
        "vi": "số tiền, khoản tiền"
      },
      {
        "jp": "確認",
        "kana": "かくにん",
        "reading": "kakunin",
        "vi": "sự xác nhận, sự kiểm tra lại"
      },
      {
        "jp": "ボタン",
        "kana": "ボタン",
        "reading": "botan",
        "vi": "nút"
      },
      {
        "jp": "JR",
        "kana": "JR",
        "reading": "jeiaaru",
        "vi": "Công ty Đường sắt Nhật Bản"
      },
      {
        "jp": "雪祭り",
        "kana": "ゆきまつり",
        "reading": "yukimatsuri",
        "vi": "Lễ hội tuyết"
      },
      {
        "jp": "バンドン",
        "kana": "バンドン",
        "reading": "bandon",
        "vi": "Bandung (ở Indonesia)"
      },
      {
        "jp": "フランケン",
        "kana": "フランケン",
        "reading": "furanken",
        "vi": "Franken (ở Đức)"
      },
      {
        "jp": "ベラクルス",
        "kana": "ベラクルス",
        "reading": "berakurusu",
        "vi": "Veracruz (ở Mexico)"
      },
      {
        "jp": "梅田",
        "kana": "うめだ",
        "reading": "umeda",
        "vi": "tên một quận ở Osaka"
      },
      {
        "jp": "大学前",
        "kana": "だいがくまえ",
        "reading": "daigakumae",
        "vi": "tên điểm dừng xe buýt giả định"
      }
    ],
    "kanji": [
      {
        "char": "乗",
        "meaning": "lên xe",
        "reading": "ジョウ / のる"
      },
      {
        "char": "降",
        "meaning": "xuống",
        "reading": "コウ / おりる"
      },
      {
        "char": "長",
        "meaning": "dài, trưởng",
        "reading": "チョウ / ながい"
      }
    ],
    "grammar": [
      {
        "pattern": "Vて、Vて、それから V",
        "meaning": "Nối các hành động theo trình tự.",
        "example": "あさ おきて、シャワーを あびて、ごはんを たべます。",
        "translation": "Sáng thức dậy, tắm rồi ăn cơm."
      },
      {
        "pattern": "Vてから V",
        "meaning": "Sau khi làm V1 thì làm V2.",
        "example": "ごはんを たべてから べんきょうします。",
        "translation": "Ăn cơm xong thì học."
      },
      {
        "pattern": "Aくて／Aで",
        "meaning": "Nối tính từ.",
        "example": "この まちは しずかで きれいです。",
        "translation": "Thành phố này yên tĩnh và đẹp."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "まいあさ",
          "vi": "mỗi sáng"
        },
        " 6じに おきて、シャワーを ",
        {
          "jp": "あびて",
          "vi": "tắm"
        },
        "、あさごはんを たべます。それから バスに ",
        {
          "jp": "のって",
          "vi": "lên xe"
        },
        "、えきで でんしゃに ",
        {
          "jp": "のりかえます",
          "vi": "chuyển tuyến"
        },
        "。"
      ],
      "questions": [
        {
          "q": "シャワーの あとで なにを しますか。",
          "correct": "あさごはんを たべます",
          "answers": [
            "あさごはんを たべます",
            "ねます",
            "べんきょうします",
            "でんしゃに のります"
          ]
        },
        {
          "q": "えきで なにを しますか。",
          "correct": "でんしゃに のりかえます",
          "answers": [
            "でんしゃに のりかえます",
            "バスを まちます",
            "あるきます",
            "ごはんを たべます"
          ]
        }
      ]
    },
    "title": "Bài 16",
    "sourcePages": [
      121,
      122
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 17,
    "theme": "Thể ない & nghĩa vụ",
    "vocab": [
      {
        "jp": "覚えます",
        "kana": "おぼえます",
        "reading": "oboemasu",
        "vi": "nhớ"
      },
      {
        "jp": "忘れます",
        "kana": "わすれます",
        "reading": "wasuremasu",
        "vi": "quên"
      },
      {
        "jp": "なくします",
        "kana": "なくします",
        "reading": "nakushimasu",
        "vi": "làm mất, đánh mất"
      },
      {
        "jp": "払います",
        "kana": "はらいます",
        "reading": "haraimasu",
        "vi": "trả tiền"
      },
      {
        "jp": "返します",
        "kana": "かえします",
        "reading": "kaeshimasu",
        "vi": "trả lại"
      },
      {
        "jp": "出かけます",
        "kana": "でかけます",
        "reading": "dekakemasu",
        "vi": "ra ngoài"
      },
      {
        "jp": "脱ぎます",
        "kana": "ぬぎます",
        "reading": "nugimasu",
        "vi": "cởi (quần áo, giày, v.v.)"
      },
      {
        "jp": "持って行きます",
        "kana": "もっていきます",
        "reading": "motteikimasu",
        "vi": "mang đi, mang theo"
      },
      {
        "jp": "持って来ます",
        "kana": "もってきます",
        "reading": "mottekimasu",
        "vi": "mang đến"
      },
      {
        "jp": "心配します",
        "kana": "しんぱいします",
        "reading": "shinpaishimasu",
        "vi": "lo lắng"
      },
      {
        "jp": "残業します",
        "kana": "ざんぎょうします",
        "reading": "zangyoushimasu",
        "vi": "làm thêm giờ"
      },
      {
        "jp": "出張します",
        "kana": "しゅっちょうします",
        "reading": "shucchoushimasu",
        "vi": "đi công tác"
      },
      {
        "jp": "飲みます[薬を～]",
        "kana": "のみます[くすりを～]",
        "reading": "nomimasu",
        "vi": "uống [thuốc]"
      },
      {
        "jp": "入ります[おふろに～]",
        "kana": "はいります[おふろに～]",
        "reading": "hairimasu",
        "vi": "tắm bồn"
      },
      {
        "jp": "大切[な]",
        "kana": "たいせつ[な]",
        "reading": "taisetsu",
        "vi": "quan trọng, quý giá"
      },
      {
        "jp": "大丈夫[な]",
        "kana": "だいじょうぶ[な]",
        "reading": "daijoubu",
        "vi": "không sao, không có vấn đề gì"
      },
      {
        "jp": "危ない",
        "kana": "あぶない",
        "reading": "abunai",
        "vi": "nguy hiểm"
      },
      {
        "jp": "禁煙",
        "kana": "きんえん",
        "reading": "kinen",
        "vi": "cấm hút thuốc"
      },
      {
        "jp": "[健康]保険証",
        "kana": "[けんこう]ほけんしょう",
        "reading": "hokenshou",
        "vi": "thẻ bảo hiểm [y tế]"
      },
      {
        "jp": "熱",
        "kana": "ねつ",
        "reading": "netsu",
        "vi": "sốt"
      },
      {
        "jp": "病気",
        "kana": "びょうき",
        "reading": "byouki",
        "vi": "ốm, bệnh"
      },
      {
        "jp": "薬",
        "kana": "くすり",
        "reading": "kusuri",
        "vi": "thuốc"
      },
      {
        "jp": "[お]ふろ",
        "kana": "[お]ふろ",
        "reading": "furo",
        "vi": "bồn tắm"
      },
      {
        "jp": "上着",
        "kana": "うわぎ",
        "reading": "uwagi",
        "vi": "áo khoác"
      },
      {
        "jp": "下着",
        "kana": "したぎ",
        "reading": "shitagi",
        "vi": "quần áo lót"
      },
      {
        "jp": "2、3日",
        "kana": "に、さんにち",
        "reading": "nisannichi",
        "vi": "2, 3 ngày; vài ngày"
      },
      {
        "jp": "2、3～",
        "kana": "に、さん～",
        "reading": "nisan",
        "vi": "2, 3 ~; vài ~ (hậu tố đếm)"
      },
      {
        "jp": "～までに",
        "kana": "～までに",
        "reading": "madeni",
        "vi": "trước ~, cho đến trước ~ (giới hạn thời gian)"
      },
      {
        "jp": "ですから",
        "kana": "ですから",
        "reading": "desukara",
        "vi": "vì thế, vì vậy, do đó"
      },
      {
        "jp": "どうしましたか。",
        "kana": "どうしましたか。",
        "reading": "doushimashitaka",
        "vi": "Có vấn đề gì?/Anh/Chị bị làm sao?"
      },
      {
        "jp": "のど",
        "kana": "のど",
        "reading": "nodo",
        "vi": "họng"
      },
      {
        "jp": "[～が]痛いです。",
        "kana": "[～が]いたいです。",
        "reading": "itaidesu",
        "vi": "Tôi bị đau [~]."
      },
      {
        "jp": "かぜ",
        "kana": "かぜ",
        "reading": "kaze",
        "vi": "cảm, cúm"
      },
      {
        "jp": "それから",
        "kana": "それから",
        "reading": "sorekara",
        "vi": "và, sau đó"
      },
      {
        "jp": "お大事に。",
        "kana": "おだいじに。",
        "reading": "odaijini",
        "vi": "Anh/Chị nhớ giữ gìn sức khỏe."
      }
    ],
    "kanji": [
      {
        "char": "忘",
        "meaning": "quên",
        "reading": "ボウ / わすれる"
      },
      {
        "char": "薬",
        "meaning": "thuốc",
        "reading": "ヤク / くすり"
      },
      {
        "char": "返",
        "meaning": "trả lại",
        "reading": "ヘン / かえす"
      }
    ],
    "grammar": [
      {
        "pattern": "Vないで ください",
        "meaning": "Xin đừng làm V.",
        "example": "ここで あそばないでください。",
        "translation": "Xin đừng chơi ở đây."
      },
      {
        "pattern": "Vなければ なりません",
        "meaning": "Phải làm V.",
        "example": "くすりを のまなければ なりません。",
        "translation": "Phải uống thuốc."
      },
      {
        "pattern": "Vなくても いいです",
        "meaning": "Không cần phải làm V.",
        "example": "あした こなくても いいです。",
        "translation": "Ngày mai không cần đến."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "びょういん",
          "vi": "bệnh viện"
        },
        "へ いく とき、",
        {
          "jp": "ほけんしょう",
          "vi": "thẻ bảo hiểm"
        },
        "を ",
        {
          "jp": "わすれないで",
          "vi": "đừng quên"
        },
        " ください。せんせいの くすりは まいにち ",
        {
          "jp": "のまなければ なりません",
          "vi": "phải uống"
        },
        "。"
      ],
      "questions": [
        {
          "q": "びょういんへ なにを もっていきますか。",
          "correct": "ほけんしょう",
          "answers": [
            "ほけんしょう",
            "かさ",
            "じしょ",
            "カメラ"
          ]
        },
        {
          "q": "くすりは どうしますか。",
          "correct": "まいにち のみます",
          "answers": [
            "まいにち のみます",
            "のまなくても いいです",
            "すてます",
            "ともだちに あげます"
          ]
        }
      ]
    },
    "title": "Bài 17",
    "sourcePages": [
      127,
      128
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 18,
    "theme": "Thể từ điển & khả năng",
    "vocab": [
      {
        "jp": "できます",
        "kana": "できます",
        "reading": "dekimasu",
        "vi": "có thể"
      },
      {
        "jp": "洗います",
        "kana": "あらいます",
        "reading": "araimasu",
        "vi": "rửa"
      },
      {
        "jp": "弾きます",
        "kana": "ひきます",
        "reading": "hikimasu",
        "vi": "chơi (nhạc cụ, piano, v.v.)"
      },
      {
        "jp": "歌います",
        "kana": "うたいます",
        "reading": "utaimasu",
        "vi": "hát"
      },
      {
        "jp": "集めます",
        "kana": "あつめます",
        "reading": "atsumemasu",
        "vi": "sưu tầm, thu thập, tập hợp"
      },
      {
        "jp": "捨てます",
        "kana": "すてます",
        "reading": "sutemasu",
        "vi": "vứt, bỏ, bỏ đi"
      },
      {
        "jp": "換えます",
        "kana": "かえます",
        "reading": "kaemasu",
        "vi": "đổi, trao đổi"
      },
      {
        "jp": "運転します",
        "kana": "うんてんします",
        "reading": "untenshimasu",
        "vi": "lái"
      },
      {
        "jp": "予約します",
        "kana": "よやくします",
        "reading": "yoyakushimasu",
        "vi": "đặt chỗ, đặt trước"
      },
      {
        "jp": "ピアノ",
        "kana": "ピアノ",
        "reading": "piano",
        "vi": "đàn piano"
      },
      {
        "jp": "～メートル",
        "kana": "～メートル",
        "reading": "meetoru",
        "vi": "~ mét"
      },
      {
        "jp": "現金",
        "kana": "げんきん",
        "reading": "genkin",
        "vi": "tiền mặt"
      },
      {
        "jp": "趣味",
        "kana": "しゅみ",
        "reading": "shumi",
        "vi": "sở thích, thú vui"
      },
      {
        "jp": "日記",
        "kana": "にっき",
        "reading": "nikki",
        "vi": "nhật ký"
      },
      {
        "jp": "[お]祈り",
        "kana": "[お]いのり",
        "reading": "inori",
        "vi": "việc cầu nguyện"
      },
      {
        "jp": "課長",
        "kana": "かちょう",
        "reading": "kachou",
        "vi": "tổ trưởng"
      },
      {
        "jp": "部長",
        "kana": "ぶちょう",
        "reading": "buchou",
        "vi": "trưởng phòng"
      },
      {
        "jp": "社長",
        "kana": "しゃちょう",
        "reading": "shachou",
        "vi": "giám đốc"
      },
      {
        "jp": "動物",
        "kana": "どうぶつ",
        "reading": "doubutsu",
        "vi": "động vật"
      },
      {
        "jp": "馬",
        "kana": "うま",
        "reading": "uma",
        "vi": "ngựa"
      },
      {
        "jp": "インターネット",
        "kana": "インターネット",
        "reading": "intaanetto",
        "vi": "Internet"
      },
      {
        "jp": "特に",
        "kana": "とくに",
        "reading": "tokuni",
        "vi": "đặc biệt là"
      },
      {
        "jp": "へえ",
        "kana": "へえ",
        "reading": "hee",
        "vi": "Thế á! (biểu thị sự ngạc nhiên)"
      },
      {
        "jp": "それはおもしろいですね。",
        "kana": "それはおもしろいですね。",
        "reading": "sorehaomoshiroidesune",
        "vi": "(Điều đó/Cái đó) hay thật nhỉ."
      },
      {
        "jp": "なかなか",
        "kana": "なかなか",
        "reading": "nakanaka",
        "vi": "khó mà, mãi mà (dùng với thể phủ định)"
      },
      {
        "jp": "ほんとうですか。",
        "kana": "ほんとうですか。",
        "reading": "hontoudesuka",
        "vi": "Thật không ạ?"
      },
      {
        "jp": "ぜひ",
        "kana": "ぜひ",
        "reading": "zehi",
        "vi": "nhất định"
      },
      {
        "jp": "故郷",
        "kana": "ふるさと",
        "reading": "furusato",
        "vi": "Furusato; quê hương (cũng là tên một bài hát)"
      },
      {
        "jp": "ビートルズ",
        "kana": "ビートルズ",
        "reading": "biitoruzu",
        "vi": "Beatles (ban nhạc nổi tiếng của Anh)"
      },
      {
        "jp": "秋葉原",
        "kana": "あきはばら",
        "reading": "akihabara",
        "vi": "Akihabara, một quận ở Tokyo"
      }
    ],
    "kanji": [
      {
        "char": "歌",
        "meaning": "bài hát, hát",
        "reading": "カ / うた"
      },
      {
        "char": "集",
        "meaning": "tập hợp",
        "reading": "シュウ / あつめる"
      },
      {
        "char": "洗",
        "meaning": "rửa",
        "reading": "セン / あらう"
      }
    ],
    "grammar": [
      {
        "pattern": "V辞書形 ことが できます",
        "meaning": "Có thể làm V.",
        "example": "にほんごを はなすことが できます。",
        "translation": "Tôi có thể nói tiếng Nhật."
      },
      {
        "pattern": "わたしの しゅみは V辞書形 ことです",
        "meaning": "Sở thích của tôi là V.",
        "example": "しゅみは しゃしんを とることです。",
        "translation": "Sở thích của tôi là chụp ảnh."
      },
      {
        "pattern": "V辞書形／N の まえに",
        "meaning": "Trước khi làm V / trước N.",
        "example": "ねる まえに ほんを よみます。",
        "translation": "Trước khi ngủ tôi đọc sách."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "わたし",
          "vi": "tôi"
        },
        "の ",
        {
          "jp": "しゅみ",
          "vi": "sở thích"
        },
        "は おんがくです。",
        {
          "jp": "ピアノ",
          "vi": "đàn piano"
        },
        "を ひくことが ",
        {
          "jp": "できます",
          "vi": "có thể"
        },
        "。ねる まえに いつも 30ぷん ピアノを ひきます。"
      ],
      "questions": [
        {
          "q": "しゅみは なんですか。",
          "correct": "おんがく",
          "answers": [
            "おんがく",
            "スポーツ",
            "りょこう",
            "かいもの"
          ]
        },
        {
          "q": "いつ ピアノを ひきますか。",
          "correct": "ねる まえ",
          "answers": [
            "ねる まえ",
            "あさごはんの まえ",
            "がっこうの あと",
            "ひる"
          ]
        }
      ]
    },
    "title": "Bài 18",
    "sourcePages": [
      133,
      134
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 19,
    "theme": "Kinh nghiệm & liệt kê hành động",
    "vocab": [
      {
        "jp": "登ります",
        "kana": "のぼります",
        "reading": "noborimasu",
        "vi": "leo (núi), lên"
      },
      {
        "jp": "泊まります[ホテルに～]",
        "kana": "とまります[ホテルに～]",
        "reading": "tomarimasu",
        "vi": "trọ [ở khách sạn]"
      },
      {
        "jp": "掃除します",
        "kana": "そうじします",
        "reading": "soujishimasu",
        "vi": "dọn vệ sinh (căn phòng)"
      },
      {
        "jp": "洗濯します",
        "kana": "せんたくします",
        "reading": "sentakushimasu",
        "vi": "giặt (quần áo)"
      },
      {
        "jp": "なります",
        "kana": "なります",
        "reading": "narimasu",
        "vi": "trở thành, trở nên"
      },
      {
        "jp": "眠い",
        "kana": "ねむい",
        "reading": "nemui",
        "vi": "buồn ngủ"
      },
      {
        "jp": "強い",
        "kana": "つよい",
        "reading": "tsuyoi",
        "vi": "mạnh"
      },
      {
        "jp": "弱い",
        "kana": "よわい",
        "reading": "yowai",
        "vi": "yếu"
      },
      {
        "jp": "練習",
        "kana": "れんしゅう",
        "reading": "renshuu",
        "vi": "sự luyện tập"
      },
      {
        "jp": "ゴルフ",
        "kana": "ゴルフ",
        "reading": "gorufu",
        "vi": "gôn"
      },
      {
        "jp": "相撲",
        "kana": "すもう",
        "reading": "sumou",
        "vi": "môn vật Sumo"
      },
      {
        "jp": "お茶",
        "kana": "おちゃ",
        "reading": "ocha",
        "vi": "trà đạo"
      },
      {
        "jp": "日",
        "kana": "ひ",
        "reading": "hi",
        "vi": "ngày"
      },
      {
        "jp": "調子",
        "kana": "ちょうし",
        "reading": "choushi",
        "vi": "tình trạng, trạng thái"
      },
      {
        "jp": "一度",
        "kana": "いちど",
        "reading": "ichido",
        "vi": "một lần"
      },
      {
        "jp": "一度も",
        "kana": "いちども",
        "reading": "ichidomo",
        "vi": "chưa lần nào, chưa bao giờ (dùng với thể phủ định)"
      },
      {
        "jp": "だんだん",
        "kana": "だんだん",
        "reading": "dandan",
        "vi": "dần dần"
      },
      {
        "jp": "もうすぐ",
        "kana": "もうすぐ",
        "reading": "mousugu",
        "vi": "sắp, sắp sửa"
      },
      {
        "jp": "おかげさまで",
        "kana": "おかげさまで",
        "reading": "okagesamade",
        "vi": "Cảm ơn anh/chị; nhờ anh/chị mà ~."
      },
      {
        "jp": "でも",
        "kana": "でも",
        "reading": "demo",
        "vi": "nhưng"
      },
      {
        "jp": "乾杯",
        "kana": "かんぱい",
        "reading": "kanpai",
        "vi": "Cạn chén!/Nâng cốc!"
      },
      {
        "jp": "ダイエット",
        "kana": "ダイエット",
        "reading": "daietto",
        "vi": "việc ăn kiêng, chế độ giảm cân"
      },
      {
        "jp": "無理[な]",
        "kana": "むり[な]",
        "reading": "muri",
        "vi": "không thể, quá sức"
      },
      {
        "jp": "体にいい",
        "kana": "からだにいい",
        "reading": "karadaniii",
        "vi": "tốt cho sức khỏe"
      },
      {
        "jp": "東京スカイツリー",
        "kana": "とうきょうスカイツリー",
        "reading": "toukyousukaitsurii",
        "vi": "Tokyo Sky Tree"
      },
      {
        "jp": "葛飾北斎",
        "kana": "かつしかほくさい",
        "reading": "katsushikahokusai",
        "vi": "Katsushika Hokusai, họa sĩ nổi tiếng thời Edo"
      }
    ],
    "kanji": [
      {
        "char": "山",
        "meaning": "núi",
        "reading": "サン / やま"
      },
      {
        "char": "泊",
        "meaning": "trọ lại",
        "reading": "ハク / とまる"
      },
      {
        "char": "練",
        "meaning": "luyện",
        "reading": "レン"
      }
    ],
    "grammar": [
      {
        "pattern": "Vた ことが あります",
        "meaning": "Đã từng làm V.",
        "example": "ふじさんに のぼったことが あります。",
        "translation": "Tôi từng leo núi Phú Sĩ."
      },
      {
        "pattern": "Vたり Vたり します",
        "meaning": "Làm những việc như V1, V2.",
        "example": "にちようびは そうじしたり せんたくしたり します。",
        "translation": "Chủ nhật tôi dọn dẹp, giặt giũ, v.v."
      },
      {
        "pattern": "Aく／Nに なります",
        "meaning": "Trở nên / trở thành.",
        "example": "さむく なりました。",
        "translation": "Trời đã trở lạnh."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "きょねん",
          "vi": "năm ngoái"
        },
        " にほんへ いきました。",
        {
          "jp": "やま",
          "vi": "núi"
        },
        "に のぼったり、",
        {
          "jp": "りょかん",
          "vi": "nhà trọ Nhật"
        },
        "に ",
        {
          "jp": "とまったり",
          "vi": "ở trọ"
        },
        " しました。にほんの りょこうは とても たのしかったです。"
      ],
      "questions": [
        {
          "q": "いつ にほんへ いきましたか。",
          "correct": "きょねん",
          "answers": [
            "きょねん",
            "きのう",
            "らいねん",
            "せんしゅう"
          ]
        },
        {
          "q": "りょこうで なにを しましたか。",
          "correct": "やまに のぼりました",
          "answers": [
            "やまに のぼりました",
            "うみで およぎました",
            "しごとを しました",
            "がっこうへ いきました"
          ]
        }
      ]
    },
    "title": "Bài 19",
    "sourcePages": [
      139,
      140
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 20,
    "theme": "Thể thường & hội thoại thân mật",
    "vocab": [
      {
        "jp": "要ります[ビザが～]",
        "kana": "いります[ビザが～]",
        "reading": "irimasu",
        "vi": "cần [thị thực/visa]"
      },
      {
        "jp": "調べます",
        "kana": "しらべます",
        "reading": "shirabemasu",
        "vi": "tìm hiểu, kiểm tra, điều tra"
      },
      {
        "jp": "修理します",
        "kana": "しゅうりします",
        "reading": "shuurishimasu",
        "vi": "sửa chữa, tu sửa"
      },
      {
        "jp": "僕",
        "kana": "ぼく",
        "reading": "boku",
        "vi": "tôi, tớ (cách xưng thân mật của nam giới)"
      },
      {
        "jp": "君",
        "kana": "きみ",
        "reading": "kimi",
        "vi": "cậu, bạn (cách nói thân mật với người ngang hàng hoặc ít tuổi hơn)"
      },
      {
        "jp": "～君",
        "kana": "～くん",
        "reading": "kun",
        "vi": "anh ~, cậu ~ (cách gọi thân mật, thường dùng sau tên bé trai/nam giới trẻ)"
      },
      {
        "jp": "うん",
        "kana": "うん",
        "reading": "un",
        "vi": "ừ (thân mật của はい)"
      },
      {
        "jp": "ううん",
        "kana": "ううん",
        "reading": "uun",
        "vi": "không (thân mật của いいえ)"
      },
      {
        "jp": "ことば",
        "kana": "ことば",
        "reading": "kotoba",
        "vi": "từ, tiếng"
      },
      {
        "jp": "着物",
        "kana": "きもの",
        "reading": "kimono",
        "vi": "kimono (trang phục truyền thống Nhật Bản)"
      },
      {
        "jp": "ビザ",
        "kana": "ビザ",
        "reading": "biza",
        "vi": "thị thực, visa"
      },
      {
        "jp": "初め",
        "kana": "はじめ",
        "reading": "hajime",
        "vi": "ban đầu, đầu tiên"
      },
      {
        "jp": "終わり",
        "kana": "おわり",
        "reading": "owari",
        "vi": "kết thúc, hết phim"
      },
      {
        "jp": "こっち",
        "kana": "こっち",
        "reading": "kocchi",
        "vi": "phía này, chỗ này (thân mật của こちら)"
      },
      {
        "jp": "そっち",
        "kana": "そっち",
        "reading": "socchi",
        "vi": "phía đó, chỗ đó (thân mật của そちら)"
      },
      {
        "jp": "あっち",
        "kana": "あっち",
        "reading": "acchi",
        "vi": "phía kia, chỗ kia (thân mật của あちら)"
      },
      {
        "jp": "どっち",
        "kana": "どっち",
        "reading": "docchi",
        "vi": "cái nào (giữa hai cái), phía nào, đâu (thân mật của どちら)"
      },
      {
        "jp": "みんなで",
        "kana": "みんなで",
        "reading": "minnade",
        "vi": "mọi người cùng"
      },
      {
        "jp": "～けど",
        "kana": "～けど",
        "reading": "kedo",
        "vi": "~, nhưng (cách nói thân mật của が)"
      },
      {
        "jp": "おなかがいっぱいです",
        "kana": "おなかがいっぱいです",
        "reading": "onakagaippaidesu",
        "vi": "(Tôi) no rồi"
      },
      {
        "jp": "よかったら",
        "kana": "よかったら",
        "reading": "yokattara",
        "vi": "nếu anh/chị thích thì"
      },
      {
        "jp": "いろいろ",
        "kana": "いろいろ",
        "reading": "iroiro",
        "vi": "nhiều thứ"
      }
    ],
    "kanji": [
      {
        "char": "言",
        "meaning": "nói, lời",
        "reading": "ゲン / いう"
      },
      {
        "char": "調",
        "meaning": "điều tra",
        "reading": "チョウ / しらべる"
      },
      {
        "char": "直",
        "meaning": "sửa, thẳng",
        "reading": "チョク / なおす"
      }
    ],
    "grammar": [
      {
        "pattern": "普通形",
        "meaning": "Thể thường dùng trong hội thoại thân mật.",
        "example": "あした いく？― うん、いく。",
        "translation": "Mai đi không? — Ừ, đi."
      },
      {
        "pattern": "Vる？／Vない？",
        "meaning": "Câu hỏi thân mật.",
        "example": "コーヒー のむ？",
        "translation": "Uống cà phê không?"
      },
      {
        "pattern": "N／なA だ",
        "meaning": "Dạng thường của です.",
        "example": "きょうは ひまだ。",
        "translation": "Hôm nay rảnh."
      }
    ],
    "reading": {
      "tokens": [
        "A：「あした ひま？」 B：「",
        {
          "jp": "うん",
          "vi": "ừ"
        },
        "、ひまだよ。」 A：「じゃ、えいが ",
        {
          "jp": "みる",
          "vi": "xem"
        },
        "？」 B：「いいね。でも じかんを ",
        {
          "jp": "しらべる",
          "vi": "tra cứu"
        },
        "ね。」"
      ],
      "questions": [
        {
          "q": "Bさんは あした ひまですか。",
          "correct": "はい、ひまです",
          "answers": [
            "はい、ひまです",
            "いいえ、いそがしいです",
            "わかりません",
            "しごとです"
          ]
        },
        {
          "q": "ふたりは なにを したいですか。",
          "correct": "えいがを みたいです",
          "answers": [
            "えいがを みたいです",
            "べんきょうしたいです",
            "りょこうしたいです",
            "かいものしたいです"
          ]
        }
      ]
    },
    "title": "Bài 20",
    "sourcePages": [
      145,
      146
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 21,
    "theme": "Ý kiến & lời nói gián tiếp",
    "vocab": [
      {
        "jp": "思います",
        "kana": "おもいます",
        "reading": "omoimasu",
        "vi": "nghĩ"
      },
      {
        "jp": "言います",
        "kana": "いいます",
        "reading": "iimasu",
        "vi": "nói"
      },
      {
        "jp": "勝ちます",
        "kana": "かちます",
        "reading": "kachimasu",
        "vi": "thắng"
      },
      {
        "jp": "負けます",
        "kana": "まけます",
        "reading": "makemasu",
        "vi": "thua"
      },
      {
        "jp": "あります[お祭りが～]",
        "kana": "あります[おまつりが～]",
        "reading": "arimasu",
        "vi": "[lễ hội] được tổ chức, diễn ra"
      },
      {
        "jp": "役に立ちます",
        "kana": "やくにたちます",
        "reading": "yakunitachimasu",
        "vi": "hữu ích, giúp ích"
      },
      {
        "jp": "動きます",
        "kana": "うごきます",
        "reading": "ugokimasu",
        "vi": "chuyển động, chạy"
      },
      {
        "jp": "やめます[会社を～]",
        "kana": "やめます[かいしゃを～]",
        "reading": "yamemasu",
        "vi": "bỏ, thôi [việc/công ty]"
      },
      {
        "jp": "気をつけます",
        "kana": "きをつけます",
        "reading": "kiotsukemasu",
        "vi": "chú ý, bảo trọng"
      },
      {
        "jp": "留学します",
        "kana": "りゅうがくします",
        "reading": "ryuugakushimasu",
        "vi": "du học"
      },
      {
        "jp": "むだ[な]",
        "kana": "むだ[な]",
        "reading": "muda",
        "vi": "lãng phí, vô ích"
      },
      {
        "jp": "不便[な]",
        "kana": "ふべん[な]",
        "reading": "fuben",
        "vi": "bất tiện"
      },
      {
        "jp": "すごい",
        "kana": "すごい",
        "reading": "sugoi",
        "vi": "ghê quá, giỏi quá (bày tỏ sự ngạc nhiên/thán phục)"
      },
      {
        "jp": "ほんとう",
        "kana": "ほんとう",
        "reading": "hontou",
        "vi": "sự thật"
      },
      {
        "jp": "うそ",
        "kana": "うそ",
        "reading": "uso",
        "vi": "sự giả dối, lời nói dối"
      },
      {
        "jp": "自動車",
        "kana": "じどうしゃ",
        "reading": "jidousha",
        "vi": "ô tô, xe hơi"
      },
      {
        "jp": "交通",
        "kana": "こうつう",
        "reading": "koutsuu",
        "vi": "giao thông, đi lại"
      },
      {
        "jp": "物価",
        "kana": "ぶっか",
        "reading": "bukka",
        "vi": "giá cả, mức giá, vật giá"
      },
      {
        "jp": "放送",
        "kana": "ほうそう",
        "reading": "housou",
        "vi": "phát sóng, phát thanh"
      },
      {
        "jp": "ニュース",
        "kana": "ニュース",
        "reading": "nyuusu",
        "vi": "tin tức, bản tin"
      },
      {
        "jp": "アニメ",
        "kana": "アニメ",
        "reading": "anime",
        "vi": "phim hoạt hình Nhật Bản"
      },
      {
        "jp": "マンガ",
        "kana": "マンガ",
        "reading": "manga",
        "vi": "truyện tranh"
      },
      {
        "jp": "デザイン",
        "kana": "デザイン",
        "reading": "dezain",
        "vi": "thiết kế"
      },
      {
        "jp": "夢",
        "kana": "ゆめ",
        "reading": "yume",
        "vi": "giấc mơ"
      },
      {
        "jp": "天才",
        "kana": "てんさい",
        "reading": "tensai",
        "vi": "thiên tài"
      },
      {
        "jp": "試合",
        "kana": "しあい",
        "reading": "shiai",
        "vi": "trận đấu"
      },
      {
        "jp": "意見",
        "kana": "いけん",
        "reading": "iken",
        "vi": "ý kiến"
      },
      {
        "jp": "話",
        "kana": "はなし",
        "reading": "hanashi",
        "vi": "câu chuyện, bài nói chuyện"
      },
      {
        "jp": "地球",
        "kana": "ちきゅう",
        "reading": "chikyuu",
        "vi": "Trái Đất"
      },
      {
        "jp": "月",
        "kana": "つき",
        "reading": "tsuki",
        "vi": "Mặt Trăng, trăng"
      },
      {
        "jp": "最近",
        "kana": "さいきん",
        "reading": "saikin",
        "vi": "gần đây"
      },
      {
        "jp": "たぶん",
        "kana": "たぶん",
        "reading": "tabun",
        "vi": "chắc, có thể"
      },
      {
        "jp": "きっと",
        "kana": "きっと",
        "reading": "kitto",
        "vi": "chắc chắn, nhất định"
      },
      {
        "jp": "ほんとうに",
        "kana": "ほんとうに",
        "reading": "hontouni",
        "vi": "thật sự"
      },
      {
        "jp": "そんなに",
        "kana": "そんなに",
        "reading": "sonnani",
        "vi": "(không) ~ lắm"
      },
      {
        "jp": "～について",
        "kana": "～について",
        "reading": "nitsuite",
        "vi": "về ~"
      },
      {
        "jp": "久しぶりですね。",
        "kana": "ひさしぶりですね。",
        "reading": "hisashiburidesune",
        "vi": "Đã lâu không gặp anh/chị."
      },
      {
        "jp": "～でも飲みませんか。",
        "kana": "～でものみませんか。",
        "reading": "demonomimasenka",
        "vi": "Anh/Chị uống ~ (hay gì đó) nhé?"
      },
      {
        "jp": "もちろん",
        "kana": "もちろん",
        "reading": "mochiron",
        "vi": "tất nhiên, dĩ nhiên"
      },
      {
        "jp": "もう帰らないと…。",
        "kana": "もうかえらないと…。",
        "reading": "moukaeranaito",
        "vi": "Tôi phải về bây giờ, không thì…"
      },
      {
        "jp": "アインシュタイン",
        "kana": "アインシュタイン",
        "reading": "ainshutain",
        "vi": "Albert Einstein"
      },
      {
        "jp": "ガガーリン",
        "kana": "ガガーリン",
        "reading": "gagaarin",
        "vi": "Yuri Alekseyevich Gagarin"
      },
      {
        "jp": "ガリレオ",
        "kana": "ガリレオ",
        "reading": "garireo",
        "vi": "Galileo Galilei"
      },
      {
        "jp": "キング牧師",
        "kana": "キングぼくし",
        "reading": "kingubokushi",
        "vi": "Mục sư Martin Luther King Jr."
      },
      {
        "jp": "フランクリン",
        "kana": "フランクリン",
        "reading": "furankurin",
        "vi": "Benjamin Franklin"
      },
      {
        "jp": "かぐや姫",
        "kana": "かぐやひめ",
        "reading": "kaguyahime",
        "vi": "Công chúa Kaguya"
      },
      {
        "jp": "天神祭",
        "kana": "てんじんまつり",
        "reading": "tenjinmatsuri",
        "vi": "Lễ hội Tenjin ở Osaka"
      },
      {
        "jp": "吉野山",
        "kana": "よしのやま",
        "reading": "yoshinoyama",
        "vi": "Núi Yoshino ở tỉnh Nara"
      },
      {
        "jp": "カンガルー",
        "kana": "カンガルー",
        "reading": "kangaruu",
        "vi": "con căng-gu-ru"
      },
      {
        "jp": "キャプテン・クック",
        "kana": "キャプテン・クック",
        "reading": "kyaputen kukku",
        "vi": "Thuyền trưởng Cook"
      },
      {
        "jp": "ヨーネン",
        "kana": "ヨーネン",
        "reading": "yoonen",
        "vi": "tên công ty giả định"
      }
    ],
    "kanji": [
      {
        "char": "思",
        "meaning": "nghĩ",
        "reading": "シ / おもう"
      },
      {
        "char": "言",
        "meaning": "nói",
        "reading": "ゲン / いう"
      },
      {
        "char": "勝",
        "meaning": "thắng",
        "reading": "ショウ / かつ"
      }
    ],
    "grammar": [
      {
        "pattern": "普通形 と おもいます",
        "meaning": "Tôi nghĩ rằng...",
        "example": "あした あめが ふると おもいます。",
        "translation": "Tôi nghĩ ngày mai trời sẽ mưa."
      },
      {
        "pattern": "「～」と いいます",
        "meaning": "Nói rằng / nói “...”.",
        "example": "せんせいは「がんばって」と いいました。",
        "translation": "Giáo viên nói “Cố lên”."
      },
      {
        "pattern": "～でしょう？",
        "meaning": "... phải không? / nhỉ?",
        "example": "あした ひまでしょう？",
        "translation": "Ngày mai bạn rảnh nhỉ?"
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "ニュース",
          "vi": "tin tức"
        },
        "を みました。あした サッカーの ",
        {
          "jp": "しあい",
          "vi": "trận đấu"
        },
        "が あります。わたしは ベトナムが ",
        {
          "jp": "かつ",
          "vi": "thắng"
        },
        "と ",
        {
          "jp": "おもいます",
          "vi": "nghĩ"
        },
        "。ともだちも「ベトナムは つよい」と ",
        {
          "jp": "いいました",
          "vi": "đã nói"
        },
        "。"
      ],
      "questions": [
        {
          "q": "あした なにが ありますか。",
          "correct": "サッカーの しあい",
          "answers": [
            "サッカーの しあい",
            "テスト",
            "りょこう",
            "やすみ"
          ]
        },
        {
          "q": "わたしは どこが かつと おもいますか。",
          "correct": "ベトナム",
          "answers": [
            "ベトナム",
            "にほん",
            "タイ",
            "わかりません"
          ]
        }
      ]
    },
    "title": "Bài 21",
    "sourcePages": [
      151,
      152
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 22,
    "theme": "Mệnh đề bổ nghĩa danh từ",
    "vocab": [
      {
        "jp": "着ます",
        "kana": "きます",
        "reading": "kimasu",
        "vi": "mặc (áo sơ mi, v.v.)"
      },
      {
        "jp": "はきます",
        "kana": "はきます",
        "reading": "hakimasu",
        "vi": "đi, mặc (giày, quần âu, v.v.)"
      },
      {
        "jp": "かぶります",
        "kana": "かぶります",
        "reading": "kaburimasu",
        "vi": "đội (mũ, v.v.)"
      },
      {
        "jp": "かけます[めがねを～]",
        "kana": "かけます[めがねを～]",
        "reading": "kakemasu",
        "vi": "đeo [kính]"
      },
      {
        "jp": "します[ネクタイを～]",
        "kana": "します[ネクタイを～]",
        "reading": "shimasu",
        "vi": "đeo [cà vạt]"
      },
      {
        "jp": "生まれます",
        "kana": "うまれます",
        "reading": "umaremasu",
        "vi": "sinh ra"
      },
      {
        "jp": "わたしたち",
        "kana": "わたしたち",
        "reading": "watashitachi",
        "vi": "chúng tôi, chúng ta"
      },
      {
        "jp": "コート",
        "kana": "コート",
        "reading": "kooto",
        "vi": "áo khoác"
      },
      {
        "jp": "セーター",
        "kana": "セーター",
        "reading": "seetaa",
        "vi": "áo len"
      },
      {
        "jp": "スーツ",
        "kana": "スーツ",
        "reading": "suutsu",
        "vi": "com-lê, vét"
      },
      {
        "jp": "帽子",
        "kana": "ぼうし",
        "reading": "boushi",
        "vi": "mũ"
      },
      {
        "jp": "眼鏡",
        "kana": "めがね",
        "reading": "megane",
        "vi": "kính"
      },
      {
        "jp": "ケーキ",
        "kana": "ケーキ",
        "reading": "keeki",
        "vi": "bánh ngọt"
      },
      {
        "jp": "[お]弁当",
        "kana": "[お]べんとう",
        "reading": "bentou",
        "vi": "cơm hộp"
      },
      {
        "jp": "ロボット",
        "kana": "ロボット",
        "reading": "robotto",
        "vi": "rô-bốt"
      },
      {
        "jp": "ユーモア",
        "kana": "ユーモア",
        "reading": "yuumoa",
        "vi": "sự hài hước"
      },
      {
        "jp": "都合",
        "kana": "つごう",
        "reading": "tsugou",
        "vi": "(sự) thích hợp"
      },
      {
        "jp": "よく",
        "kana": "よく",
        "reading": "yoku",
        "vi": "thường, hay"
      },
      {
        "jp": "えーと",
        "kana": "えーと",
        "reading": "eeto",
        "vi": "ừm, à…"
      },
      {
        "jp": "おめでとう[ございます]。",
        "kana": "おめでとう[ございます]。",
        "reading": "omedetou",
        "vi": "Chúc mừng."
      },
      {
        "jp": "お探しですか。",
        "kana": "おさがしですか。",
        "reading": "osagashidesuka",
        "vi": "Anh/Chị tìm ~ à?"
      },
      {
        "jp": "では",
        "kana": "では",
        "reading": "deha",
        "vi": "Thế/Vậy (nhé)"
      },
      {
        "jp": "こちら",
        "kana": "こちら",
        "reading": "kochira",
        "vi": "đây, cái này (cách nói lịch sự của これ)"
      },
      {
        "jp": "家賃",
        "kana": "やちん",
        "reading": "yachin",
        "vi": "tiền thuê nhà"
      },
      {
        "jp": "ダイニングキッチン",
        "kana": "ダイニングキッチン",
        "reading": "dainingukicchin",
        "vi": "bếp kèm phòng ăn"
      },
      {
        "jp": "和室",
        "kana": "わしつ",
        "reading": "washitsu",
        "vi": "phòng kiểu Nhật"
      },
      {
        "jp": "押し入れ",
        "kana": "おしいれ",
        "reading": "oshiire",
        "vi": "chỗ để chăn gối, đệm trong phòng kiểu Nhật"
      },
      {
        "jp": "布団",
        "kana": "ふとん",
        "reading": "futon",
        "vi": "chăn, đệm kiểu Nhật"
      },
      {
        "jp": "パリ",
        "kana": "パリ",
        "reading": "pari",
        "vi": "Paris"
      },
      {
        "jp": "万里の長城",
        "kana": "ばんりのちょうじょう",
        "reading": "banrinochoujou",
        "vi": "Vạn Lý Trường Thành"
      },
      {
        "jp": "みんなのアンケート",
        "kana": "みんなのアンケート",
        "reading": "minnanoankeeto",
        "vi": "tiêu đề của bảng điều tra giả định"
      }
    ],
    "kanji": [
      {
        "char": "着",
        "meaning": "mặc, đến",
        "reading": "チャク / きる"
      },
      {
        "char": "生",
        "meaning": "sinh, sống",
        "reading": "セイ / うまれる"
      },
      {
        "char": "帽",
        "meaning": "mũ",
        "reading": "ボウ"
      }
    ],
    "grammar": [
      {
        "pattern": "普通形 + N",
        "meaning": "Mệnh đề đứng trước bổ nghĩa danh từ.",
        "example": "これは わたしが きのう かった ほんです。",
        "translation": "Đây là cuốn sách tôi mua hôm qua."
      },
      {
        "pattern": "N が V + N",
        "meaning": "Chủ ngữ trong mệnh đề bổ nghĩa thường dùng が.",
        "example": "あそこに いる ひとは だれですか。",
        "translation": "Người đang ở đằng kia là ai?"
      },
      {
        "pattern": "Vる 時間／約束",
        "meaning": "Danh từ được bổ nghĩa bởi hành động.",
        "example": "ほんを よむ じかんが ありません。",
        "translation": "Tôi không có thời gian đọc sách."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "あそこ",
          "vi": "đằng kia"
        },
        "に ",
        {
          "jp": "めがね",
          "vi": "kính"
        },
        "を かけている ",
        {
          "jp": "ひと",
          "vi": "người"
        },
        "は たなかさんです。たなかさんが ",
        {
          "jp": "きている",
          "vi": "đang mặc"
        },
        " シャツは きのう かった シャツです。"
      ],
      "questions": [
        {
          "q": "たなかさんは なにを かけていますか。",
          "correct": "めがね",
          "answers": [
            "めがね",
            "ぼうし",
            "マスク",
            "ネクタイ"
          ]
        },
        {
          "q": "シャツは いつ かいましたか。",
          "correct": "きのう",
          "answers": [
            "きのう",
            "きょう",
            "せんしゅう",
            "らいげつ"
          ]
        }
      ]
    },
    "title": "Bài 22",
    "sourcePages": [
      157,
      158
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 23,
    "theme": "Khi... & điều kiện tự nhiên",
    "vocab": [
      {
        "jp": "聞きます[先生に～]",
        "kana": "ききます[せんせいに～]",
        "reading": "kikimasu",
        "vi": "hỏi [giáo viên]"
      },
      {
        "jp": "回します",
        "kana": "まわします",
        "reading": "mawashimasu",
        "vi": "vặn"
      },
      {
        "jp": "引きます",
        "kana": "ひきます",
        "reading": "hikimasu",
        "vi": "kéo"
      },
      {
        "jp": "変えます",
        "kana": "かえます",
        "reading": "kaemasu",
        "vi": "đổi"
      },
      {
        "jp": "触ります[ドアに～]",
        "kana": "さわります[ドアに～]",
        "reading": "sawarimasu",
        "vi": "sờ, chạm vào [cửa]"
      },
      {
        "jp": "出ます[お釣りが～]",
        "kana": "でます[おつりが～]",
        "reading": "demasu",
        "vi": "[tiền thừa] ra"
      },
      {
        "jp": "歩きます",
        "kana": "あるきます",
        "reading": "arukimasu",
        "vi": "đi bộ"
      },
      {
        "jp": "渡ります[橋を～]",
        "kana": "わたります[はしを～]",
        "reading": "watarimasu",
        "vi": "qua, đi qua [cầu]"
      },
      {
        "jp": "曲がります[右へ～]",
        "kana": "まがります[みぎへ～]",
        "reading": "magarimasu",
        "vi": "rẽ, quẹo [phải]"
      },
      {
        "jp": "寂しい",
        "kana": "さびしい",
        "reading": "sabishii",
        "vi": "buồn, cô đơn"
      },
      {
        "jp": "[お]湯",
        "kana": "[お]ゆ",
        "reading": "yu",
        "vi": "nước nóng"
      },
      {
        "jp": "音",
        "kana": "おと",
        "reading": "oto",
        "vi": "âm thanh"
      },
      {
        "jp": "サイズ",
        "kana": "サイズ",
        "reading": "saizu",
        "vi": "cỡ, kích cỡ"
      },
      {
        "jp": "故障",
        "kana": "こしょう",
        "reading": "koshou",
        "vi": "(sự) hỏng, hỏng hóc"
      },
      {
        "jp": "道",
        "kana": "みち",
        "reading": "michi",
        "vi": "đường, đường sá"
      },
      {
        "jp": "交差点",
        "kana": "こうさてん",
        "reading": "kousaten",
        "vi": "ngã tư"
      },
      {
        "jp": "信号",
        "kana": "しんごう",
        "reading": "shingou",
        "vi": "đèn tín hiệu"
      },
      {
        "jp": "角",
        "kana": "かど",
        "reading": "kado",
        "vi": "góc"
      },
      {
        "jp": "橋",
        "kana": "はし",
        "reading": "hashi",
        "vi": "cầu"
      },
      {
        "jp": "駐車場",
        "kana": "ちゅうしゃじょう",
        "reading": "chuushajou",
        "vi": "bãi đỗ xe"
      },
      {
        "jp": "建物",
        "kana": "たてもの",
        "reading": "tatemono",
        "vi": "tòa nhà"
      },
      {
        "jp": "何回も",
        "kana": "なんかいも",
        "reading": "nankaimo",
        "vi": "nhiều lần"
      },
      {
        "jp": "～目",
        "kana": "～め",
        "reading": "me",
        "vi": "thứ ~, số ~ (biểu thị thứ tự)"
      },
      {
        "jp": "聖徳太子",
        "kana": "しょうとくたいし",
        "reading": "shoutokutaishi",
        "vi": "Thái tử Shōtoku"
      },
      {
        "jp": "法隆寺",
        "kana": "ほうりゅうじ",
        "reading": "houryuuji",
        "vi": "Chùa Hōryūji ở Nara"
      },
      {
        "jp": "元気茶",
        "kana": "げんきちゃ",
        "reading": "genkicha",
        "vi": "tên trà giả định"
      },
      {
        "jp": "本田駅",
        "kana": "ほんだえき",
        "reading": "hondaeki",
        "vi": "tên ga giả định"
      },
      {
        "jp": "図書館前",
        "kana": "としょかんまえ",
        "reading": "toshokanmae",
        "vi": "tên điểm dừng xe buýt giả định"
      }
    ],
    "kanji": [
      {
        "char": "道",
        "meaning": "đường",
        "reading": "ドウ / みち"
      },
      {
        "char": "動",
        "meaning": "chuyển động",
        "reading": "ドウ / うごく"
      },
      {
        "char": "信",
        "meaning": "tin / tín hiệu",
        "reading": "シン"
      }
    ],
    "grammar": [
      {
        "pattern": "～とき",
        "meaning": "Khi...",
        "example": "ひまな とき、ほんを よみます。",
        "translation": "Khi rảnh tôi đọc sách."
      },
      {
        "pattern": "Vる と、～",
        "meaning": "Hễ / khi V thì kết quả tự nhiên xảy ra.",
        "example": "この ボタンを おすと、ドアが あきます。",
        "translation": "Nhấn nút này thì cửa mở."
      },
      {
        "pattern": "道を ききます",
        "meaning": "Hỏi đường.",
        "example": "えきへ いく みちを ききました。",
        "translation": "Tôi đã hỏi đường đến ga."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "えき",
          "vi": "nhà ga"
        },
        "へ いく ",
        {
          "jp": "みち",
          "vi": "đường"
        },
        "が わからない とき、けいさつかんに ききます。この ",
        {
          "jp": "しんごう",
          "vi": "đèn giao thông"
        },
        "が あおに なると、みちを わたることが できます。"
      ],
      "questions": [
        {
          "q": "みちが わからない とき、だれに ききますか。",
          "correct": "けいさつかん",
          "answers": [
            "けいさつかん",
            "せんせい",
            "いしゃ",
            "てんいん"
          ]
        },
        {
          "q": "いつ みちを わたることが できますか。",
          "correct": "しんごうが あおの とき",
          "answers": [
            "しんごうが あおの とき",
            "しんごうが あかの とき",
            "いつでも",
            "よるだけ"
          ]
        }
      ]
    },
    "title": "Bài 23",
    "sourcePages": [
      163,
      164
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 24,
    "theme": "Cho & nhận hành động",
    "vocab": [
      {
        "jp": "くれます",
        "kana": "くれます",
        "reading": "kuremasu",
        "vi": "cho, tặng (tôi)"
      },
      {
        "jp": "直します",
        "kana": "なおします",
        "reading": "naoshimasu",
        "vi": "chữa, sửa"
      },
      {
        "jp": "連れて行きます",
        "kana": "つれていきます",
        "reading": "tsureteikimasu",
        "vi": "dẫn (một ai đó) đi"
      },
      {
        "jp": "連れて来ます",
        "kana": "つれてきます",
        "reading": "tsuretekimasu",
        "vi": "dẫn (một ai đó) đến"
      },
      {
        "jp": "送ります[人を～]",
        "kana": "おくります[ひとを～]",
        "reading": "okurimasu",
        "vi": "tiễn [một ai đó]"
      },
      {
        "jp": "紹介します",
        "kana": "しょうかいします",
        "reading": "shoukaishimasu",
        "vi": "giới thiệu"
      },
      {
        "jp": "案内します",
        "kana": "あんないします",
        "reading": "annaishimasu",
        "vi": "hướng dẫn, giới thiệu, dẫn đường"
      },
      {
        "jp": "説明します",
        "kana": "せつめいします",
        "reading": "setsumeishimasu",
        "vi": "giải thích, trình bày"
      },
      {
        "jp": "おじいさん／おじいちゃん",
        "kana": "おじいさん／おじいちゃん",
        "reading": "ojiisanojiichan",
        "vi": "ông nội, ông ngoại, ông (cụ/lão)"
      },
      {
        "jp": "おばあさん／おばあちゃん",
        "kana": "おばあさん／おばあちゃん",
        "reading": "obaasanobaachan",
        "vi": "bà nội, bà ngoại, bà (cụ/lão)"
      },
      {
        "jp": "準備",
        "kana": "じゅんび",
        "reading": "junbi",
        "vi": "sự chuẩn bị"
      },
      {
        "jp": "引っ越し",
        "kana": "ひっこし",
        "reading": "hikkoshi",
        "vi": "sự chuyển nhà"
      },
      {
        "jp": "[お]菓子",
        "kana": "[お]かし",
        "reading": "kashi",
        "vi": "bánh kẹo"
      },
      {
        "jp": "ホームステイ",
        "kana": "ホームステイ",
        "reading": "hoomusutei",
        "vi": "homestay"
      },
      {
        "jp": "全部",
        "kana": "ぜんぶ",
        "reading": "zenbu",
        "vi": "toàn bộ, tất cả"
      },
      {
        "jp": "自分で",
        "kana": "じぶんで",
        "reading": "jibunde",
        "vi": "tự (mình)"
      },
      {
        "jp": "ほかに",
        "kana": "ほかに",
        "reading": "hokani",
        "vi": "ngoài ra, bên cạnh đó"
      },
      {
        "jp": "母の日",
        "kana": "ははのひ",
        "reading": "hahanohi",
        "vi": "Ngày của Mẹ"
      }
    ],
    "kanji": [
      {
        "char": "連",
        "meaning": "dẫn theo",
        "reading": "レン / つれる"
      },
      {
        "char": "紹",
        "meaning": "giới thiệu",
        "reading": "ショウ"
      },
      {
        "char": "介",
        "meaning": "giới thiệu / trung gian",
        "reading": "カイ"
      }
    ],
    "grammar": [
      {
        "pattern": "Vて あげます",
        "meaning": "Làm V cho người khác.",
        "example": "ともだちに にほんごを おしえてあげます。",
        "translation": "Tôi dạy tiếng Nhật cho bạn."
      },
      {
        "pattern": "Vて もらいます",
        "meaning": "Được ai đó làm V cho mình.",
        "example": "ともだちに しゃしんを とってもらいました。",
        "translation": "Tôi được bạn chụp ảnh cho."
      },
      {
        "pattern": "Vて くれます",
        "meaning": "Ai đó làm V cho tôi / phía tôi.",
        "example": "せんせいが ほんを かしてくれました。",
        "translation": "Giáo viên cho tôi mượn sách."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "らいしゅう",
          "vi": "tuần sau"
        },
        " りょこうします。ともだちが ホテルを よやくして ",
        {
          "jp": "くれました",
          "vi": "đã làm cho tôi"
        },
        "。わたしは ともだちの ",
        {
          "jp": "じゅんび",
          "vi": "chuẩn bị"
        },
        "を ",
        {
          "jp": "てつだってあげます",
          "vi": "sẽ giúp cho bạn"
        },
        "。"
      ],
      "questions": [
        {
          "q": "だれが ホテルを よやくしましたか。",
          "correct": "ともだち",
          "answers": [
            "ともだち",
            "わたし",
            "せんせい",
            "かぞく"
          ]
        },
        {
          "q": "わたしは なにを しますか。",
          "correct": "ともだちの じゅんびを てつだいます",
          "answers": [
            "ともだちの じゅんびを てつだいます",
            "ホテルを よやくします",
            "りょこうを やめます",
            "しごとを します"
          ]
        }
      ]
    },
    "title": "Bài 24",
    "sourcePages": [
      169,
      170
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  },
  {
    "id": 25,
    "theme": "Điều kiện ～たら & ～ても",
    "vocab": [
      {
        "jp": "考えます",
        "kana": "かんがえます",
        "reading": "kangaemasu",
        "vi": "nghĩ, suy nghĩ"
      },
      {
        "jp": "着きます",
        "kana": "つきます",
        "reading": "tsukimasu",
        "vi": "đến"
      },
      {
        "jp": "取ります[年を～]",
        "kana": "とります[としを～]",
        "reading": "torimasu",
        "vi": "có, thêm [tuổi]"
      },
      {
        "jp": "足ります",
        "kana": "たります",
        "reading": "tarimasu",
        "vi": "đủ"
      },
      {
        "jp": "田舎",
        "kana": "いなか",
        "reading": "inaka",
        "vi": "quê, nông thôn"
      },
      {
        "jp": "チャンス",
        "kana": "チャンス",
        "reading": "chansu",
        "vi": "cơ hội"
      },
      {
        "jp": "億",
        "kana": "おく",
        "reading": "oku",
        "vi": "một trăm triệu"
      },
      {
        "jp": "もし[～たら]",
        "kana": "もし[～たら]",
        "reading": "moshi",
        "vi": "nếu [~]"
      },
      {
        "jp": "意味",
        "kana": "いみ",
        "reading": "imi",
        "vi": "nghĩa, ý nghĩa"
      },
      {
        "jp": "もしもし",
        "kana": "もしもし",
        "reading": "moshimoshi",
        "vi": "A-lô"
      },
      {
        "jp": "転勤",
        "kana": "てんきん",
        "reading": "tenkin",
        "vi": "việc chuyển địa điểm làm việc, chuyển công tác"
      },
      {
        "jp": "こと",
        "kana": "こと",
        "reading": "koto",
        "vi": "việc, chuyện (～のこと: việc/chuyện về ~)"
      },
      {
        "jp": "暇",
        "kana": "ひま",
        "reading": "hima",
        "vi": "thời gian rảnh"
      },
      {
        "jp": "[いろいろ]お世話になりました。",
        "kana": "[いろいろ]おせわになりました。",
        "reading": "osewaninarimashita",
        "vi": "Cảm ơn anh/chị đã giúp đỡ tôi [nhiều]."
      },
      {
        "jp": "頑張ります",
        "kana": "がんばります",
        "reading": "ganbarimasu",
        "vi": "cố, cố gắng"
      },
      {
        "jp": "どうぞお元気で。",
        "kana": "どうぞおげんきで。",
        "reading": "douzoogenkide",
        "vi": "Chúc anh/chị mạnh khỏe; hãy bảo trọng."
      },
      {
        "jp": "ベトナム",
        "kana": "ベトナム",
        "reading": "betonamu",
        "vi": "Việt Nam"
      }
    ],
    "kanji": [
      {
        "char": "考",
        "meaning": "suy nghĩ",
        "reading": "コウ / かんがえる"
      },
      {
        "char": "着",
        "meaning": "đến nơi",
        "reading": "チャク / つく"
      },
      {
        "char": "金",
        "meaning": "tiền, vàng",
        "reading": "キン / かね"
      }
    ],
    "grammar": [
      {
        "pattern": "Vたら、～",
        "meaning": "Nếu / khi V thì...",
        "example": "ひまが あったら、えいがを みます。",
        "translation": "Nếu rảnh tôi sẽ xem phim."
      },
      {
        "pattern": "～ても、～",
        "meaning": "Dù ... thì vẫn...",
        "example": "あめが ふっても、いきます。",
        "translation": "Dù mưa tôi vẫn đi."
      },
      {
        "pattern": "もし ～たら",
        "meaning": "Nếu giả sử...",
        "example": "もし 100まんえん あったら、りょこうしたいです。",
        "translation": "Nếu có một triệu yên tôi muốn đi du lịch."
      }
    ],
    "reading": {
      "tokens": [
        {
          "jp": "もし",
          "vi": "nếu"
        },
        " らいねん にほんへ いったら、とうきょうと おおさかへ いきたいです。",
        {
          "jp": "おかね",
          "vi": "tiền"
        },
        "が すこし たかくても、しんかんせんに のりたいです。",
        {
          "jp": "じかん",
          "vi": "thời gian"
        },
        "が あったら、きょうとも みたいです。"
      ],
      "questions": [
        {
          "q": "らいねん どこへ いきたいですか。",
          "correct": "にほん",
          "answers": [
            "にほん",
            "ベトナム",
            "タイ",
            "アメリカ"
          ]
        },
        {
          "q": "じかんが あったら どこも みたいですか。",
          "correct": "きょうと",
          "answers": [
            "きょうと",
            "ほっかいどう",
            "おきなわ",
            "なごや"
          ]
        }
      ]
    },
    "title": "Bài 25",
    "sourcePages": [
      175,
      176
    ],
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)",
    "vocabAudit": "V11: soát lại theo mục I. Từ vựng trong PDF Minna no Nihongo người dùng cung cấp; sửa lỗi OCR ghép dòng/cột."
  }
];
