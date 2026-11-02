// note原稿ジェネレーター: node scripts/generate-notes.js
// docs/data/schools.js と docs/config.js から notes/*.md を生成します
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
const dataFiles = ["docs/config.js", "docs/data/schools.js", "docs/data/schools-cebu.js", "docs/data/schools-luzon.js", "docs/data/schools-other.js"];
for (const f of dataFiles) if (fs.existsSync(path.join(root, f))) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx);
const C = ctx.window.SITE_CONFIG, S = ctx.window.SCHOOLS;
const outDir = path.join(root, "notes");
fs.mkdirSync(outDir, { recursive: true });

const siteUrl = "https://wakatsukakeiri-cmd.github.io/waypoint-ryuugaku/";
// --- LINE導線（相談のハードルを下げる3パターン） ---
const ctaTop = (s) => `
> 💬 **読みながら気になったことは、LINEで気軽に聞いてください**
> 「${s.name}って初心者でも大丈夫？」など、ひとことだけでもOKです。
> 👉 ${C.lineUrl}
`;
const ctaMid = (s) => `
---
### 🧮 「${s.name} 4週間」と送るだけで、無料でお見積もり
部屋タイプ・時期・現地費用まで含めた**総額の目安**をお返しします。
「まだ行くか決めてない」段階の方も大歓迎です。
👉 ${C.lineUrl}
---
`;
const ctaEnd = (s) => `
---
## 💬 留学のこと、LINEで気軽に相談してください
「まだ何も決まっていない」「ちょっと聞いてみたいだけ」でも大丈夫です。

**たとえば、こんな質問でもOK👇**
- ${s.name}と他の学校、どっちが合ってる？
- 英語ゼロでもついていける？
- 社会人・大学生で休みが少ないけど、何週間から行ける？
- 結局、総額いくらかかる？

**送り方はかんたん！コピペでOK👇**
\`\`\`
${s.name}の記事を見ました。
・時期：
・期間：
・目的：
\`\`\`
（空欄のままでも大丈夫です）

✅ 相談・見積もりはずっと無料
✅ しつこい営業は一切しません
✅ 留学するか迷っている段階でもOK
🎁 友だち追加で「${C.lineGift}」をプレゼント

👉 **LINEで相談する：${C.lineUrl}**
---
`;

for (const s of S) {
  const similar = S.filter((x) => x.id !== s.id && (x.region === s.region || x.style === s.style)).slice(0, 3);
  const md = `# 【${s.region}】${s.name}を徹底解説｜${s.catch}

フィリピン留学を検討中の方に向けて、**${s.region}（${s.area}）にある「${s.name}」**を紹介します。
この記事を読めば、${s.name}が自分に合う学校かどうかがわかります。

## ✅ こんな人におすすめ
${s.purposes.map((p) => `- ${p}目的で留学したい方`).join("\n")}
- ${s.style}スタイルの環境で学びたい方
${ctaTop(s)}
## 📋 基本情報
| 項目 | 内容 |
|---|---|
| 学校名 | ${s.name} |
| 地域 | ${s.region}（${s.area}） |
| スタイル | ${s.style} |
| マンツーマン授業 | 1日 約${s.manToMan}コマ |
| 寮 | ${s.dorm} |
| 日本人比率 | ${s.jpRatio} |
| 4週間の費用目安 | 約${s.cost4w[0]}〜${s.cost4w[1]}万円（授業料＋寮費・食事込み） |
${s.url ? `| 公式サイト | ${s.url} |` : ""}

※費用は部屋タイプ・時期・為替で変動します。別途、現地費用（SSP・ビザ延長費等）や航空券がかかります。

## 🌟 ${s.name}の特徴
${s.features.map((f, i) => `### ${i + 1}. ${f}\n`).join("\n")}
## 📚 授業・カリキュラム
${s.name}では1日約${s.manToMan}コマのマンツーマン授業を中心に、目的別のコースが用意されています。
${s.purposes.includes("IELTS") || s.purposes.includes("TOEIC") ? "試験対策コースもあるため、スコアアップを目指す方にも選ばれています。" : "初めての留学でも無理なく続けられるカリキュラムが特徴です。"}

## 🏠 寮・生活環境
寮は「${s.dorm}」。${s.region}（${s.area}）エリアにあり、${s.style === "スパルタ" ? "勉強に集中しやすい環境" : s.style === "リゾート" ? "南国らしいリゾート気分を味わえる環境" : "勉強と息抜きのバランスがとりやすい環境"}です。

## 💰 費用の目安
| 期間 | 費用目安 |
|---|---|
| 4週間 | 約${s.cost4w[0]}〜${s.cost4w[1]}万円 |
| 12週間 | 約${s.cost4w[0] * 3 - 3}〜${s.cost4w[1] * 3 - 3}万円 |

${ctaMid(s)}

## ⚠️ 注意点
${s.cautions.map((c) => `- ${c}`).join("\n")}

「この点、実際どうなの？」と気になったら、LINEで聞いてみてください。最新の状況をお伝えします。

## 🔍 ${s.name}と比較されやすい学校
${similar.map((x) => `- **${x.name}**（${x.region}・${x.style}）：${x.catch}`).join("\n")}

フィリピンの語学学校をまとめて比較したい方はこちら 👉 ${siteUrl}

## まとめ
${s.name}は「${s.catch}」学校です。
${s.purposes.slice(0, 2).join("・")}を目的とする方は、ぜひ候補に入れてみてください。
${ctaEnd(s)}
#フィリピン留学 #${s.region}留学 #語学留学 #英語学習 #${s.name.replace(/\s/g, "")}
`;
  const file = path.join(outDir, `${s.id}_${s.name.replace(/[\\/:*?"<>|\s]/g, "_")}.md`);
  fs.writeFileSync(file, md.replace(/\n{3,}/g, "\n\n"));
  console.log("generated:", path.basename(file));
}
