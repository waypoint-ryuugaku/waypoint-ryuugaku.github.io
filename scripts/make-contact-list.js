// 提携用 学校連絡先リスト(CSV)を作成: node scripts/make-contact-list.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
global.window = {};
for (const f of ["schools", "schools-cebu", "schools-luzon", "schools-other"]) require(path.join(root, "docs/data", f + ".js"));

// 調査済みの連絡先（検索結果ベース・要公式確認）
const found = {
  "001": ["japan.sales@qqeng.com（法人・教育機関向け）／公式サイトのお問い合わせフォーム", "https://qqenglish.jp/"],
  "007": ["pinesbaguio@gmail.com（バギオ語学学校協会BESAの掲載情報）", ""],
  "010": ["公式エージェント制。公式サイトから提携を問い合わせ（onlinecipenglish@gmail.com はオンライン・支払い窓口）", "https://cipenglish.net/official-agents/"],
  "002": ["info@3d-universal.com ／ +63-32-402-4839", "https://3d-universal.com/"],
  "003": ["info@cpils.com ／ +63-32-254-8950", "https://www.cpils.com/"],
  "004": ["philinter.info@gmail.com（日本含む一般窓口）／ +63-32-340-7453", "https://www.philinter.com/"],
  "005": ["公式ブログの問い合わせフォーム ／ LINE ID: gwg5719（要確認）", ""],
  "006": ["公式サイトの資料請求・お問合せフォーム ／ 050-5807-3410（日本窓口・運営：株式会社ファーストイングリッシュG-Net）", "https://www.firstenglish.jp/"],
  "008": ["japan@mymonol.com（日本窓口）／ register@mymonol.com", "https://mymonol.com/"],
  "009": ["baguiojic@gmail.com（BESA掲載）", "https://baguio-jic.com/"],
  "011": ["admin@cebucia.com", "https://cebucia.com/"],
  "012": ["公式サイトの問い合わせフォーム ／ +63-32-260-8500（エージェント用メールは非公開）", "http://cpiedu.net/"],
  "013": ["ev-global@hanmail.net ／ +63-32-384-4755 ／ 公式サイトのAgentページ", "https://www.evenglish.net/"],
};

const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
const rows = [["No", "地域", "学校名", "公式サイト", "提携の連絡先", "調査状況", "連絡日", "返信", "提携可否", "メモ"]];
for (const s of window.SCHOOLS) {
  const f = found[s.id];
  rows.push([s.id, s.region, s.name, (f && f[1]) || s.url, f ? f[0] : "", f ? "検索で確認（要公式確認）" : "未調査", "", "", "", ""]);
}
fs.mkdirSync(path.join(root, "partners"), { recursive: true });
fs.writeFileSync(path.join(root, "partners", "学校連絡先リスト.csv"), "\ufeff" + rows.map((r) => r.map(q).join(",")).join("\r\n"));
console.log("rows:", rows.length - 1);
