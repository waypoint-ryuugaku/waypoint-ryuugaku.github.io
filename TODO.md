# WayPoint 留学ベース やることリスト

## 🔑 アカウント・ドメイン取得
- [ ] ドメイン `waypoint-ryugaku.com` を取得（お名前.com / ムームードメイン等、年1,500円前後）
- [ ] ドメイン `waypoint-ryugaku.jp` の空き確認・取得（任意）
- [x] note アカウント作成：`note.com/waypointryuugaku`
- [x] Instagram アカウント作成：`waypoint.ryuugakubase`
- [x] LINE公式アカウント開設（手順は [LINE_SETUP.md](LINE_SETUP.md)）
  - [x] 友だち追加URL取得・反映済み：https://lin.ee/UX5K7mj
  - [ ] あいさつメッセージ・リッチメニュー設定
  - [ ] （任意）プレミアムID `@waypoint-ryugaku` を取得
- [ ] （任意）J-PlatPat で「ウェイポイント」「WAYPOINT」を区分35・39・41で商標検索

## 📝 コンテンツ（学校ごとの公開フロー）
1. 提携依頼を送る（`partners/提携依頼メール文例.md`、記録は `partners/学校連絡先リスト.csv`）
2. **提携の承諾をもらう**
3. 学校から最新の料金表・パンフレット・写真をもらう → 学校データを修正 → 原稿を再生成
4. 原稿を自分で確認（`REVIEW.md` にチェック）
5. noteに投稿 → 記事URLを伝える
6. サイトに表示（`publishedIds` に追加）

- [ ] 残りの学校の連絡先調査（014〜）
- [ ] note原稿サンプル（notes/001）の構成・口調を確認
- [ ] 残り90校の原稿作成
- [ ] 各校の費用・情報を公式サイトで確認
- [ ] noteに投稿 → 記事URLを `docs/data/schools.js` の `note` 欄に記入

## 🌐 サイト公開
- [x] GitHubにアップ（https://github.com/waypoint-ryuugaku/waypoint-ryuugaku.github.io）
- [x] GitHub Pagesを有効化（Settings → Pages → main / docs）
- [x] 比較サイトURLを原稿に反映：https://waypoint-ryuugaku.github.io/
- [ ] （ドメイン取得後）独自ドメインを GitHub Pages に設定

> URL類を差し替えたら `node scripts/generate-notes.js` を実行すると原稿に一括反映されます。
