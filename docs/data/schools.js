// ===== 学校データ（note原稿とサイトの両方がこのファイルを参照） =====
// ※料金・比率などは公開情報を元にした目安です。公開前に必ず各校公式サイトで確認してください。
// cost4w: 4週間の授業料+寮費の目安（万円, 1人部屋〜多人数部屋の幅）
window.SCHOOLS = [
  {
    id: "001", name: "QQ English", region: "セブ", area: "ITパーク / シーフロント",
    style: "セミスパルタ", manToMan: 6, cost4w: [22, 35], jpRatio: "高め（約60%〜）",
    dorm: "校内寮・提携ホテル", purposes: ["初心者", "日常英会話", "ビジネス", "親子"],
    catch: "全講師が正社員。カランメソッド公認校の大手日系校",
    features: ["講師全員が正社員雇用で質が安定", "カランメソッドの公認校", "日本人スタッフ常駐で初心者も安心", "キャンパスが2つあり雰囲気を選べる"],
    cautions: ["日本人比率が高めで英語環境を重視する人は時期選びが大切", "人気校のため早めの予約が必要"],
    url: "https://www.qqeng.com/", note: ""
  },
  {
    id: "002", name: "3D Academy", region: "セブ", area: "セブシティ",
    style: "セミスパルタ", manToMan: 4, cost4w: [20, 30], jpRatio: "中程度（約30〜40%）",
    dorm: "校舎併設ホテル型", purposes: ["日常英会話", "IELTS", "TOEIC", "初心者"],
    catch: "多国籍な環境と自由度のバランスが魅力の老舗校",
    features: ["韓国・台湾・ベトナムなど国籍バランスが良い", "グループ授業も充実し発言力が鍛えられる", "市街地アクセスが良く生活が便利"],
    cautions: ["自由度が高めなので自己管理が必要"],
    url: "https://3d-universal.com/", note: ""
  },
  {
    id: "003", name: "CPILS", region: "セブ", area: "セブシティ",
    style: "セミスパルタ", manToMan: 5, cost4w: [20, 32], jpRatio: "中程度",
    dorm: "校内寮", purposes: ["日常英会話", "IELTS", "TOEIC", "ビジネス"],
    catch: "フィリピン政府認定の歴史ある大型校",
    features: ["講師数が多くカリキュラムが豊富", "広いキャンパスと充実した設備", "長期留学向けのコースが揃う"],
    cautions: ["大型校のため手厚さより自主性が求められる"],
    url: "https://www.cpils.com/", note: ""
  },
  {
    id: "004", name: "Philinter", region: "セブ", area: "マクタン島",
    style: "セミスパルタ", manToMan: 4, cost4w: [21, 32], jpRatio: "中程度",
    dorm: "校内寮", purposes: ["日常英会話", "TOEIC", "IELTS"],
    catch: "多国籍で落ち着いた環境。リゾートエリアの実力派",
    features: ["学校運営の評価が高く講師研修が充実", "マクタン島で海が近い", "国籍バランスが良い"],
    cautions: ["市街地へは移動時間がかかる"],
    url: "https://www.philinter.com/", note: ""
  },
  {
    id: "005", name: "Cebu Blue Ocean Academy", region: "セブ", area: "マクタン島",
    style: "リゾート", manToMan: 4, cost4w: [20, 30], jpRatio: "中程度",
    dorm: "校内寮（オーシャンビュー）", purposes: ["初心者", "日常英会話", "シニア", "親子"],
    catch: "バギオの名門PINESの姉妹校。海の目の前で学べるリゾート校",
    features: ["ビーチまで徒歩圏のロケーション", "PINES系列の講師研修ノウハウ", "マリンアクティビティと両立しやすい"],
    cautions: ["誘惑が多く学習の自己管理が大切"],
    url: "https://cebublueocean.jp/", note: ""
  },
  {
    id: "006", name: "First English Global College", region: "セブ", area: "マクタン島",
    style: "セミスパルタ", manToMan: 5, cost4w: [21, 33], jpRatio: "中程度",
    dorm: "校内寮・ホテル", purposes: ["日常英会話", "ビジネス", "親子"],
    catch: "リゾート環境で学べる日系の総合校",
    features: ["サポート体制が手厚い", "ファミリー向けプランが充実", "清潔な寮と設備"],
    cautions: ["街中へは車移動が中心"],
    url: "https://feglobal.co.jp/", note: ""
  },
  {
    id: "007", name: "PINES", region: "バギオ", area: "バギオ市内",
    style: "スパルタ", manToMan: 5, cost4w: [20, 30], jpRatio: "低め",
    dorm: "校内寮", purposes: ["初心者", "IELTS", "TOEIC", "日常英会話"],
    catch: "バギオを代表するスパルタ校。とことん勉強したい人へ",
    features: ["平日外出制限ありで学習に集中できる", "涼しい気候で勉強しやすい", "講師研修の質に定評"],
    cautions: ["自由時間は少なめ", "街の遊び場は少ない"],
    url: "https://www.pinesedu.com/", note: ""
  },
  {
    id: "008", name: "MONOL", region: "バギオ", area: "バギオ郊外",
    style: "スパルタ", manToMan: 4, cost4w: [21, 31], jpRatio: "中程度",
    dorm: "校内寮", purposes: ["IELTS", "TOEIC", "日常英会話"],
    catch: "IELTS・TOEICに強い老舗の大型スパルタ校",
    features: ["試験対策コースの実績が豊富", "自然豊かで落ち着いた環境", "大型キャンパスで施設充実"],
    cautions: ["市街地まで距離がある"],
    url: "https://www.monol.co.jp/", note: ""
  },
  {
    id: "009", name: "JIC", region: "バギオ", area: "バギオ市内",
    style: "スパルタ", manToMan: 6, cost4w: [19, 28], jpRatio: "中程度",
    dorm: "校内寮", purposes: ["初心者", "日常英会話", "TOEIC"],
    catch: "マンツーマン多めでコスパ重視の人に",
    features: ["マンツーマン授業のコマ数が多い", "比較的リーズナブル", "アットホームな規模感"],
    cautions: ["設備は大型校に比べシンプル"],
    url: "", note: ""
  },
  {
    id: "010", name: "CIP", region: "クラーク", area: "クラーク",
    style: "セミスパルタ", manToMan: 5, cost4w: [22, 33], jpRatio: "中程度",
    dorm: "校内寮", purposes: ["日常英会話", "ビジネス", "IELTS", "親子"],
    catch: "ネイティブ講師も在籍。治安の良いクラークの人気校",
    features: ["ネイティブ講師の授業を受けられる", "旧米軍基地エリアで治安が良い", "マニラ空港・クラーク空港からアクセス可"],
    cautions: ["ネイティブ授業の分だけ費用はやや高め"],
    url: "https://cip-philippines.com/", note: ""
  }
];
