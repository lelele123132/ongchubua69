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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "từ điền"
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
        "vi": "béo"
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
        "vi": "số tay"
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
        "vi": "thẻ (tín dụng), các, cac"
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
        "vi": "bút chì kim, bút chì bắm"
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
        "vi": "6, dit"
      },
      {
        "jp": "かばん",
        "kana": "かばん",
        "reading": "kaban",
        "vi": "cặp sách, túi sách"
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
        "jp": "くるま",
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
        "vi": "sôcôla"
      },
      {
        "jp": "コーヒー",
        "kana": "コーヒー",
        "reading": "koohii",
        "vi": "cà phê"
      },
      {
        "jp": "]土産",
        "kana": "[お]みやげ[お",
        "reading": "o miyage o",
        "vi": "(mua khi đi xa về hoặc mang đi khi thăm nha"
      },
      {
        "jp": "英語",
        "kana": "えいご",
        "reading": "eigo",
        "vi": "Anh 2"
      },
      {
        "jp": "日本語",
        "kana": "にほんご",
        "reading": "nihongo",
        "vi": "Nhat"
      },
      {
        "jp": "語",
        "kana": "～ご～",
        "reading": "go",
        "vi": "~"
      },
      {
        "jp": "なんし",
        "kana": "なんし",
        "reading": "nanshi",
        "vi": "gì"
      },
      {
        "jp": "えっ",
        "kana": "えっ",
        "reading": "e",
        "vi": "(dùng khi nghe một điều gì không mong"
      },
      {
        "jp": "違います",
        "kana": "ちがいます",
        "reading": "chigaimasu",
        "vi": "chân thành cám ơn, xin cám ơn rất nhiều."
      },
      {
        "jp": "そうですか。",
        "kana": "そうですか。",
        "reading": "soudesuka",
        "vi": "à."
      },
      {
        "jp": "違います",
        "kana": "ちがいます",
        "reading": "chigaimasu",
        "vi": "phải, không đúng, sai rồi."
      },
      {
        "jp": "あかいもわ",
        "kana": "あかいもわ",
        "reading": "akaimowa",
        "vi": "khi nhận ra điều gì) ; 17"
      },
      {
        "jp": "これからお世話になります。",
        "kana": "これからおせわになります。",
        "reading": "korekaraosewaninarimasu",
        "vi": "tôi rất mong được sự giúp đỡ của anh/"
      },
      {
        "jp": "こちらこそ[どうぞ]",
        "kana": "こちらこそ[どうぞ]",
        "reading": "kochirakoso douzo",
        "vi": "tôi mới là người mong được sự giúp đỡ của"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "chỗ kia, đẳng kia, kia (xa cả người nói và người nghe)"
      },
      {
        "jp": "どこ",
        "kana": "どこ",
        "reading": "doko",
        "vi": "ché nao, dau"
      },
      {
        "jp": "こちら",
        "kana": "こちら",
        "reading": "kochira",
        "vi": "phía này, đằng này, chỗ này, đây (cách nói lịch sự của ここ )"
      },
      {
        "jp": "そちら",
        "kana": "そちら",
        "reading": "sochira",
        "vi": "phía đó, đằng đó, chỗ đó, đó (cách nói lịch sự của Ex)"
      },
      {
        "jp": "あちら",
        "kana": "あちら",
        "reading": "achira",
        "vi": "phía kia, đằng kia, chỗ kia, kia (cách nói lịch sự của あそこ )"
      },
      {
        "jp": "どちら",
        "kana": "どちら",
        "reading": "dochira",
        "vi": "phía nào, đằng nào, chỗ nào, đâu (cách nói lịch sự của どこ )"
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
        "jp": "(お和手洗い)",
        "kana": "トイレ(おてあらい)",
        "reading": "toire otearai",
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
        "vi": "tháng máy"
      },
      {
        "jp": "エスカレーター",
        "kana": "エスカレーター",
        "reading": "esukareetaa",
        "vi": "tháng cuốn"
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
        "jp": "［お］国",
        "kana": "［お］くに",
        "reading": "o kuni",
        "vi": "nước (của ban/anh/chị)"
      },
      {
        "jp": "会社",
        "kana": "かいしゃ",
        "reading": "kaisha",
        "vi": "công ty"
      },
      {
        "jp": "内",
        "kana": "うち",
        "reading": "uchi",
        "vi": "nhà"
      },
      {
        "jp": "売り場",
        "kana": "うりば",
        "reading": "uriba",
        "vi": "bán (trong một bách hóa, v.v.)"
      },
      {
        "jp": "ちか地下",
        "kana": "ちか地下",
        "reading": "chika",
        "vi": "ham, dưới mặt đất 3"
      },
      {
        "jp": "ーかい(一がい)",
        "kana": "ーかい(一がい)",
        "reading": "kai gai",
        "vi": "thứ — ~—"
      },
      {
        "jp": "なんがいーえん",
        "kana": "なんがいーえん",
        "reading": "nangaiien",
        "vi": "may"
      },
      {
        "jp": "いくらひゃくせん千",
        "kana": "いくらひゃくせん千",
        "reading": "ikurahyakusen",
        "vi": "nhiêu tiền"
      },
      {
        "jp": "まん万",
        "kana": "まん万",
        "reading": "man",
        "vi": "nghìn, vạn"
      },
      {
        "jp": "すみません。",
        "kana": "すみません",
        "reading": "sumimasen",
        "vi": "lỗi."
      },
      {
        "jp": "どうも。かい",
        "kana": "どうも。かい",
        "reading": "doumo kai",
        "vi": "ơn."
      },
      {
        "jp": "いらっしゃいませ。",
        "kana": "いらっしゃいませ。",
        "reading": "irasshaimase",
        "vi": "chào quý khách, mời quý khách vào. 23"
      },
      {
        "jp": "[～を]",
        "kana": "[～を]",
        "reading": "o",
        "vi": "tôi xem [~]."
      },
      {
        "jp": "じゃ",
        "kana": "じゃ",
        "reading": "ja",
        "vi": "thì/Vậy thì"
      },
      {
        "jp": "[～を]ください。イタリア",
        "kana": "[～を]ください。イタリア",
        "reading": "o kudasai itaria",
        "vi": "tôi [~]."
      },
      {
        "jp": "スイスフランスジャカルタバンコクベルリンしんおおさか",
        "kana": "スイスフランスジャカルタバンコクベルリンしんおおさか",
        "reading": "suisufuransujakarutabankokuberurinshinoosaka",
        "vi": "Sĩ"
      },
      {
        "jp": "新大阪",
        "kana": "新大阪",
        "reading": "",
        "vi": "ga ở Osaka"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 4,
    "theme": "Thời gian & lịch sinh hoạt",
    "vocab": [
      {
        "jp": "起きます",
        "kana": "おきます",
        "reading": "okimasu",
        "vi": "đậy, thức dậy"
      },
      {
        "jp": "寝ます",
        "kana": "ねます",
        "reading": "nemasu",
        "vi": "ngủ, di ngủ"
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
        "vi": "hoc"
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
        "jp": "一時",
        "kana": "ービじ",
        "reading": "biji",
        "vi": "— giờ"
      },
      {
        "jp": "ーふん(一ぷん)",
        "kana": "ーふん(一ぷん)",
        "reading": "fun pun",
        "vi": "— phút"
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
        "vi": "may giờ"
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
        "vi": "sáng, trước mười hai giờ trưa"
      },
      {
        "jp": "午後",
        "kana": "ごご",
        "reading": "gogo",
        "vi": "chiều, sau mười hai giờ trưa"
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
        "jp": "ばん(よる)",
        "kana": "ばん(よる)",
        "reading": "ban yoru",
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
        "vi": "nghi, nghỉ phép, ngày nghi"
      },
      {
        "jp": "昼休み",
        "kana": "ひるやすみ",
        "reading": "hiruyasumi",
        "vi": "nghỉ trưa"
      },
      {
        "jp": "しけん試験",
        "kana": "しけん試験",
        "reading": "shiken",
        "vi": "thi, kiểm tra"
      },
      {
        "jp": "識",
        "kana": "かいざ会",
        "reading": "kaiza",
        "vi": "họp, hội nghị ( ~ ~ を し ます : tổ chức cuộc"
      },
      {
        "jp": "えいが映画",
        "kana": "えいが映画",
        "reading": "eiga",
        "vi": "dién anh"
      },
      {
        "jp": "毎朝",
        "kana": "まいあさ",
        "reading": "maiasa",
        "vi": "sáng, mỗi sáng"
      },
      {
        "jp": "毎晩",
        "kana": "まいばん",
        "reading": "maiban",
        "vi": "tối, mỗi tối"
      },
      {
        "jp": "日曜日",
        "kana": "にちようび",
        "reading": "nichiyoubi",
        "vi": "nhật"
      },
      {
        "jp": "月曜日",
        "kana": "げつようび",
        "reading": "getsuyoubi",
        "vi": "mấy"
      },
      {
        "jp": "大変ですね。かいはんこう番号",
        "kana": "大変ですね。かいはんこう番号",
        "reading": "desune kaihankou",
        "vi": "vất vả quá. (dùng để bày tỏ sự thông"
      },
      {
        "jp": "何番",
        "kana": "なんばん",
        "reading": "nanban",
        "vi": "r 2"
      },
      {
        "jp": "何番",
        "kana": "なんばん",
        "reading": "nanban",
        "vi": "nhiêu, số may"
      },
      {
        "jp": "そちら",
        "kana": "そちら",
        "reading": "sochira",
        "vi": "phía ông/phía bà"
      },
      {
        "jp": "ニューヨゴヨーク",
        "kana": "ニューヨゴヨーク",
        "reading": "nyuuyogoyooku",
        "vi": "York"
      },
      {
        "jp": "ペキン",
        "kana": "ペキン",
        "reading": "pekin",
        "vi": "( 北京 )"
      },
      {
        "jp": "ロンドン",
        "kana": "ロンドン",
        "reading": "rondon",
        "vi": "Đôn"
      },
      {
        "jp": "あすか",
        "kana": "あすか",
        "reading": "asuka",
        "vi": "định của một nhà hàng Nhật"
      },
      {
        "jp": "やまと美",
        "kana": "やまと美",
        "reading": "yamato",
        "vi": "my thuat Yamato (tên giả định)"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "thuyén, tau thay"
      },
      {
        "jp": "電車",
        "kana": "でんしゃ",
        "reading": "densha",
        "vi": "tau dién"
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
        "vi": "tàu Shinkansen (tau điện cao tốc của Nhật)"
      },
      {
        "jp": "バス",
        "kana": "バス",
        "reading": "basu",
        "vi": "xe buyt"
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
        "vi": "giả định"
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
        "vi": "tuần nay"
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
        "vi": "sáng nam"
      },
      {
        "jp": "ー年",
        "kana": "ーねん",
        "reading": "nen",
        "vi": "năm —"
      },
      {
        "jp": "何年",
        "kana": "なんねん",
        "reading": "nannen",
        "vi": "may năm"
      },
      {
        "jp": "ーがつ",
        "kana": "ーがつ",
        "reading": "gatsu",
        "vi": "tháng —"
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
        "vi": "mồng 1"
      },
      {
        "jp": "二日",
        "kana": "ふつか",
        "reading": "futsuka",
        "vi": "mồng 2, 2 ngày"
      },
      {
        "jp": "三日",
        "kana": "みっか",
        "reading": "mikka",
        "vi": "mồng 3, 3 ngày"
      },
      {
        "jp": "四日",
        "kana": "よっか",
        "reading": "yokka",
        "vi": "mồng 4, 4 ngày"
      },
      {
        "jp": "五日",
        "kana": "いつか",
        "reading": "itsuka",
        "vi": "mồng 5, 5 ngày"
      },
      {
        "jp": "六日",
        "kana": "むいか",
        "reading": "muika",
        "vi": "mồng 6, 6 ngày"
      },
      {
        "jp": "七日",
        "kana": "なのか",
        "reading": "nanoka",
        "vi": "méng 7, 7 ngay"
      },
      {
        "jp": "八日",
        "kana": "ようか",
        "reading": "youka",
        "vi": "mồng 8, 8 ngày"
      },
      {
        "jp": "九日",
        "kana": "ここのか",
        "reading": "kokonoka",
        "vi": "mồng 9, 9 ngày f"
      },
      {
        "jp": "十日",
        "kana": "とおか",
        "reading": "tooka",
        "vi": "mồng 10, 10 ngày ; 5"
      },
      {
        "jp": "十四日",
        "kana": "じゅうよっか",
        "reading": "juuyokka",
        "vi": "14, 14 ngày ‘"
      },
      {
        "jp": "二十日",
        "kana": "はつか",
        "reading": "hatsuka",
        "vi": "20, 20 ngày"
      },
      {
        "jp": "十四日",
        "kana": "じゅうよっか",
        "reading": "juuyokka",
        "vi": "24, 24 ngay"
      },
      {
        "jp": "ーにち",
        "kana": "ーにち",
        "reading": "nichi",
        "vi": "—, — ngày"
      },
      {
        "jp": "何日",
        "kana": "なんにち",
        "reading": "nannichi",
        "vi": "mấy, ngày bao nhiêu, mấy ngày, bao nhiêu"
      },
      {
        "jp": "いつ",
        "kana": "いつか",
        "reading": "itsuka",
        "vi": "giờ, khi nào"
      },
      {
        "jp": "誕生日",
        "kana": "たんじょうび",
        "reading": "tanjoubi",
        "vi": "nhat"
      },
      {
        "jp": "[どうも]ありがとう",
        "kana": "[どうも]ありがとう",
        "reading": "doumo arigatou",
        "vi": "cám on anh/chị rất nhiều."
      },
      {
        "jp": "どういたしまして。",
        "kana": "どういたしまして。",
        "reading": "douitashimashite",
        "vi": "có gì đâu (anh/chị đừng bận tâm)."
      },
      {
        "jp": "次の",
        "kana": "つぎの",
        "reading": "tsugino",
        "vi": "theo"
      },
      {
        "jp": "普通",
        "kana": "ふつう",
        "reading": "futsuu",
        "vi": "(dừng cả ở các ga lẻ)"
      },
      {
        "jp": "行",
        "kana": "行",
        "reading": "",
        "vi": "tốc hành"
      },
      {
        "jp": "特急",
        "kana": "とっきゅう",
        "reading": "tokkyuu",
        "vi": "hành đặc biệt"
      },
      {
        "jp": "しえん",
        "kana": "しえん",
        "reading": "shien",
        "vi": "。"
      },
      {
        "jp": "平子",
        "kana": "平子",
        "reading": "",
        "vi": "khu phố ở gần Osaka"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "すいます[たばこをへ有]",
        "kana": "すいます[たばこをへ有]",
        "reading": "suimasu tabakoohe",
        "vi": "hút [thuốc lá]"
      },
      {
        "jp": "見ます",
        "kana": "みます",
        "reading": "mimasu",
        "vi": "nhin, xem"
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
        "vi": "viết (か さき ます còn có nghĩa là “vẽ”, và trong"
      },
      {
        "jp": "買います",
        "kana": "かいます",
        "reading": "kaimasu",
        "vi": "mua"
      },
      {
        "jp": "撮ります",
        "kana": "とります",
        "reading": "torimasu",
        "vi": "chụp [anh]"
      },
      {
        "jp": "します",
        "kana": "します",
        "reading": "shimasu",
        "vi": "lam, chơi"
      },
      {
        "jp": "会います",
        "kana": "あいます",
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
        "vi": "banh mi"
      },
      {
        "jp": "卵",
        "kana": "たまご",
        "reading": "tamago",
        "vi": "trứng"
      },
      {
        "jp": "にくさく",
        "kana": "にくさく",
        "reading": "nikusaku",
        "vi": "thit"
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
        "vi": "tra den"
      },
      {
        "jp": "ぎざぎざゅうにゅう(ミルク)",
        "kana": "ぎざぎざゅうにゅう(ミルク)",
        "reading": "gizagiza unyuu miruku",
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
        "jp": "［お］酒",
        "kana": "［お］さけ",
        "reading": "o sake",
        "vi": "rượu, rượu gạo Nhật Bản"
      },
      {
        "jp": "たばこ",
        "kana": "たばこ",
        "reading": "tabako",
        "vi": "thuốc lá"
      },
      {
        "jp": "レポートしゃしん写真",
        "kana": "レポートしゃしん写真",
        "reading": "repootoshashin",
        "vi": "cáo"
      },
      {
        "jp": "ビデオ",
        "kana": "ビデオ",
        "reading": "bideo",
        "vi": "viđeo, đầu viđeo"
      },
      {
        "jp": "みせ店",
        "kana": "みせ店",
        "reading": "mise",
        "vi": "hàng, tiệm"
      },
      {
        "jp": "テニス",
        "kana": "テニス",
        "reading": "tenisu",
        "vi": "vợt ( ~ を し ます :danh quần vợt) po"
      },
      {
        "jp": "サッカー",
        "kana": "サッカー",
        "reading": "sakkaa",
        "vi": "đá ( ~ # LET : chơi bóng đá) 6"
      },
      {
        "jp": "［お］花見",
        "kana": "［お］はなみ",
        "reading": "o hanami",
        "vi": "ngắm hoa anh dao ( ~ を し ます :ngém ai"
      },
      {
        "jp": "なに",
        "kana": "なに",
        "reading": "nani",
        "vi": "gi"
      },
      {
        "jp": "いっしょに",
        "kana": "いっしょに",
        "reading": "isshoni",
        "vi": "cùng nhau"
      },
      {
        "jp": "ちょっと",
        "kana": "ちょっと",
        "reading": "chotto",
        "vi": "chút"
      },
      {
        "jp": "いつも",
        "kana": "いつも",
        "reading": "itsumo",
        "vi": "luôn, lúc nào cũng"
      },
      {
        "jp": "時々",
        "kana": "ときどき",
        "reading": "tokidoki",
        "vi": "thoảng"
      },
      {
        "jp": "それから",
        "kana": "それから",
        "reading": "sorekara",
        "vi": "d6, tiép theo"
      },
      {
        "jp": "ええ",
        "kana": "ええ",
        "reading": "ee",
        "vi": "—"
      },
      {
        "jp": "いいですね。",
        "kana": "いいですね。",
        "reading": "iidesune",
        "vi": "đầy nhỉ./Hay quá."
      },
      {
        "jp": "わかりリました。(会話)かいわなん",
        "kana": "わかりリました。(会話)かいわなん",
        "reading": "wakaririmashita kaiwanan",
        "vi": "rồi./Vâng a."
      },
      {
        "jp": "何ですか。",
        "kana": "何ですか。",
        "reading": "desuka",
        "vi": "đẩy ạ?/Cái gi vậy?/Vâng có tôi."
      },
      {
        "jp": "じゃ、また[あした]。メキシコ",
        "kana": "じゃ、また[あした]。メキシコ",
        "reading": "ja mata ashita mekishiko",
        "vi": "gặp lại [ngày mai]."
      },
      {
        "jp": "大阪デパート",
        "kana": "大阪デパート",
        "reading": "depaato",
        "vi": "hóa giả định"
      },
      {
        "jp": "つるやまいにちや",
        "kana": "つるやまいにちや",
        "reading": "tsuruyamainichiya",
        "vi": "hang giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "day"
      },
      {
        "jp": "習います",
        "kana": "ならいます",
        "reading": "naraimasu",
        "vi": "hoc, tap"
      },
      {
        "jp": "かけます",
        "kana": "かけます",
        "reading": "kakemasu",
        "vi": "goi [điện thoại]"
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
        "vi": "thia"
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
        "reading": "fooku",
        "vi": "dia, nia"
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
        "vi": "cái đập ghim"
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
        "vi": "cái tay, cục tây"
      },
      {
        "jp": "紙",
        "kana": "かみ",
        "reading": "kami",
        "vi": "gidy"
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
        "vi": "khi nói về bố mình)"
      },
      {
        "jp": "母",
        "kana": "はは",
        "reading": "haha",
        "vi": "khi nói về mẹ mình)"
      },
      {
        "jp": "お父さん",
        "kana": "おとうさん",
        "reading": "otousan",
        "vi": "khi nói về bố người khác va ding khi"
      },
      {
        "jp": "お母さん",
        "kana": "おかあさん",
        "reading": "okaasan",
        "vi": "(dùng khi nói về mẹ người khác và dùng khi"
      },
      {
        "jp": "ょだ",
        "kana": "ょだ",
        "reading": "da",
        "vi": "hô với mẹ mình)"
      },
      {
        "jp": "これから",
        "kana": "これから",
        "reading": "korekara",
        "vi": "giờ, sau đây"
      },
      {
        "jp": "[～、]すてきですね。",
        "kana": "[～、]すてきですね。",
        "reading": "sutekidesune",
        "vi": "hay nhi./đẹp nhỉ. 7"
      },
      {
        "jp": "かい",
        "kana": "かい",
        "reading": "kai",
        "vi": "n"
      },
      {
        "jp": "いらっしゃい。",
        "kana": "いらっしゃい。",
        "reading": "irasshai",
        "vi": "nghênh anh/chị đã đến chơi./"
      },
      {
        "jp": "どうぞお上がりくださいしっれい",
        "kana": "どうぞお上がりくださいしっれい",
        "reading": "douzoo garikudasaishirrei",
        "vi": "anh/chị vào."
      },
      {
        "jp": "失礼します。",
        "kana": "しつれいします。",
        "reading": "shitsureishimasu",
        "vi": "phép tôi vào./Xin phép ~. (dùng khi bước"
      },
      {
        "jp": "いかがですか。",
        "kana": "いかがですか。",
        "reading": "ikagadesuka",
        "vi": "dùng ~ nhé? (diing khi mời ai đó cái gì)"
      },
      {
        "jp": "いただきます。",
        "kana": "いただきます。",
        "reading": "itadakimasu",
        "vi": "anh/chị đùng ~. (cách nói dùng trước khi ăn"
      },
      {
        "jp": "ごちそうさま[でした]。",
        "kana": "ごちそうさま[でした]。",
        "reading": "gochisousama deshita",
        "vi": "on anh/chị đã đãi tôi bữa ăn ngon."
      },
      {
        "jp": "スペイン",
        "kana": "スペイン",
        "reading": "supein",
        "vi": "Ban Nha"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 8,
    "theme": "Tính từ & miêu tả",
    "vocab": [
      {
        "jp": "ハンサム[な]",
        "kana": "ハンサム[な]",
        "reading": "hansamu na",
        "vi": "đẹp trai"
      },
      {
        "jp": "きれい［な］",
        "kana": "きれい［な］",
        "reading": "kirei na",
        "vi": "đẹp, sạch"
      },
      {
        "jp": "静か［な］",
        "kana": "しずか［な］",
        "reading": "shizuka na",
        "vi": "yên tĩnh"
      },
      {
        "jp": "にぎやか［な］",
        "kana": "にぎやか［な］",
        "reading": "nigiyaka na",
        "vi": "náo nhiệt"
      },
      {
        "jp": "有名［な］",
        "kana": "ゆうめい［な］",
        "reading": "yuumei na",
        "vi": "nổi tiếng"
      },
      {
        "jp": "親切［な］",
        "kana": "しんせつ［な］",
        "reading": "shinsetsu na",
        "vi": "tốt bụng, thân thiện (không dùng khi nói về người trong gia đình mình)"
      },
      {
        "jp": "元気［な］",
        "kana": "げんき［な］",
        "reading": "genki na",
        "vi": "khỏe, khỏe khoắn"
      },
      {
        "jp": "暇［な］",
        "kana": "ひま［な］",
        "reading": "hima na",
        "vi": "rảnh rỗi"
      },
      {
        "jp": "便利［な］",
        "kana": "べんり［な］",
        "reading": "benri na",
        "vi": "tiện lợi"
      },
      {
        "jp": "すてき［な］",
        "kana": "すてき［な］",
        "reading": "suteki na",
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
        "vi": "cũ (không dùng khi nói về tuổi tác của một người)"
      },
      {
        "jp": "いい（よい）",
        "kana": "いい（よい）",
        "reading": "ii yoi",
        "vi": "tét"
      },
      {
        "jp": "悪い",
        "kana": "わるい",
        "reading": "warui",
        "vi": "xấu"
      },
      {
        "jp": "暑い",
        "kana": "あつい",
        "reading": "atsui",
        "vi": "néng"
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
        "vi": "lạnh,buốt (dùng cho cảm giác)"
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
        "vi": "ré"
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
        "vi": "thứ vị, hay"
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
        "vi": "den"
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
        "vi": "anh đào (hoa, cây)"
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
        "vi": "thị trấn, thi xã, thành phố"
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
        "vi": "chỗ"
      },
      {
        "jp": "寮",
        "kana": "りょう",
        "reading": "ryou",
        "vi": "xá"
      },
      {
        "jp": "レストラン",
        "kana": "レストラン",
        "reading": "resutoran",
        "vi": "hang"
      },
      {
        "jp": "せいかつ生活",
        "kana": "せいかつ生活",
        "reading": "seikatsu",
        "vi": "sống, sinh hoạt"
      },
      {
        "jp": "［お］仕事",
        "kana": "［お］しごと",
        "reading": "o shigoto",
        "vi": "công việc ( ~ を し ます : làm việc)"
      },
      {
        "jp": "どう",
        "kana": "どう",
        "reading": "dou",
        "vi": "nao"
      },
      {
        "jp": "どんな～",
        "kana": "どんな～",
        "reading": "donna",
        "vi": "thế nào"
      },
      {
        "jp": "とても",
        "kana": "とても",
        "reading": "totemo",
        "vi": "lắm"
      },
      {
        "jp": "あまり",
        "kana": "あまり",
        "reading": "amari",
        "vi": "~ lắm (dùng với thể phủ định)"
      },
      {
        "jp": "そしてげんき",
        "kana": "そしてげんき",
        "reading": "soshitegenki",
        "vi": "nữa (dùng dễ nối hai câu)"
      },
      {
        "jp": "お元気ですか。",
        "kana": "お元気ですか。",
        "reading": "o desuka",
        "vi": "có khỏe không?"
      },
      {
        "jp": "そうですね。",
        "kana": "そうですね。",
        "reading": "soudesune",
        "vi": "à./Để tôi xem. (cách nói trong lúc suy nghĩ"
      },
      {
        "jp": "酸っぱい",
        "kana": "すっぱい",
        "reading": "suppai",
        "vi": "="
      },
      {
        "jp": "[～、]もう一杯いか",
        "kana": "[～、]もう一杯いか",
        "reading": "mou ika",
        "vi": "dùng thêm một chén/ly[~] nữa nhé?"
      },
      {
        "jp": "[いいえ、]けっこうです",
        "kana": "[いいえ、]けっこうです",
        "reading": "iie kekkoudesu",
        "vi": "đủ rồi a."
      },
      {
        "jp": "～～です[ね]。",
        "kana": "～～です[ね]。",
        "reading": "desu ne",
        "vi": "rồi nhỉ./Đã ~ rồi, đúng không?"
      },
      {
        "jp": "そろそろ失礼します。",
        "kana": "そろそろ失礼します。",
        "reading": "sorosoro shimasu",
        "vi": "đến lúc tôi phải xin phép rồi./Đã đến lúc tôi"
      },
      {
        "jp": "いいえ。",
        "kana": "いいえ。",
        "reading": "iie",
        "vi": "có gi./Khéng sao cả."
      },
      {
        "jp": "またいらっしゃって",
        "kana": "またいらっしゃって",
        "reading": "matairasshatte",
        "vi": "sau anh/chị lại đến chơi nhé."
      },
      {
        "jp": "シャンハイきんかくじな",
        "kana": "シャンハイきんかくじな",
        "reading": "shanhaikinkakujina",
        "vi": "Hải (上 海 )"
      },
      {
        "jp": "奈良公園",
        "kana": "奈良公園",
        "reading": "",
        "vi": "viên Nara"
      },
      {
        "jp": "富士山しちにんさむらい",
        "kana": "富士山しちにんさむらい",
        "reading": "shichininsamurai",
        "vi": "Phú Sĩ (ngọn núi cao nhất Nhật Bản)"
      },
      {
        "jp": "[侍",
        "kana": "[侍",
        "reading": "",
        "vi": "võ sĩ Samurai” (tên một bộ phim kính"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "好き［な］",
        "kana": "すき［な］",
        "reading": "suki na",
        "vi": "thích"
      },
      {
        "jp": "嫌い［な］",
        "kana": "きらい［な］",
        "reading": "kirai na",
        "vi": "ghết, không thích"
      },
      {
        "jp": "上手［な］",
        "kana": "じょうず［な］",
        "reading": "jouzu na",
        "vi": "giỏi, khéo"
      },
      {
        "jp": "下手［な］",
        "kana": "へた［な］",
        "reading": "heta na",
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
        "vi": "món ăn, việc nấu ăn ( ~ を L £74 : ndu ăn)"
      },
      {
        "jp": "スポーツ",
        "kana": "スポーツ",
        "reading": "supootsu",
        "vi": "thể thao ( ~ を し ます : chơi thể thao)"
      },
      {
        "jp": "野球",
        "kana": "やきゅう",
        "reading": "yakyuu",
        "vi": "bóng chày ( ~ # L£ : chơi béng chày)"
      },
      {
        "jp": "ダンス",
        "kana": "ダンス",
        "reading": "dansu",
        "vi": "nhảy, khiêu vũ ( ~ # L #7 : nhay, khiéu vũ)"
      },
      {
        "jp": "料理",
        "kana": "りょうり",
        "reading": "ryouri",
        "vi": "du lịch, chuyến du lịch ( ~ [を ] し ます : đi du"
      },
      {
        "jp": "音楽",
        "kana": "おんがく",
        "reading": "ongaku",
        "vi": "âm nhạc"
      },
      {
        "jp": "クラシック",
        "kana": "クラシック",
        "reading": "kurashikku",
        "vi": "nhạc cồ điền"
      },
      {
        "jp": "ジャズ",
        "kana": "ジャズ",
        "reading": "jazu",
        "vi": "nhac jazz"
      },
      {
        "jp": "コンサート",
        "kana": "コンサート",
        "reading": "konsaato",
        "vi": "buéi hoa nhac"
      },
      {
        "jp": "カラオケ",
        "kana": "カラオケ",
        "reading": "karaoke",
        "vi": "karaoke"
      },
      {
        "jp": "絵",
        "kana": "え",
        "reading": "e",
        "vi": "tranh, héi hoa"
      },
      {
        "jp": "ひらがな",
        "kana": "ひらがな",
        "reading": "hiragana",
        "vi": "chữ Hiragana"
      },
      {
        "jp": "かたかな",
        "kana": "かたかな",
        "reading": "katakana",
        "vi": "chữ Katakana"
      },
      {
        "jp": "ローマ池",
        "kana": "ローマビじ",
        "reading": "roomabiji",
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
        "jp": "約束",
        "kana": "やくそく",
        "reading": "yakusoku",
        "vi": "cuộc hẹn, lời hứa ( ~ [を] し ます : hứa, hẹn)"
      },
      {
        "jp": "アルバイト",
        "kana": "アルバイト",
        "reading": "arubaito",
        "vi": "làm thêm ( ~ を し ます : làm thêm)"
      },
      {
        "jp": "ご主人",
        "kana": "ごしゅじん",
        "reading": "goshujin",
        "vi": "(ding khi nói về chồng người khác)"
      },
      {
        "jp": "夫/主人",
        "kana": "おっと/しゅじん",
        "reading": "otto shujin",
        "vi": "(dùng khi nói về chồng mình)"
      },
      {
        "jp": "奥さん",
        "kana": "おくさん",
        "reading": "okusan",
        "vi": "khi nói về vợ người khác)"
      },
      {
        "jp": "こども子ども",
        "kana": "こども子ども",
        "reading": "kodomo domo",
        "vi": "cái"
      },
      {
        "jp": "よく",
        "kana": "よく",
        "reading": "yoku",
        "vi": "rõ (chỉ mức độ)"
      },
      {
        "jp": "だいたいたくさん",
        "kana": "だいたいたくさん",
        "reading": "daitaitakusan",
        "vi": "dai thé"
      },
      {
        "jp": "少し",
        "kana": "すこし",
        "reading": "sukoshi",
        "vi": "ít"
      },
      {
        "jp": "全然",
        "kana": "ぜんぜん",
        "reading": "zenzen",
        "vi": "toàn ~ không (dùng với thế phủ định)"
      },
      {
        "jp": "はやさくどうして",
        "kana": "はやさくどうして",
        "reading": "hayasakudoushite",
        "vi": "nhanh"
      },
      {
        "jp": "貸してください。",
        "kana": "貸してください。",
        "reading": "shitekudasai",
        "vi": "cho tôi mượn (nó)."
      },
      {
        "jp": "いいですよ。ざんねん",
        "kana": "いいですよ。ざんねん",
        "reading": "iidesuyo zannen",
        "vi": "chứ./Được ạ."
      },
      {
        "jp": "残念です[が]かい(会話",
        "kana": "残念です[が]かい(会話",
        "reading": "desu ga kai",
        "vi": "lỗi, [nhưng... ]/Đáng tiếc là... 59"
      },
      {
        "jp": "いっしょにいかがですか",
        "kana": "いっしょにいかがですか",
        "reading": "isshoniikagadesuka",
        "vi": "cùng ~ với tôi (chứng tôi) không?"
      },
      {
        "jp": "[～は]ちょっと。",
        "kana": "[～は]ちょっと。",
        "reading": "ha chotto",
        "vi": "có lẽ không được rồi. (cách từ chối khéo"
      },
      {
        "jp": "だめですか。こんどビねが",
        "kana": "だめですか。こんどビねが",
        "reading": "damedesuka kondobinega",
        "vi": "được à?"
      },
      {
        "jp": "また今度お願いします。",
        "kana": "また今度お願いします。",
        "reading": "mata o ishimasu",
        "vi": "anh/chị lần sau vậy. (cách từ chối khéo một"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 10,
    "theme": "Sự tồn tại & vị trí",
    "vocab": [
      {
        "jp": "あります",
        "kana": "あります",
        "reading": "arimasu",
        "vi": "ở (tồn tại, dùng cho đồ vật)"
      },
      {
        "jp": "います",
        "kana": "います",
        "reading": "imasu",
        "vi": "ở (tồn tại, dùng cho người và động vật)"
      },
      {
        "jp": "いろいろ［な］",
        "kana": "いろいろ［な］",
        "reading": "iroiro na",
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
        "vi": "người đàn bà"
      },
      {
        "jp": "男の子",
        "kana": "おとこのこ",
        "reading": "otokonoko",
        "vi": "cau con trai"
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
        "jp": "ぞう",
        "kana": "ぞう",
        "reading": "zou",
        "vi": "voi"
      },
      {
        "jp": "木",
        "kana": "き",
        "reading": "ki",
        "vi": "cay, g6"
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
        "jp": "はこ",
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
        "vi": "ban"
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
        "vi": "quán giải khát, quán cà-phê"
      },
      {
        "jp": "～や",
        "kana": "～や",
        "reading": "ya",
        "vi": "hiệu ~, cửa hàng ~"
      },
      {
        "jp": "乗り場",
        "kana": "のりば",
        "reading": "noriba",
        "vi": "điểm đón tắc-xi, tau, v.v."
      },
      {
        "jp": "県",
        "kana": "けん",
        "reading": "ken",
        "vi": "tinh"
      },
      {
        "jp": "右",
        "kana": "みぎ",
        "reading": "migi",
        "vi": "phải"
      },
      {
        "jp": "なか中そと外となり隣ちかくさく近く",
        "kana": "なか中そと外となり隣ちかくさく近く",
        "reading": "naka soto tonari chikakusaku ku",
        "vi": "giữa"
      },
      {
        "jp": "間",
        "kana": "あいだ",
        "reading": "aida",
        "vi": "ở giữa"
      },
      {
        "jp": "～～[など]かい",
        "kana": "～～[など]かい",
        "reading": "nado kai",
        "vi": "~, [v.v.]"
      },
      {
        "jp": "[どうも]すみません。",
        "kana": "[どうも]すみません。",
        "reading": "doumo sumimasen",
        "vi": "ơn."
      },
      {
        "jp": "ナンプラー",
        "kana": "ナンプラー",
        "reading": "nanpuraa",
        "vi": "nước mắm"
      },
      {
        "jp": "コーナーした",
        "kana": "コーナーした",
        "reading": "koonaashita",
        "vi": "khu vực"
      },
      {
        "jp": "いちばん下",
        "kana": "いちばん下",
        "reading": "ichiban",
        "vi": "cùng"
      },
      {
        "jp": "東京ディズニーランド",
        "kana": "東京ディズニーランド",
        "reading": "dizuniirando",
        "vi": "viên Tokyo Disneyland"
      },
      {
        "jp": "アジアストア",
        "kana": "アジアストア",
        "reading": "ajiasutoa",
        "vi": "thị giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 11,
    "theme": "Số lượng & tần suất",
    "vocab": [
      {
        "jp": "います[こどもがへ][子どもがへ]",
        "kana": "います[こどもがへ][子どもがへ]",
        "reading": "imasu kodomogahe domogahe",
        "vi": "\"có [con]"
      },
      {
        "jp": "います[にほんにへ][理本にへ]",
        "kana": "います[にほんにへ][理本にへ]",
        "reading": "imasu nihonnihe nihe",
        "vi": "ở [Nhật]"
      },
      {
        "jp": "かかります",
        "kana": "かかります",
        "reading": "kakarimasu",
        "vi": "mắt, tồn (thời gian, tiền bạc)"
      },
      {
        "jp": "休みます",
        "kana": "やすみます",
        "reading": "yasumimasu",
        "vi": "nghỉ [làm việc]"
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
        "vi": "chin cái"
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
        "jp": "二人",
        "kana": "ふたり",
        "reading": "futari",
        "vi": "hai người"
      },
      {
        "jp": "ー人",
        "kana": "ーにん",
        "reading": "nin",
        "vi": "— người"
      },
      {
        "jp": "ー台",
        "kana": "ーだい",
        "reading": "dai",
        "vi": "— cái, chiếc (dùng dễ dễm máy móc, xe cộ, v.v.)"
      },
      {
        "jp": "ー枚",
        "kana": "ーまい",
        "reading": "mai",
        "vi": "— tờ, tắm (ding đề đếm những vật mỏng như tờ giấy, con tem, v.v.)"
      },
      {
        "jp": "ー回",
        "kana": "ーかい",
        "reading": "kai",
        "vi": "— lần"
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
        "vi": "bánh san-uých"
      },
      {
        "jp": "カレー[ライス]",
        "kana": "カレー[ライス]",
        "reading": "karee raisu",
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
        "vi": "buu thiép"
      },
      {
        "jp": "封筒",
        "kana": "ふうとう",
        "reading": "fuutou",
        "vi": "phong bi"
      },
      {
        "jp": "両親",
        "kana": "りょうしｎ",
        "reading": "ryoushi",
        "vi": "bố mẹ"
      },
      {
        "jp": "兄弟",
        "kana": "きょうだい",
        "reading": "kyoudai",
        "vi": "anh chị em"
      },
      {
        "jp": "あに",
        "kana": "あに",
        "reading": "ani",
        "vi": "anh trai (mình)"
      },
      {
        "jp": "お兄さん",
        "kana": "おにいさん",
        "reading": "oniisan",
        "vi": "trai (của người khác)"
      },
      {
        "jp": "あね姉",
        "kana": "あね姉",
        "reading": "ane",
        "vi": "gái (minh)"
      },
      {
        "jp": "お姉さん",
        "kana": "おねえさん",
        "reading": "oneesan",
        "vi": "gái (của người khác)"
      },
      {
        "jp": "弟",
        "kana": "おとうと",
        "reading": "otouto",
        "vi": "trai (minh)"
      },
      {
        "jp": "弟さん",
        "kana": "おとうとさん",
        "reading": "otoutosan",
        "vi": "trai (của người khác)"
      },
      {
        "jp": "妹",
        "kana": "いもうと",
        "reading": "imouto",
        "vi": "gái (minh)"
      },
      {
        "jp": "妹さん",
        "kana": "いもうとさん",
        "reading": "imoutosan",
        "vi": "(của người khác)"
      },
      {
        "jp": "外国",
        "kana": "がいこく",
        "reading": "gaikoku",
        "vi": "ngoài"
      },
      {
        "jp": "生",
        "kana": "りゅうがくせい留学",
        "reading": "ryuugakusei",
        "vi": "học sinh, sinh viên người nước ngoài"
      },
      {
        "jp": "クグラスーねんー年",
        "kana": "クグラスーねんー年",
        "reading": "kugurasuunen",
        "vi": "học"
      },
      {
        "jp": "～ぐらい",
        "kana": "ーぐらい",
        "reading": "gurai",
        "vi": "~"
      },
      {
        "jp": "どのくらい",
        "kana": "どのくらい",
        "reading": "donokurai",
        "vi": "lau"
      },
      {
        "jp": "みんな",
        "kana": "みんな",
        "reading": "minna",
        "vi": "cộng"
      },
      {
        "jp": "～だけ",
        "kana": "～だけ",
        "reading": "dake",
        "vi": "~ 1"
      },
      {
        "jp": "かしこまりました。かいてんき",
        "kana": "かしこまりました。かいてんき",
        "reading": "kashikomarimashita kaitenki",
        "vi": "đã rõ rồi a (thưa 6ng/ba). 1 1"
      },
      {
        "jp": "いい[お]天気ですね。で",
        "kana": "いい[お]天気ですね。で",
        "reading": "ii o desune de",
        "vi": "đẹp nhỉ."
      },
      {
        "jp": "お出かけですか。",
        "kana": "お出かけですか。",
        "reading": "o kakedesuka",
        "vi": "đi ra ngoài đấy a?"
      },
      {
        "jp": "ちょっと～まで。",
        "kana": "ちょっと～まで。",
        "reading": "chotto made",
        "vi": "đi ~ một chút."
      },
      {
        "jp": "行ってらっしゃい。",
        "kana": "行ってらっしゃい。",
        "reading": "tterasshai",
        "vi": "đi nhé. (nguyên nghĩa: Anh/Chị đi rồi"
      },
      {
        "jp": "行ってさます。ふなびん",
        "kana": "行ってさます。ふなびん",
        "reading": "ttesamasu funabin",
        "vi": "đi đây. (nguyên nghĩa: Tôi đi rồi sẽ về.)"
      },
      {
        "jp": "航空便",
        "kana": "こうくうびん",
        "reading": "koukuubin",
        "vi": "bằng đường biển"
      },
      {
        "jp": "航空便(エアメール)ねが",
        "kana": "航空便(エアメール)ねが",
        "reading": "eameeru nega",
        "vi": "bằng đường hàng không"
      },
      {
        "jp": "お願いします。オーストラリア",
        "kana": "お願いします。オーストラリア",
        "reading": "o ishimasu oosutoraria",
        "vi": "anh/chị."
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 12,
    "theme": "Quá khứ & so sánh",
    "vocab": [
      {
        "jp": "簡単［な］",
        "kana": "かんたん［な］",
        "reading": "kantan na",
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
        "jp": "多い",
        "kana": "おおい",
        "reading": "ooi",
        "vi": "nhiều [người]"
      },
      {
        "jp": "少ない",
        "kana": "すくない",
        "reading": "sukunai",
        "vi": "ít [người]"
      },
      {
        "jp": "暖かい",
        "kana": "あたたかい",
        "reading": "atatakai",
        "vi": "Ẩm"
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
        "vi": "ngot"
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
        "vi": "nhe"
      },
      {
        "jp": "いい［コーヒーが～］",
        "kana": "いい［コーヒーが～］",
        "reading": "ii [koohii ga ~]",
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
        "jp": "秋",
        "kana": "あき",
        "reading": "aki",
        "vi": "mua thu"
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
        "jp": "あめ",
        "kana": "あめ",
        "reading": "ame",
        "vi": "mưa"
      },
      {
        "jp": "雪",
        "kana": "ゆき",
        "reading": "yuki",
        "vi": "tuyét"
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
        "vi": "san bay"
      },
      {
        "jp": "海",
        "kana": "うみ",
        "reading": "umi",
        "vi": "bién, dai dương"
      },
      {
        "jp": "世界",
        "kana": "せかい",
        "reading": "sekai",
        "vi": "thể giới"
      },
      {
        "jp": "パーティー",
        "kana": "パーティー",
        "reading": "paatii",
        "vi": "tiệc(~ # し ます : tổ chức tiệc, mở tiệc)"
      },
      {
        "jp": "[お]まっリ",
        "kana": "[お]まっリ",
        "reading": "o marri",
        "vi": "lễ hội"
      },
      {
        "jp": "焼き",
        "kana": "すきやさすき",
        "reading": "sukiyasasuki",
        "vi": "(món lầu thịt bò, rau)"
      },
      {
        "jp": "さしみ刺身",
        "kana": "さしみ刺身",
        "reading": "sashimi",
        "vi": "(món goi cá sông)"
      },
      {
        "jp": "[お]すし",
        "kana": "[お]すし",
        "reading": "o sushi",
        "vi": "(món cơm trộn giấm có cá tươi ở trên)"
      },
      {
        "jp": "てんぷら",
        "kana": "てんぷら",
        "reading": "tenpura",
        "vi": "(món hải sản và rau chiên tẩm bột)"
      },
      {
        "jp": "ぶたにく",
        "kana": "ぶたにく",
        "reading": "butaniku",
        "vi": "heo, thit lon"
      },
      {
        "jp": "ぎゅうにくさくレモン",
        "kana": "ぎゅうにくさくレモン",
        "reading": "gyuunikusakuremon",
        "vi": "bd"
      },
      {
        "jp": "生け花",
        "kana": "いけばな",
        "reading": "ikebana",
        "vi": "thuật cắm hoa ( ~ ~ を し ます :cém hoa)"
      },
      {
        "jp": "紅葉",
        "kana": "もみじ",
        "reading": "momiji",
        "vi": "đỏ, lá đỏ"
      },
      {
        "jp": "どちらどちらもいちばん",
        "kana": "どちらどちらもいちばん",
        "reading": "dochiradochiramoichiban",
        "vi": "(trong hai cái)"
      },
      {
        "jp": "ずっと",
        "kana": "ずっと",
        "reading": "zutto",
        "vi": "han, suốt"
      },
      {
        "jp": "はじめて初めかいわ",
        "kana": "はじめて初めかいわ",
        "reading": "hajimete mekaiwa",
        "vi": "tiên"
      },
      {
        "jp": "ただいま",
        "kana": "ただいま",
        "reading": "tadaima",
        "vi": "về đây. (dùng đề nói khi về đến nhà) 7."
      },
      {
        "jp": "お帰りなさい",
        "kana": "おかえになさい",
        "reading": "okaeninasai",
        "vi": "đã về đầy a. (dùng dễ nói với ai đó mới"
      },
      {
        "jp": "っか",
        "kana": "っか",
        "reading": "kka",
        "vi": "Nam"
      },
      {
        "jp": "疲れました",
        "kana": "つかれました",
        "reading": "tsukaremashita",
        "vi": "rồi. 412"
      },
      {
        "jp": "祭",
        "kana": "祭",
        "reading": "",
        "vi": "Gi-ôn (lễ hội nổi tiếng nhất ở Kyoto)"
      },
      {
        "jp": "ホンコンシンガポール",
        "kana": "ホンコンシンガポール",
        "reading": "honkonshingapooru",
        "vi": "Kông ( 香港 )"
      },
      {
        "jp": "ジャパン",
        "kana": "ジャパン",
        "reading": "japan",
        "vi": "thị giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "mệt (khi nói trạng thái đã mệt rồi thì dùng つか れ ま し た )"
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
        "vi": "ăn cơm, đùng bữa"
      },
      {
        "jp": "散歩します",
        "kana": "さんぽします",
        "reading": "sanposhimasu",
        "vi": "đi dạo [ở công viên]"
      },
      {
        "jp": "大変［な］",
        "kana": "たいへん［な］",
        "reading": "taihen na",
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
        "vi": "chat, hep"
      },
      {
        "jp": "プール",
        "kana": "プール",
        "reading": "puuru",
        "vi": "bé bơi"
      },
      {
        "jp": "川",
        "kana": "",
        "reading": "",
        "vi": "sông"
      },
      {
        "jp": "美術",
        "kana": "びじゅつ",
        "reading": "bijutsu",
        "vi": "my thuat"
      },
      {
        "jp": "釣り",
        "kana": "つり",
        "reading": "tsuri",
        "vi": "việc câu cá ( ~ # し ます :cauc め の"
      },
      {
        "jp": "スキー",
        "kana": "スキー",
        "reading": "sukii",
        "vi": "việc trượt tuyét ( # し ます : trượt tuyết)"
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
        "reading": "o shougatsu",
        "vi": "Tét"
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
        "jp": "のどがかわきました。",
        "kana": "のどがかわきました。",
        "reading": "nodogakawakimashita",
        "vi": "(khi nói trạng thái đang khát thì ding"
      },
      {
        "jp": "おなかがすきました。",
        "kana": "おなかがすきました。",
        "reading": "onakagasukimashita",
        "vi": "(khi nói trạng thái đang đói thì dùng"
      },
      {
        "jp": "そうしましょう。かい",
        "kana": "そうしましょう。かい",
        "reading": "soushimashou kai",
        "vi": "trí./Hãy làm vậy đi. (nói khi đồng ý với đề"
      },
      {
        "jp": "ご注文は?ていしょさく",
        "kana": "ご注文は?ていしょさく",
        "reading": "go ha teishosaku",
        "vi": "dùng món gi ạ?"
      },
      {
        "jp": "定",
        "kana": "定",
        "reading": "",
        "vi": "suất, cơm phần"
      },
      {
        "jp": "消防署",
        "kana": "しょうぼしょ",
        "reading": "shoubosho",
        "vi": "cơm với thịt bò ở trên"
      },
      {
        "jp": "[少を]お待ちくだ",
        "kana": "[少を]お待ちくだ",
        "reading": "o o chikuda",
        "vi": "vui lòng đợi [một chút]."
      },
      {
        "jp": "～ございます。",
        "kana": "～ございます。",
        "reading": "gozaimasu",
        "vi": "nói lịch sự của で す )"
      },
      {
        "jp": "別々に",
        "kana": "べつべつに",
        "reading": "betsubetsuni",
        "vi": "riêng ra"
      },
      {
        "jp": "アキックス",
        "kana": "アキックス",
        "reading": "akikkusu",
        "vi": "ty giả định"
      },
      {
        "jp": "おはようテレビ",
        "kana": "おはようテレビ",
        "reading": "ohayouterebi",
        "vi": "trình truyền hình giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "đóng (cửa, cửa số)"
      },
      {
        "jp": "急ぎます",
        "kana": "いそぎます",
        "reading": "isogimasu",
        "vi": "véi, gap"
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
        "vi": "mang, cam"
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
        "vi": "goi"
      },
      {
        "jp": "話します",
        "kana": "はなします",
        "reading": "hanashimasu",
        "vi": "nói, nói chuyện"
      },
      {
        "jp": "使います",
        "kana": "]",
        "reading": "",
        "vi": "dùng, sử dụng"
      },
      {
        "jp": "閉めます",
        "kana": "しめます",
        "reading": "shimemasu",
        "vi": "dừng, đỗ"
      },
      {
        "jp": "見せます",
        "kana": "みせます",
        "reading": "misemasu",
        "vi": "cho xem, trinh"
      },
      {
        "jp": "教えます",
        "kana": "おしえます",
        "reading": "oshiemasu",
        "vi": "nói, cho biết [địa chỉ]"
      },
      {
        "jp": "取ります",
        "kana": "とります",
        "reading": "torimasu",
        "vi": "ngồi"
      },
      {
        "jp": "待ちます",
        "kana": "まちます",
        "reading": "machimasu",
        "vi": "đứng"
      },
      {
        "jp": "取ります",
        "kana": "とります",
        "reading": "torimasu",
        "vi": "vào [quán giải khát]"
      },
      {
        "jp": "出ます",
        "kana": "でます[きっさてんをへ～～][～～]",
        "reading": "demasu kissatenohe",
        "vi": "ra, ra khỏi [quán giải khát]"
      },
      {
        "jp": "ふります[あめが～～][雨が～]",
        "kana": "ふります[あめが～～][雨が～]",
        "reading": "furimasu amega ga",
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
        "vi": "hé chiéu"
      },
      {
        "jp": "名前",
        "kana": "なまえ",
        "reading": "namae",
        "vi": "tên"
      },
      {
        "jp": "住所",
        "kana": "じゅうしゃ",
        "reading": "juusha",
        "vi": "dia chi"
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
        "jp": "もんだい問題",
        "kana": "もんだい問題",
        "reading": "mondai",
        "vi": "hỏi, vẫn đề"
      },
      {
        "jp": "こたえ答え",
        "kana": "こたえ答え",
        "reading": "kotae e",
        "vi": "trả lời"
      },
      {
        "jp": "読み方",
        "kana": "よみかた",
        "reading": "yomikata",
        "vi": "đọc"
      },
      {
        "jp": "まっすぐ",
        "kana": "まっすぐ",
        "reading": "massugu",
        "vi": "~"
      },
      {
        "jp": "ゆっくり",
        "kana": "ゆっくり",
        "reading": "yukkuri",
        "vi": "thong thả, thoải mái"
      },
      {
        "jp": "すぐまたあとで",
        "kana": "すぐまたあとで",
        "reading": "sugumataatode",
        "vi": "lập tức"
      },
      {
        "jp": "もう少し",
        "kana": "もうすこし",
        "reading": "mousukoshi",
        "vi": "một chút nữa"
      },
      {
        "jp": "もう～んしゅう",
        "kana": "もう～んしゅう",
        "reading": "mou nshuu",
        "vi": "~"
      },
      {
        "jp": "さあ",
        "kana": "さあ",
        "reading": "saa",
        "vi": "(dùng dễ thúc giục hoặc khuyến khích"
      },
      {
        "jp": "あれ?かいわ",
        "kana": "あれ?かいわ",
        "reading": "are kaiwa",
        "vi": "cảm than khi phát hiện hoặc thấy cái gi"
      },
      {
        "jp": "るみぎま",
        "kana": "るみぎま",
        "reading": "rumigima",
        "vi": "x"
      },
      {
        "jp": "曲がってねが",
        "kana": "曲がってねが",
        "reading": "gattenega",
        "vi": "hãy rẽ phải 6 chỗ đèn tín hiệu. ーー"
      },
      {
        "jp": "これでお願いします。",
        "kana": "これでお願いします。",
        "reading": "koredeo ishimasu",
        "vi": "anh tiền này."
      },
      {
        "jp": "お釣り",
        "kana": "おつり",
        "reading": "otsuri",
        "vi": "thừa, tiền thối lại"
      },
      {
        "jp": "みどり町",
        "kana": "みどり町",
        "reading": "midori",
        "vi": "phố giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "kana": "けんきょうします",
        "reading": "kenkyoushimasu",
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
        "vi": "ca-ta-16"
      },
      {
        "jp": "時刻表",
        "kana": "じこくひょう",
        "reading": "jikokuhyou",
        "vi": "bang giờ chạy tàu"
      },
      {
        "jp": "服",
        "kana": "ふく",
        "reading": "fuku",
        "vi": "quan áo"
      },
      {
        "jp": "製品",
        "kana": "せいひｎ",
        "reading": "seihi",
        "vi": "sản phẩm"
      },
      {
        "jp": "ソフト",
        "kana": "ソフト",
        "reading": "sofuto",
        "vi": "phần mềm"
      },
      {
        "jp": "でんしじしょ",
        "kana": "でんしじしょ",
        "reading": "denshijisho",
        "vi": "kim từ điển"
      },
      {
        "jp": "経済",
        "kana": "けいざい",
        "reading": "keizai",
        "vi": "kính té"
      },
      {
        "jp": "市役所",
        "kana": "しやくしょ",
        "reading": "shiyakusho",
        "vi": "toa thi chinh"
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
        "vi": "nha si"
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
        "jp": "皆さんかい",
        "kana": "皆さんかい",
        "reading": "sankai",
        "vi": "chị, các ông bà, các bạn, quý vị"
      },
      {
        "jp": "思い出します",
        "kana": "おもいだします",
        "reading": "omoidashimasu",
        "vi": "lại, hồi tưởng lại"
      },
      {
        "jp": "いらっしゃいますにっぱんばし",
        "kana": "いらっしゃいますにっぱんばし",
        "reading": "irasshaimasunippanbashi",
        "vi": "ngữ của =F)"
      },
      {
        "jp": "みんなのインタビュー",
        "kana": "みんなのインタビュー",
        "reading": "minnanointabyuu",
        "vi": "trình truyền hình giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 16,
    "theme": "Nối hành động & trình tự",
    "vocab": [
      {
        "jp": "乗ります",
        "kana": "のります",
        "reading": "norimasu",
        "vi": "đi, lên [tàu]"
      },
      {
        "jp": "降ります",
        "kana": "おります",
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
        "jp": "浴びます",
        "kana": "あびます",
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
        "vi": "lầy ra, đưa ra, gửi"
      },
      {
        "jp": "下ろします",
        "kana": "おろします[おかねをへへ][お人金を～]",
        "reading": "oroshimasu okaneohehe o o",
        "vi": "rút [tiền]"
      },
      {
        "jp": "入ります",
        "kana": "はいります",
        "reading": "hairimasu",
        "vi": "vao [đại học]"
      },
      {
        "jp": "出ます",
        "kana": "でます",
        "reading": "demasu",
        "vi": "ra, tốt nghiệp [đại học]"
      },
      {
        "jp": "飲みます",
        "kana": "",
        "reading": "",
        "vi": "uéng (bia, rượu)"
      },
      {
        "jp": "やめます",
        "kana": "やめます",
        "reading": "yamemasu",
        "vi": "bat đầu"
      },
      {
        "jp": "見学します",
        "kana": "けんがくします本",
        "reading": "kengakushimasu",
        "vi": "tham quan kién tap"
      },
      {
        "jp": "電話します",
        "kana": "",
        "reading": "",
        "vi": "goi điện thoại"
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
        "vi": "đài"
      },
      {
        "jp": "短い",
        "kana": "みじかい",
        "reading": "mijikai",
        "vi": "ngan"
      },
      {
        "jp": "明るい",
        "kana": "あかるい",
        "reading": "akarui",
        "vi": "sang"
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
        "vi": "người, cơ thé"
      },
      {
        "jp": "頭",
        "kana": "あたま",
        "reading": "atama",
        "vi": "dau"
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
        "jp": "耳",
        "kana": "みみ",
        "reading": "mimi",
        "vi": "tai"
      },
      {
        "jp": "はか",
        "kana": "はか",
        "reading": "haka",
        "vi": "mũi"
      },
      {
        "jp": "口",
        "kana": "くち",
        "reading": "kuchi",
        "vi": "miéng"
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
        "vi": "bung"
      },
      {
        "jp": "足",
        "kana": "あし",
        "reading": "ashi",
        "vi": "chân"
      },
      {
        "jp": "せ",
        "kana": "せ",
        "reading": "se",
        "vi": "chiều cao (cơ thể)"
      },
      {
        "jp": "サービス",
        "kana": "サービス",
        "reading": "saabisu",
        "vi": "vu"
      },
      {
        "jp": "ジョギンダグ",
        "kana": "ジョギンダグ",
        "reading": "jogindagu",
        "vi": "chạy bộ ( ~ # LET : chạy bộ)"
      },
      {
        "jp": "シャワー",
        "kana": "シャワー",
        "reading": "shawaa",
        "vi": "hoa sen"
      },
      {
        "jp": "みどり[お]てら[]",
        "kana": "みどり[お]てら[]",
        "reading": "midori o tera",
        "vi": "xanh lá cây, cây xanh"
      },
      {
        "jp": "じんじゃ神社ーばん一番",
        "kana": "じんじゃ神社ーばん一番",
        "reading": "jinja ban",
        "vi": "thờ đạo Thần"
      },
      {
        "jp": "どうやって",
        "kana": "どうやって",
        "reading": "douyatte",
        "vi": "thể nao ~"
      },
      {
        "jp": "どの～",
        "kana": "どの～",
        "reading": "dono",
        "vi": "(dùng đối với trường hợp từ ba thứ trở lên)"
      },
      {
        "jp": "どれ",
        "kana": "どれ",
        "reading": "dore",
        "vi": "nào (dùng trong trường hợp ba cái hoặc"
      },
      {
        "jp": "すごいですねれね。",
        "kana": "すごいですねれね。",
        "reading": "sugoidesunerene",
        "vi": "là tuyệt vời!/Kinh quá nhỉ!"
      },
      {
        "jp": "[いいえ、]まだまだですかいひだ",
        "kana": "[いいえ、]まだまだですかいひだ",
        "reading": "iie madamadadesukaihida",
        "vi": "tôi còn phải cố gắng nhiều lắm. (cách"
      },
      {
        "jp": "お引き出しですか。",
        "kana": "おひきだしですか。",
        "reading": "ohikidashidesuka",
        "vi": "rút tiền a? 101"
      },
      {
        "jp": "まず",
        "kana": "まず",
        "reading": "mazu",
        "vi": "hết, đầu tiền"
      },
      {
        "jp": "次に",
        "kana": "つぎに",
        "reading": "tsugini",
        "vi": "theo, sau d6"
      },
      {
        "jp": "キャッシュカード",
        "kana": "キャッシュカード",
        "reading": "kyasshukaado",
        "vi": "tian mặt, thẻ ATM"
      },
      {
        "jp": "暗所番号",
        "kana": "おんしょうばんごう",
        "reading": "onshoubangou",
        "vi": "' ."
      },
      {
        "jp": "金額かくにん",
        "kana": "金額かくにん",
        "reading": "kakunin",
        "vi": "khoản tiền"
      },
      {
        "jp": "確認ボタン",
        "kana": "確認ボタン",
        "reading": "botan",
        "vi": "nhận, sự kiểm tra lại ( ~ し ます : xác"
      },
      {
        "jp": "バンドン",
        "kana": "バンドン",
        "reading": "bandon",
        "vi": "(ở In-đô-nê-xi-a)"
      },
      {
        "jp": "フランケン",
        "kana": "フランケン",
        "reading": "furanken",
        "vi": "(ở Đức)"
      },
      {
        "jp": "ベラクルスだいがくま",
        "kana": "ベラクルスだいがくま",
        "reading": "berakurusudaigakuma",
        "vi": "(ở Mexico)"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "飲みます［薬を～］",
        "kana": "のみます［くすりを～］",
        "reading": "nomimasu kusurio",
        "vi": "uống [thuốc]"
      },
      {
        "jp": "入ります［おふろに～］",
        "kana": "はいります［おふろに～］",
        "reading": "hairimasu ofuroni",
        "vi": "tắm bồn"
      },
      {
        "jp": "大切［な］",
        "kana": "たいせつ［な］",
        "reading": "taisetsu na",
        "vi": "quan trọng, quý giá"
      },
      {
        "jp": "大丈夫［な］",
        "kana": "だいじょうぶ［な］",
        "reading": "daijoubu na",
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
        "jp": "［健康］保険証",
        "kana": "［けんこう］ほけんしょう",
        "reading": "kenkou hokenshou",
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
        "jp": "［お］ふろ",
        "kana": "［お］ふろ",
        "reading": "o furo",
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
        "jp": "２、３日",
        "kana": "に、さんにち",
        "reading": "ni sannichi",
        "vi": "2, 3 ngày / vài ngày"
      },
      {
        "jp": "２、３～",
        "kana": "に、さん～",
        "reading": "ni san",
        "vi": "2, 3 ~ / vài ~"
      },
      {
        "jp": "～までに",
        "kana": "～までに",
        "reading": "madeni",
        "vi": "trước ~, cho đến trước ~ (chỉ giới hạn thời gian)"
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
        "vi": "Có vấn đề gì? / Anh/Chị bị làm sao?"
      },
      {
        "jp": "のど",
        "kana": "のど",
        "reading": "nodo",
        "vi": "họng"
      },
      {
        "jp": "［～が］痛いです。",
        "kana": "［～が］いたいです。",
        "reading": "ga itaidesu",
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "vi": "chơi (nhạc cụ, pianô, v.v.)"
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
        "vi": "đồi, trao đồi"
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
        "vi": "đàn pianô"
      },
      {
        "jp": "ーメートル",
        "kana": "ーメートル",
        "reading": "meetoru",
        "vi": "— mết"
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
        "jp": "［お］祈り",
        "kana": "［お］いのり",
        "reading": "o inori",
        "vi": "việc cầu nguyện ( ( ~ を し ます :caunguyén)"
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
        "vi": "giam dễc"
      },
      {
        "jp": "とうぶつ",
        "kana": "とうぶつ",
        "reading": "toubutsu",
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
        "vi": "In-to-nét, Internet"
      },
      {
        "jp": "に",
        "kana": "に",
        "reading": "ni",
        "vi": "biệt là"
      },
      {
        "jp": "へえ",
        "kana": "へえ",
        "reading": "hee",
        "vi": "A! (dùng dễ biểu thị sự ngạc nhiên)"
      },
      {
        "jp": "それはおもしろいですね",
        "kana": "それはおもしろいですね",
        "reading": "sorehaomoshiroidesune",
        "vi": "đầy/Cái đầy) hay thật nhỉ."
      },
      {
        "jp": "なかなか",
        "kana": "なかなか",
        "reading": "nakanaka",
        "vi": "mà, mãi mà (dùng với thể phủ định)"
      },
      {
        "jp": "ほんとうですか。",
        "kana": "ほんとうですか。",
        "reading": "hontoudesuka",
        "vi": "không a?"
      },
      {
        "jp": "ぜひ",
        "kana": "ぜひ",
        "reading": "zehi",
        "vi": "định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "泊まります",
        "kana": "とまります",
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
        "vi": "giặt (áo quần)"
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
        "vi": "manh"
      },
      {
        "jp": "弱い",
        "kana": "よわい",
        "reading": "yowai",
        "vi": "yếu"
      },
      {
        "jp": "練習します",
        "kana": "れんしゅうします",
        "reading": "renshuushimasu",
        "vi": "sự luyện tập ( ~ [を] し ます : luyện tập)"
      },
      {
        "jp": "ゴルフ",
        "kana": "ゴルフ",
        "reading": "gorufu",
        "vi": "gon( ~ を し ます : chơi gôn)"
      },
      {
        "jp": "相撲",
        "kana": "すもう",
        "reading": "sumou",
        "vi": "môn vật Sumo ( ~ を し ます : đấu vật Sumo)"
      },
      {
        "jp": "お茶",
        "kana": "おちゃ",
        "reading": "ocha",
        "vi": "tra dao"
      },
      {
        "jp": "日",
        "kana": "ひ",
        "reading": "hi",
        "vi": "ngay"
      },
      {
        "jp": "調子",
        "kana": "ちょうし",
        "reading": "choushi",
        "vi": "tinh trang, trang thai"
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
        "vi": "dan dan"
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
        "vi": "Cám on anh/chị, nhờ anh/chị mà ~. (đùng để bày tỏ sự cám ơn khi nhận được sự giúp đỡ của ai đó)"
      },
      {
        "jp": "でも",
        "kana": "でも",
        "reading": "demo",
        "vi": "nhưng"
      },
      {
        "jp": "ダイエット",
        "kana": "ダイエット",
        "reading": "daietto",
        "vi": "ăn kiêng, chế độ giảm can( ~ を LET:"
      },
      {
        "jp": "無理[な]からだ",
        "kana": "無理[な]からだ",
        "reading": "na karada",
        "vi": "thể, quá sức"
      },
      {
        "jp": "体にいい",
        "kana": "体にいい",
        "reading": "niii",
        "vi": "sức khỏe"
      },
      {
        "jp": "東京スカイツリーかっしかほくさい",
        "kana": "東京スカイツリーかっしかほくさい",
        "reading": "sukaitsuriikasshikahokusai",
        "vi": "Sky Tree (tháp truyền hình có đài ngắm"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 20,
    "theme": "Thể thường & hội thoại thân mật",
    "vocab": [
      {
        "jp": "要ります",
        "kana": "いります",
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
        "kana": "しゅりします",
        "reading": "shurishimasu",
        "vi": "sửa chữa, tu sửa"
      },
      {
        "jp": "僕",
        "kana": "ぼく",
        "reading": "boku",
        "vi": "tôi, tớ (cách xưng thân mật của わた し được dùng bởi nam giới)"
      },
      {
        "jp": "君",
        "kana": "きみ",
        "reading": "kimi",
        "vi": "cậu, bạn (cách nới thân mật của あな た được đùng cho người ngang hàng hoặc ít tuổi hơn)"
      },
      {
        "jp": "～君",
        "kana": "～くん",
        "reading": "kun",
        "vi": "anh ~, cậu ~ (cách nói thân mật của ~ さ ん được dùng cho người ngang hàng hoặc ít tuổi hơn; thường được dùng sau tên bé trai)"
      },
      {
        "jp": "うん",
        "kana": "うん",
        "reading": "un",
        "vi": "ừ (cách nói thân mật cua は い )"
      },
      {
        "jp": "ううん",
        "kana": "ううん",
        "reading": "uun",
        "vi": "không (cách nói thân mật của \\ いいえ )"
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
        "vi": "kimono (trang phục truyền thống của Nhật Bản)"
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
        "vi": "két thtic, hét phim"
      },
      {
        "jp": "こっち",
        "kana": "こっち",
        "reading": "kocchi",
        "vi": "phía này, chỗ này (cách nói thân mật của こち ら )"
      },
      {
        "jp": "そっち",
        "kana": "そっち",
        "reading": "socchi",
        "vi": "phía đó, chỗ đó (cách nói thân mật của そちら )"
      },
      {
        "jp": "あっち",
        "kana": "あっち",
        "reading": "acchi",
        "vi": "phía kia, chỗ kia (cách nói thân mật của あちら )"
      },
      {
        "jp": "どっち",
        "kana": "どっち",
        "reading": "docchi",
        "vi": "cái nào (giữa hai cái), phía nào, đâu (cách nói thân mật của どちら )"
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
        "vi": "~, nhưng (cách nói thân mật của が )"
      },
      {
        "jp": "おなかがいっぱい",
        "kana": "おなかがいっぱい",
        "reading": "onakagaippai",
        "vi": "(Tôi) no rồi"
      },
      {
        "jp": "よかったら",
        "kana": "よかったら",
        "reading": "yokattara",
        "vi": "anh/chị thích thi"
      },
      {
        "jp": "いろいろ",
        "kana": "いろいろ",
        "reading": "iroiro",
        "vi": "thứ"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "あります[おまっつりがへ～][お祭りが～]",
        "kana": "あります[おまっつりがへ～][お祭りが～]",
        "reading": "arimasu omattsurigahe o riga",
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
        "vi": "chuyền động, chạy"
      },
      {
        "jp": "やめます[かいしゃをへ～][会社を～]",
        "kana": "やめます[かいしゃをへ～][会社を～]",
        "reading": "yamemasu kaishaohe o",
        "vi": "bỏ, thôi [việc công ty]"
      },
      {
        "jp": "気をつけます",
        "kana": "きをつけます",
        "reading": "kiotsukemasu",
        "vi": "chú ý, bảo trọng"
      },
      {
        "jp": "留学します",
        "kana": ")",
        "reading": "",
        "vi": "du hoc"
      },
      {
        "jp": "むだ［な］",
        "kana": "むだ［な］",
        "reading": "muda na",
        "vi": "lãng phí, vô ích"
      },
      {
        "jp": "不便［な］",
        "kana": "ふべん［な］",
        "reading": "fuben na",
        "vi": "bất tiện"
      },
      {
        "jp": "すごい",
        "kana": "すごい",
        "reading": "sugoi",
        "vi": "ghê quá, giỏi quá (dùng dễ bày tỏ sự ngạc nhiên hoặc than phục)"
      },
      {
        "jp": "ほんとうに",
        "kana": "ほんとうに",
        "reading": "hontouni",
        "vi": "sự thật"
      },
      {
        "jp": "うそ",
        "kana": "うそ",
        "reading": "uso",
        "vi": "sự giả dối, giả đối"
      },
      {
        "jp": "じどうしゃ",
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
        "kana": "はほうそう",
        "reading": "hahousou",
        "vi": "phét, phét thanh"
      },
      {
        "jp": "ニュェュース",
        "kana": "ニュェュース",
        "reading": "nyue su",
        "vi": "tin tức, bản tin"
      },
      {
        "jp": "アニメ",
        "kana": "アニメ",
        "reading": "anime",
        "vi": "phim hoat hinh (Nhat Ban)"
      },
      {
        "jp": "マンガが",
        "kana": "マンガが",
        "reading": "mangaga",
        "vi": "truyén tranh"
      },
      {
        "jp": "デザイン",
        "kana": "デザイン",
        "reading": "dezain",
        "vi": "thiét ké"
      },
      {
        "jp": "ゆめ",
        "kana": "ゆめ",
        "reading": "yume",
        "vi": "giấc mơ"
      },
      {
        "jp": "てんさい",
        "kana": "てんさい",
        "reading": "tensai",
        "vi": "thién tai"
      },
      {
        "jp": "試合",
        "kana": "しあい",
        "reading": "shiai",
        "vi": "trận đầu ( ~ & し ます :c6 trận đấu)"
      },
      {
        "jp": "ちさきゅう地球",
        "kana": "ちさきゅう地球",
        "reading": "chisakyuu",
        "vi": "đất"
      },
      {
        "jp": "月",
        "kana": "月",
        "reading": "",
        "vi": "trăng, trăng"
      },
      {
        "jp": "最近",
        "kana": "さいきん",
        "reading": "saikin",
        "vi": "day"
      },
      {
        "jp": "たぶん",
        "kana": "たぶん",
        "reading": "tabun",
        "vi": "có thể"
      },
      {
        "jp": "きっと",
        "kana": "きっと",
        "reading": "kitto",
        "vi": "chắn, nhất định"
      },
      {
        "jp": "ほんとうに",
        "kana": "ほんとうに",
        "reading": "hontouni",
        "vi": "sự"
      },
      {
        "jp": "そんなに～について～かいわひさ",
        "kana": "そんなに～について～かいわひさ",
        "reading": "sonnani nitsuite kaiwahisa",
        "vi": "~ lắm"
      },
      {
        "jp": "久しぶりですね。",
        "kana": "久しぶりですね。",
        "reading": "shiburidesune",
        "vi": "không gặp anh/chị. 2"
      },
      {
        "jp": "～飲みませんか。",
        "kana": "～飲みませんか。",
        "reading": "mimasenka",
        "vi": "uồng ~ nhé?"
      },
      {
        "jp": "もちろん",
        "kana": "もちろん",
        "reading": "mochiron",
        "vi": "di nhiên"
      },
      {
        "jp": "もう帰らないと。かえ",
        "kana": "もう帰らないと。かえ",
        "reading": "mou ranaito kae",
        "vi": "phải về bây giờ không thi...."
      },
      {
        "jp": "アインシュタイン",
        "kana": "アインシュタイン",
        "reading": "ainshutain",
        "vi": "Einstein (1879-1955)"
      },
      {
        "jp": "ガガーリン",
        "kana": "ガガーリン",
        "reading": "gagaarin",
        "vi": "Alekseyevich Gagarin (1934-1968)"
      },
      {
        "jp": "ガリレオぼくし",
        "kana": "ガリレオぼくし",
        "reading": "garireobokushi",
        "vi": "Galilei (1564-1642)"
      },
      {
        "jp": "キング牧師",
        "kana": "キング牧師",
        "reading": "kingu",
        "vi": "sư Martin Luther King, Jr. (1929-1968)"
      },
      {
        "jp": "フランクリンひめ",
        "kana": "フランクリンひめ",
        "reading": "furankurinhime",
        "vi": "Franklin (1706-1790)"
      },
      {
        "jp": "かぐや姫",
        "kana": "かぐや姫",
        "reading": "kaguya",
        "vi": "chúa Kaguya (nữ anh hùng trong truyện cổ"
      },
      {
        "jp": "てんじんまっリよしのやま",
        "kana": "てんじんまっリよしのやま",
        "reading": "tenjinmarriyoshinoyama",
        "vi": "x"
      },
      {
        "jp": "吉野山",
        "kana": "吉野山",
        "reading": "",
        "vi": "(một ngọn núi ở tỉnh Nara)"
      },
      {
        "jp": "カンガルー",
        "kana": "カンガルー",
        "reading": "kangaruu",
        "vi": "căng-gu-ru"
      },
      {
        "jp": "キャプテン・クック",
        "kana": "キャプテン・クック",
        "reading": "kyaputen kukku",
        "vi": "trưởng Cook (James Cook 1728-1779)"
      },
      {
        "jp": "ヨーネン",
        "kana": "ヨーネン",
        "reading": "yoonen",
        "vi": "ty giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "かぶります",
        "kana": "かぶります",
        "reading": "kaburimasu",
        "vi": "đội (mũ, v.v.)"
      },
      {
        "jp": "かけます[めがねをへ有][～]",
        "kana": "かけます[めがねをへ有][～]",
        "reading": "kakemasu meganeohe",
        "vi": "đeo [kính]"
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
        "vi": "com-1é, vét"
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
        "vi": "kính ."
      },
      {
        "jp": "ケーキ",
        "kana": "ケーキ",
        "reading": "keeki",
        "vi": "bánh ngọt"
      },
      {
        "jp": "[お]弁当",
        "kana": "[]",
        "reading": "",
        "vi": "cơm hộp"
      },
      {
        "jp": "ロボット",
        "kana": "ロボット",
        "reading": "robotto",
        "vi": "rô bốt"
      },
      {
        "jp": "ユーモア",
        "kana": "ユーモア",
        "reading": "yuumoa",
        "vi": "sự hài hước"
      },
      {
        "jp": "都合",
        "kana": "",
        "reading": "",
        "vi": "(sự) thích hợp"
      },
      {
        "jp": "よく",
        "kana": "よく",
        "reading": "yoku",
        "vi": "thường, hay"
      },
      {
        "jp": "おめでとうございます",
        "kana": "おめでとうございます",
        "reading": "omedetougozaimasu",
        "vi": "mừng. (dùng để nói trong dịp sinh nhật, lễ | 22"
      },
      {
        "jp": "しですか。",
        "kana": "しですか。",
        "reading": "shidesuka",
        "vi": "tìm ~ à?"
      },
      {
        "jp": "では",
        "kana": "では",
        "reading": "deha",
        "vi": "(nhé)"
      },
      {
        "jp": "こちら",
        "kana": "こちら",
        "reading": "kochira",
        "vi": "cái này (cách nói lịch sự của これ )"
      },
      {
        "jp": "ダイニングキッチン",
        "kana": "ダイニングキッチン",
        "reading": "dainingukicchin",
        "vi": "kèm phòng ăn"
      },
      {
        "jp": "し入れパリ",
        "kana": "し入れパリ",
        "reading": "shi repari",
        "vi": "để chăn gối, đệm trong một căn phòng kiểu"
      },
      {
        "jp": "みんなのアンケート",
        "kana": "みんなのアンケート",
        "reading": "minnanoankeeto",
        "vi": "đề của bảng điều tra giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  },
  {
    "id": 23,
    "theme": "Khi... & điều kiện tự nhiên",
    "vocab": [
      {
        "jp": "聞きます",
        "kana": "ききます",
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
        "jp": "触ります",
        "kana": "さわります",
        "reading": "sawarimasu",
        "vi": "sờ, chạm vào [cửa]"
      },
      {
        "jp": "出ます",
        "kana": "でます",
        "reading": "demasu",
        "vi": "[tiền thừa] ra, chạy ra"
      },
      {
        "jp": "歩きます",
        "kana": "あるきます",
        "reading": "arukimasu",
        "vi": "đi bộ"
      },
      {
        "jp": "渡ります",
        "kana": "わたります",
        "reading": "watarimasu",
        "vi": "qua, đi qua [cầu]"
      },
      {
        "jp": "曲がります",
        "kana": "まがります",
        "reading": "magarimasu",
        "vi": "rẽ, queo [phải]"
      },
      {
        "jp": "さびしい",
        "kana": "さびしい",
        "reading": "sabishii",
        "vi": "buồn, cô đơn"
      },
      {
        "jp": "[お]湯",
        "kana": "[]",
        "reading": "",
        "vi": "nước nóng"
      },
      {
        "jp": "ーーサイズ",
        "kana": "ーーサイズ",
        "reading": "saizu",
        "vi": "cỡ, kích cỡ"
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
        "vi": "g6c"
      },
      {
        "jp": "橋",
        "kana": "はし",
        "reading": "hashi",
        "vi": "cầu"
      },
      {
        "jp": "駐車場",
        "kana": "きゅうしゃじょう",
        "reading": "kyuushajou",
        "vi": "bãi đỗ xe"
      },
      {
        "jp": "建物",
        "kana": "たてもの",
        "reading": "tatemono",
        "vi": "toa nha"
      },
      {
        "jp": "なんかいも",
        "kana": "なんかいも",
        "reading": "nankaimo",
        "vi": "nhiều lần"
      },
      {
        "jp": "ー目",
        "kana": "ーめ",
        "reading": "me",
        "vi": "thứ — , số — (biểu thị thứ tự)"
      },
      {
        "jp": "ヒ",
        "kana": "ヒ",
        "reading": "hi",
        "vi": "—"
      },
      {
        "jp": "法族",
        "kana": "法族",
        "reading": "",
        "vi": "Horyuji, một ngôi chùa ở Nara do Hoàng tử"
      },
      {
        "jp": "げんきちゃ",
        "kana": "げんきちゃ",
        "reading": "genkicha",
        "vi": "xây vào đầu thế kỷ thứ 7 Ni"
      },
      {
        "jp": "元気茶はんだえき",
        "kana": "元気茶はんだえき",
        "reading": "handaeki",
        "vi": "giả định"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "連れて",
        "kana": "つれて",
        "reading": "tsurete",
        "vi": "dẫn (một ai đó) đến"
      },
      {
        "jp": "送ります",
        "kana": "おくります",
        "reading": "okurimasu",
        "vi": "tién [mét ai d6]"
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
        "jp": "おじいさん<br>おじいちゃん",
        "kana": "おじいさん<br>おじいちゃん",
        "reading": "ojiisan ojiichan",
        "vi": "ông nội, ông ngoại, ông (cụ/lão)"
      },
      {
        "jp": "おばあさん<br>おばあちゃん",
        "kana": "おばあさん<br>おばあちゃん",
        "reading": "obaasan obaachan",
        "vi": "bà nội, bà ngoại, ba (cu/lao)"
      },
      {
        "jp": "準備",
        "kana": "じゅんび",
        "reading": "junbi",
        "vi": "sự chuan bị ( ~[ を ] し ます : chuẩn bị)"
      },
      {
        "jp": "絢っ越し",
        "kana": "ひっこし",
        "reading": "hikkoshi",
        "vi": "sự chuy&n nhà ( ~[ を ] し ます : chuyền nhà)"
      },
      {
        "jp": "[お]かし",
        "kana": "[お]かし",
        "reading": "o kashi",
        "vi": "banh keo"
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
        "vi": "ra, bén canh d6"
      },
      {
        "jp": "日",
        "kana": "日",
        "reading": "",
        "vi": "của Mẹ — 149"
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
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
        "jp": "取ります［年を～］",
        "kana": "とります［としを～］",
        "reading": "torimasu toshio",
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
        "jp": "もし［～たら］",
        "kana": "もし［～たら］",
        "reading": "moshi tara",
        "vi": "nếu"
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
        "vi": "a-lô"
      },
      {
        "jp": "転勤",
        "kana": "てんきん",
        "reading": "tenkin",
        "vi": "việc chuyển địa điểm làm việc / chuyển công tác"
      },
      {
        "jp": "こと",
        "kana": "こと",
        "reading": "koto",
        "vi": "việc, chuyện"
      },
      {
        "jp": "暇",
        "kana": "ひま",
        "reading": "hima",
        "vi": "thời gian rảnh"
      },
      {
        "jp": "［いろいろ］お世話になりました。",
        "kana": "［いろいろ］おせわになりました。",
        "reading": "iroiro osewaninarimashita",
        "vi": "Cảm ơn anh/chị đã giúp đỡ tôi (nhiều)."
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
    "vocabSource": "Minna no Nihongo Sơ cấp I – Bản dịch và Giải thích Ngữ pháp – Tiếng Việt, ấn bản 2 (PDF người dùng cung cấp)"
  }
];
